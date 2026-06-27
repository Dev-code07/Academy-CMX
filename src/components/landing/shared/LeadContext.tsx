import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type LeadCtx = {
  openLead: (source?: string, payload?: any) => void;
};

const Ctx = createContext<LeadCtx | null>(null);

export function useLeadModal() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLeadModal must be inside LeadModalProvider");
  return c;
}

export function LeadModalProvider({
  children,
  render,
}: {
  children: ReactNode;
  render: (open: boolean, source: string, close: () => void, payload?: any) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero");
  const [payload, setPayload] = useState<any>(undefined);

  const openLead = useCallback((s = "cta", p?: any) => {
    setSource(s);
    setPayload(p);
    setOpen(true);
  }, []);

  return (
    <Ctx.Provider value={{ openLead }}>
      {children}
      {render(open, source, () => setOpen(false), payload)}
    </Ctx.Provider>
  );
}
