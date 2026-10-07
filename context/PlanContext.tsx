"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { PlanItem, Workout } from "@/lib/types";

export const PLAN_LIMIT = 5;
interface Ctx {
  plan: PlanItem[];
  saved: Workout[];
  ready: boolean;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removePlan: (id: string) => void;
  removeSaved: (id: string) => void;
  markDone: (id: string) => void;
}
const PlanContext = createContext<Ctx | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, ready]);

  const addToPlan = (w: Workout) => {
    if (plan.some((p) => p.id === w.id)) return void toast("Already in today's plan");
    if (plan.length >= PLAN_LIMIT) return void toast.error("Plan is full (5 lifts max)");
    setPlan([...plan, w]);
    toast.success("Added to today's plan");
  };
  const saveForLater = (w: Workout) => {
    if (saved.some((s) => s.id === w.id)) return void toast("Already saved");
    setSaved([...saved, w]);
    toast.success("Saved for later");
  };
  const removePlan = (id: string) => { setPlan(plan.filter((p) => p.id !== id)); toast("Removed from today's plan"); };
  const removeSaved = (id: string) => { setSaved(saved.filter((p) => p.id !== id)); toast("Removed from saved"); };
  const markDone = (id: string) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider value={{ plan, saved, ready, addToPlan, saveForLater, removePlan, removeSaved, markDone }}>
      {children}
    </PlanContext.Provider>
  );
}
export const usePlan = () => {
  const c = useContext(PlanContext);
  if (!c) throw new Error("usePlan must be used inside PlanProvider");
  return c;
};
