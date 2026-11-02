"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCT_ART } from "./art";
import { CUSTOMERS, ITEMS, SAMPLE_BILL, rs } from "./data";
import { Icon } from "./icons";
import { BillLine, type Line } from "./BillLine";
import { useTween } from "./useTween";

type Pane = "bill" | "cash" | "qr" | "udharo";
type Done = { title: string; sub: string } | null;

const DESIGN_W = 1280; // the POS screen is drawn at 1280x800 and scaled to fit
const PAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

function quickAmounts(total: number): number[] {
  let a = Math.ceil(total / 500) * 500;
  let b = Math.ceil(total / 1000) * 1000;
  if (a === total) a += 500;
  if (b <= a) b = a + 500;
  if (b % 1000) b += 500;
  return [total, a, b];
}

export function PosDemo() {
  const scrRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.5);

  const [lines, setLines] = useState<Line[]>(() =>
    SAMPLE_BILL.map(([id, qty]) => ({ id, qty, status: "still" as const, bumps: 0 })),
  );
  const [pane, setPane] = useState<Pane>("bill");
  const [recv, setRecv] = useState("");
  const fresh = useRef(true);
  const [split, setSplit] = useState(0);
  const [pick, setPick] = useState(-1);
  const [owes, setOwes] = useState(() => CUSTOMERS.map((c) => c.owes));
  const [done, setDone] = useState<Done>(null);
  const [okVisible, setOkVisible] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const [peekId, setPeekId] = useState<number | null>(null);

  /* scale the 1280px screen to the tablet's width */
  useEffect(() => {
    const el = scrRef.current;
    if (!el) return;
    const fit = () => setK(el.clientWidth / DESIGN_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const live = useMemo(() => lines.filter((l) => l.status !== "leaving"), [lines]);
  const total = live.reduce((t, l) => t + ITEMS[l.id].price * l.qty, 0);
  const count = live.reduce((t, l) => t + l.qty, 0);
  const due = total - split;
  const qtyOf = (id: number) => live.find((l) => l.id === id)?.qty ?? 0;

  const setQty = useCallback((id: number, q: number) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === id && l.status !== "leaving");
      if (q <= 0) {
        if (i < 0) return prev;
        const next = prev.slice();
        next[i] = { ...next[i], status: "leaving" };
        return next;
      }
      if (i < 0) return [...prev.filter((l) => l.id !== id), { id, qty: q, status: "new", bumps: 0 }];
      const next = prev.slice();
      next[i] = { ...next[i], qty: q, bumps: next[i].bumps + 1 };
      return next;
    });
  }, []);

  /* drop lines once their fold-away animation has played */
  useEffect(() => {
    if (!lines.some((l) => l.status === "leaving")) return;
    const t = setTimeout(() => setLines((prev) => prev.filter((l) => l.status !== "leaving")), 300);
    return () => clearTimeout(t);
  }, [lines]);

  /* scroll to a newly added line */
  const lastNew = lines.filter((l) => l.status === "new").length;
  useEffect(() => {
    const el = listRef.current;
    if (el && lastNew) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lastNew]);

  /* once the tablet scrolls into view, nudge the first line to hint at swipe-to-remove */
  useEffect(() => {
    const el = scrRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => {
          setPeekId(SAMPLE_BILL[0][0]);
          setTimeout(() => setPeekId(null), 1000);
        }, 1400);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const add = (id: number) => {
    if (pane !== "bill") setPane("bill");
    setOpenId(null);
    setQty(id, qtyOf(id) + 1);
  };
  const clearAll = () => setLines((prev) => prev.map((l) => ({ ...l, status: "leaving" as const })));

  const show = (p: Pane, keepSplit = false) => {
    if (p !== "bill" && !live.length) return;
    if (!keepSplit) setSplit(0);
    setOpenId(null);
    if (p === "cash") {
      setRecv(String(quickAmounts(total)[2]));
      fresh.current = true;
    }
    if (p === "udharo") setPick(-1);
    setPane(p);
  };

  const finish = (title: string, sub: string) => {
    setDone({ title, sub });
    setOkVisible(true);
    setTimeout(() => {
      setPane("bill");
      setSplit(0);
      clearAll();
      setTimeout(() => setOkVisible(false), 150);
    }, 1600);
  };

  /* cash */
  const received = Number(recv) || 0;
  const paidEnough = received >= total;
  const press = (key: string) => {
    if (key === "⌫") setRecv((r) => r.slice(0, -1));
    else setRecv(((fresh.current ? "" : recv) + key).replace(/^0+/, "").slice(0, 6));
    fresh.current = false;
  };

  /* udharo */
  const picked = pick >= 0 ? CUSTOMERS[pick] : null;
  const first = picked?.name.split(" ")[0] ?? "";

  const totalShown = useTween(total);
  const changeShown = useTween(paidEnough ? received - total : total - received);

  let note: React.ReactNode;
  if (okVisible && done) note = <><b>✓</b> {done.title}</>;
  else if (pane === "cash") note = <><b>{rs(Math.abs(received - total))}</b> {paidEnough ? "change" : "still to pay"}</>;
  else if (pane === "qr") note = <><b>{rs(due)}</b> by QR</>;
  else if (pane === "udharo") note = <><b>{rs(due)}</b> on udharo</>;
  else note = total ? <><b>{rs(total)}</b> bill ready</> : "Tap items to start";

  return (
    <>
      <div className="device">
        <div className="tablet" aria-label="Try the eSahuji POS: tap items, then pay by cash, QR or udharo">
          <div className="scr" ref={scrRef}>
            <div
              className="app"
              style={{ "--k": k } as React.CSSProperties}
              onPointerDown={(e) => {
                if (openId !== null && !(e.target as HTMLElement).closest(".bl.open")) setOpenId(null);
              }}
            >
              <div className="rail">
                <span className="chev">›</span>
                <span className="sdot" />
              </div>

              <div className="left">
                <div className="srow">
                  <div className="sbox">
                    <Icon.search />
                    <span>Search products or scan barcode</span>
                    <span className="mic"><Icon.mic /></span>
                  </div>
                  <div className="scan"><Icon.scan /></div>
                </div>
                <div className="cats">
                  {["Fast 18", "All", "Noodles", "Drinks", "Rice & Dal", "Oil & Ghee", "Soap", "Biscuits"].map((c, i) => (
                    <span key={c} className={i === 0 ? "on" : undefined}>{c}</span>
                  ))}
                </div>
                <div className="items">
                  {ITEMS.map((it, i) => {
                    const q = qtyOf(i);
                    return (
                      <TileButton key={it.name} index={i} onAdd={() => add(i)} label={`Add ${it.name}, ${rs(it.price)}`}>
                        <span className="ini" dangerouslySetInnerHTML={{ __html: PRODUCT_ART[i] }} />
                        <span className="nm">{it.name}</span>
                        <span className="pr">{rs(it.price)}</span>
                        <span key={q} className={`qb${q ? " on" : ""}${q > 1 ? " bump" : ""}`}>{q || ""}</span>
                      </TileButton>
                    );
                  })}
                </div>
              </div>

              <div className="right">
                {/* bill */}
                <section className={`pane${pane === "bill" ? " on" : ""}`}>
                  <div className="bh">
                    <b>Bill</b>
                    <span className="cnt">{count} {count === 1 ? "item" : "items"}</span>
                    <button className="clr" onClick={clearAll}>Clear</button>
                  </div>
                  <div className="blines" ref={listRef}>
                    <div className={`empty${live.length ? "" : " show"}`}>Tap an item to start a bill</div>
                    {lines.map((l) => (
                      <BillLine
                        key={`${l.id}-${l.status === "leaving" ? "x" : "a"}`}
                        line={l}
                        scale={k}
                        open={openId === l.id}
                        peek={peekId === l.id}
                        onOpen={(o) => setOpenId(o ? l.id : null)}
                        onQty={(q) => setQty(l.id, q)}
                      />
                    ))}
                  </div>
                  <div className="bfoot">
                    <div className="trow"><span>Total</span><b>{rs(totalShown)}</b></div>
                    <button className="pbtn cashb" onClick={() => show("cash")}><Icon.cash />Cash</button>
                    <div className="two">
                      <button className="pbtn ob" onClick={() => show("qr")}><Icon.qr />QR</button>
                      <button className="pbtn ob" onClick={() => show("udharo")}><Icon.book />Udharo</button>
                    </div>
                  </div>
                </section>

                {/* cash */}
                <section className={`pane${pane === "cash" ? " on" : ""}`}>
                  <div className="ph"><button className="back" onClick={() => show("bill")} aria-label="Back">←</button><b>Cash</b></div>
                  <div className="trow sm"><span>Total</span><b>{rs(total)}</b></div>
                  <div className="recv"><span>Received</span><b>{rs(received)}</b></div>
                  <div className="quick">
                    {quickAmounts(total).map((v, i) => (
                      <button key={i} className={received === v ? "on" : undefined} onClick={() => { setRecv(String(v)); fresh.current = true; }}>
                        {i ? rs(v) : "Exact"}
                      </button>
                    ))}
                  </div>
                  <div className="pad">
                    {PAD.map((key) => (
                      <button key={key} onClick={() => press(key)} aria-label={key === "⌫" ? "Delete" : key}>{key}</button>
                    ))}
                  </div>
                  <div className={`chg ${paidEnough ? "ok" : "due"}`}>
                    <span>{paidEnough ? "Change" : "Still to pay"}</span>
                    <b>{rs(changeShown)}</b>
                  </div>
                  {paidEnough ? (
                    <button className="pbtn cashb done" onClick={() => finish("Bill saved", `Change ${rs(received - total)} · printed`)}>
                      <Icon.print />Done and print
                    </button>
                  ) : (
                    <div className={`two split${received > 0 ? "" : " gone"}`}>
                      <button className="pbtn ob" onClick={() => { setSplit(received); show("qr", true); }}>Rest by QR</button>
                      <button className="pbtn ob" onClick={() => { setSplit(received); show("udharo", true); }}>Rest on udharo</button>
                    </div>
                  )}
                </section>

                {/* QR */}
                <section className={`pane${pane === "qr" ? " on" : ""}`}>
                  <div className="ph"><button className="back" onClick={() => show("bill")} aria-label="Back">←</button><b>{split ? "Rest by QR" : "QR payment"}</b></div>
                  <div className="qrwrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/qr.png" alt="Shop QR code" width={264} height={264} />
                  </div>
                  <div className="qrt"><span>Scan and pay</span><b>{rs(due)}</b><small>Fonepay · eSewa · Khalti · bank apps</small></div>
                  <button
                    className="pbtn cashb"
                    onClick={() => finish("Payment received", split ? `${rs(split)} cash + ${rs(due)} QR` : `${rs(total)} by QR`)}
                  >
                    <Icon.check />Payment received
                  </button>
                  <button className="cancel" onClick={() => show("bill")}>Cancel</button>
                </section>

                {/* udharo */}
                <section className={`pane${pane === "udharo" ? " on" : ""}`}>
                  <div className="ph">
                    <button className="back" onClick={() => show("bill")} aria-label="Back">←</button>
                    <div>
                      <b>{split ? "Rest on udharo" : "Udharo"}</b>
                      <small className="ub">{split ? `Cash ${rs(split)} paid · rest ${rs(due)}` : `Bill ${rs(total)}`}</small>
                    </div>
                  </div>
                  <div className="usearch"><Icon.search />Name or phone</div>
                  <div className="custs">
                    {CUSTOMERS.map((c, i) => (
                      <button key={c.name} className={`cu${i === pick ? " on" : ""}`} onClick={() => setPick(i)}>
                        <span className="av">{c.initials}</span>
                        <span><b>{c.name}</b><small>{c.phone}</small></span>
                        <span className="ow">Owes<b className={owes[i] ? undefined : "z"}>{rs(owes[i])}</b></span>
                      </button>
                    ))}
                  </div>
                  <div className={`usum${picked ? " show" : ""}`}>
                    {picked && (
                      <>
                        <div><span>{first} owes now</span><span>{rs(owes[pick])}</span></div>
                        <div><span>{split ? "Rest of bill" : "This bill"}</span><span>+ {rs(due)}</span></div>
                        <div className="nb"><span>New balance</span><b>{rs(owes[pick] + due)}</b></div>
                      </>
                    )}
                  </div>
                  <button
                    className={`pbtn blue${picked ? "" : " dis"}`}
                    onClick={() => {
                      if (!picked) return;
                      const newOwes = owes[pick] + due;
                      setOwes((o) => o.map((v, i) => (i === pick ? newOwes : v)));
                      finish(
                        "Added to udharo",
                        split ? `${rs(split)} cash + ${rs(due)} udharo for ${first}` : `${picked.name} now owes ${rs(newOwes)}`,
                      );
                    }}
                  >
                    {picked ? `Add to ${first}’s udharo` : "Pick a customer"}
                  </button>
                </section>

                <div className={`okmsg${okVisible ? " show" : ""}`} role="status" aria-live="polite">
                  <span key={okVisible ? "on" : "off"}>✓</span>
                  <b>{done?.title}</b>
                  <small>{done?.sub}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float f1"><span className="dot" />Synced</div>
      <div className="float f2">{note}</div>
    </>
  );
}

/** A Fast 18 tile that plays a short press animation on every tap. */
function TileButton({ index, onAdd, label, children }: { index: number; onAdd: () => void; label: string; children: React.ReactNode }) {
  const [taps, setTaps] = useState(0);
  return (
    <button
      className={`it c${index % 6}${taps ? (taps % 2 ? " tapA" : " tapB") : ""}`}
      aria-label={label}
      onClick={() => { setTaps((t) => t + 1); onAdd(); }}
    >
      {children}
    </button>
  );
}
