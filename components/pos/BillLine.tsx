"use client";

import { useRef, useState } from "react";
import { PRODUCT_ART } from "./art";
import { ITEMS, rs } from "./data";
import { Icon } from "./icons";

export type Line = { id: number; qty: number; status: "still" | "new" | "leaving"; bumps: number };

const OPEN_X = -104; // how far a line slides to reveal Remove (in 1280px screen units)

type Props = {
  line: Line;
  scale: number;
  open: boolean;
  peek: boolean;
  onOpen: (open: boolean) => void;
  onQty: (qty: number) => void;
};

/** One bill line. Swipe it right-to-left (touch or mouse) to show a Remove button. */
export function BillLine({ line, scale, open, peek, onOpen, onQty }: Props) {
  const it = ITEMS[line.id];
  const [dragX, setDragX] = useState<number | null>(null);
  const g = useRef({ sx: 0, sy: 0, base: 0, active: false, dragging: false });

  const x = dragX ?? (open ? OPEN_X : 0);
  const shown = open || (dragX !== null && dragX < -4);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    g.current = { sx: e.clientX, sy: e.clientY, base: open ? OPEN_X : 0, active: true, dragging: false };
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (!s.active) return;
    const mx = (e.clientX - s.sx) / scale;
    const my = (e.clientY - s.sy) / scale;
    if (!s.dragging) {
      if (Math.abs(mx) > 6 && Math.abs(mx) > Math.abs(my)) {
        s.dragging = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
      } else return;
    }
    setDragX(Math.max(OPEN_X - 30, Math.min(0, s.base + mx)));
  };
  const onUp = () => {
    const s = g.current;
    if (!s.active) return;
    s.active = false;
    if (!s.dragging) {
      if (open) onOpen(false);
      return;
    }
    onOpen((dragX ?? 0) < OPEN_X / 2);
    setDragX(null);
  };

  const cls = ["bl", line.status === "new" && "bl-new", line.status === "leaving" && "bl-out", shown && "open", peek && "peek"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <button className="del" tabIndex={open ? 0 : -1} aria-label={`Remove ${it.name}`} onClick={() => onQty(0)}>
        <Icon.trash />Remove
      </button>
      <div
        className="in"
        style={{ transform: x ? `translateX(${x}px)` : undefined, transition: dragX === null ? "transform .25s ease" : "none" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="lim" dangerouslySetInnerHTML={{ __html: PRODUCT_ART[line.id] }} />
        <span className="n">{it.name}<small>{rs(it.price)} each</small></span>
        <span className="q">
          <button className="minus" aria-label={`One less ${it.name}`} onClick={() => onQty(line.qty - 1)}>−</button>
          <span key={line.bumps} className={`qn${line.bumps ? " bump" : ""}`}>{line.qty}</span>
          <button className="plus" aria-label={`One more ${it.name}`} onClick={() => onQty(line.qty + 1)}>+</button>
        </span>
        <span className="a">{rs(it.price * line.qty)}</span>
      </div>
    </div>
  );
}
