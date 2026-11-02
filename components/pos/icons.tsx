const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Icon = {
  search: () => (<svg {...base} stroke="#6B7280"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>),
  mic: () => (<svg {...base} stroke="#111827"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>),
  scan: () => (<svg {...base} stroke="#111827"><path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3M8 9v6M11 9v6M14 9v6M17 9v6" /></svg>),
  cash: () => (<svg {...base}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>),
  qr: () => (<svg {...base}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2z" /></svg>),
  book: () => (<svg {...base}><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z" /></svg>),
  print: () => (<svg {...base}><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z" /></svg>),
  check: () => (<svg {...base} strokeWidth={2.5}><path d="M5 12l5 5 9-10" /></svg>),
  trash: () => (<svg {...base}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>),
};
