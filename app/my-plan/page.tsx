"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import Stats from "@/components/Stats";

export default function MyPlan() {
  const { plan, saved, ready, removePlan, removeSaved, markDone } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const list = tab === "plan" ? plan : saved;
  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", plan.reduce((s, p) => s + p.duration, 0)],
    ["Calories", plan.reduce((s, p) => s + p.calories, 0)],
  ];
  return (
    <div className="py-10">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {metrics.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-panel p-5">
            <p className="font-display text-4xl font-bold text-accent">{v}</p>
            <p className="text-sm uppercase tracking-wider text-neutral-400">{k}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        {(["plan", "saved"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${tab === t ? "border-accent text-accent" : "border-transparent text-neutral-400 hover:text-white"}`}>
            {t === "plan" ? `Today's Plan (${plan.length})` : `Saved (${saved.length})`}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {!ready ? (
          <p className="py-16 text-center text-neutral-400">Loading workouts…</p>
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase">Nothing here yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-neutral-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-5 py-3 font-semibold text-black">Go to workouts</Link>
          </div>
        ) : (
          list.map((w) => {
            const done = tab === "plan" && "done" in w && (w as { done?: boolean }).done;
            return (
              <article key={w.id} className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${done ? "opacity-60" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.image} alt={w.title} className="h-24 w-full rounded-lg object-cover sm:w-32" />
                <div className="flex-1 space-y-1">
                  <h3 className={`font-display text-xl font-semibold uppercase ${done ? "line-through" : ""}`}>{w.title}</h3>
                  <p className="text-sm text-neutral-400">{w.equipment}</p>
                  <Stats w={w} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/workout/${w.id}`} className="rounded-md border border-neutral-600 px-3 py-2 text-sm hover:border-accent">View Details</Link>
                  {tab === "plan" && (
                    <button onClick={() => markDone(w.id)} disabled={!!done} className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black disabled:opacity-50">
                      <Check size={16} /> {done ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button aria-label="Remove" onClick={() => (tab === "plan" ? removePlan(w.id) : removeSaved(w.id))} className="rounded-md border border-neutral-600 p-2 hover:border-red-400 hover:text-red-400">
                    <X size={16} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
