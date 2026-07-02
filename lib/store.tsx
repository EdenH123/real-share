"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SEED_HOLDINGS,
  SEED_ORDERS,
  SEED_NOTIFICATIONS,
  type Holding,
  type Order,
  type OrderSide,
} from "./seed";

const STORAGE_KEY = "realshare.store.v1";

type WaitlistEntry = { email: string; name?: string; market?: string } | null;

type PersistState = {
  // extra holdings from simulated invests, keyed additively onto seed
  addedHoldings: Holding[];
  // extra simulated orders
  addedOrders: Order[];
  // notifications read ids
  readNotifIds: string[];
  onboarded: boolean;
  waitlist: WaitlistEntry;
  // install prompt card dismissed on Home
  installDismissed: boolean;
};

const DEFAULT_STATE: PersistState = {
  addedHoldings: [],
  addedOrders: [],
  readNotifIds: [],
  onboarded: false,
  waitlist: null,
  installDismissed: false,
};

type StoreValue = {
  ready: boolean;
  // derived
  holdings: Holding[];
  orders: Order[];
  isRead: (id: string) => boolean;
  onboarded: boolean;
  waitlist: WaitlistEntry;
  installDismissed: boolean;
  // actions
  addInvestment: (propertyId: string, tokens: number, pricePerToken: number) => void;
  placeOrder: (propertyId: string, side: OrderSide, tokens: number, price: number) => void;
  markAllRead: () => void;
  setOnboarded: (v: boolean) => void;
  setWaitlist: (entry: WaitlistEntry) => void;
  dismissInstall: () => void;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function mergeHoldings(added: Holding[]): Holding[] {
  const map = new Map<string, Holding>();
  for (const h of [...SEED_HOLDINGS, ...added]) {
    const existing = map.get(h.propertyId);
    if (existing) {
      const totalTokens = existing.tokens + h.tokens;
      const totalCost =
        existing.tokens * existing.costBasisPerToken +
        h.tokens * h.costBasisPerToken;
      map.set(h.propertyId, {
        propertyId: h.propertyId,
        tokens: totalTokens,
        costBasisPerToken: totalCost / totalTokens,
      });
    } else {
      map.set(h.propertyId, { ...h });
    }
  }
  return Array.from(map.values());
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistState>;
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: PersistState) => {
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addInvestment = useCallback(
    (propertyId: string, tokens: number, pricePerToken: number) => {
      setState((prev) => {
        const next: PersistState = {
          ...prev,
          addedHoldings: [
            ...prev.addedHoldings,
            { propertyId, tokens, costBasisPerToken: pricePerToken },
          ],
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const placeOrder = useCallback(
    (propertyId: string, side: OrderSide, tokens: number, price: number) => {
      setState((prev) => {
        const order: Order = {
          id: `mine-${prev.addedOrders.length + 1}`,
          propertyId,
          side,
          tokens,
          price,
          mine: true,
        };
        const next: PersistState = {
          ...prev,
          addedOrders: [order, ...prev.addedOrders],
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const markAllRead = useCallback(() => {
    setState((prev) => {
      const next: PersistState = {
        ...prev,
        readNotifIds: SEED_NOTIFICATIONS.map((n) => n.id),
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setOnboarded = useCallback(
    (v: boolean) => persist({ ...state, onboarded: v }),
    [persist, state]
  );

  const setWaitlist = useCallback(
    (entry: WaitlistEntry) => {
      setState((prev) => {
        const next = { ...prev, waitlist: entry };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const dismissInstall = useCallback(() => {
    setState((prev) => {
      const next: PersistState = { ...prev, installDismissed: true };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const resetDemo = useCallback(() => persist(DEFAULT_STATE), [persist]);

  const holdings = useMemo(
    () => mergeHoldings(state.addedHoldings),
    [state.addedHoldings]
  );

  const orders = useMemo(
    () => [...state.addedOrders, ...SEED_ORDERS],
    [state.addedOrders]
  );

  const isRead = useCallback(
    (id: string) => {
      const seed = SEED_NOTIFICATIONS.find((n) => n.id === id);
      return state.readNotifIds.includes(id) || (seed?.read ?? false);
    },
    [state.readNotifIds]
  );

  const value: StoreValue = {
    ready,
    holdings,
    orders,
    isRead,
    onboarded: state.onboarded,
    waitlist: state.waitlist,
    installDismissed: state.installDismissed,
    addInvestment,
    placeOrder,
    markAllRead,
    setOnboarded,
    setWaitlist,
    dismissInstall,
    resetDemo,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
