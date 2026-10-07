"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Bookmark, ChevronLeft, Plus } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan, PLAN_LIMIT } from "@/context/PlanContext";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, saveForLater } = usePlan();
  const [w, setW] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWorkout(id)
      .then(setW)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="grid place-items-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      </div>
    );
  if (error || !w)
    return (
      <p className="py-32 text-center text-neutral-400">
        Workout not found.{" "}
        <Link href="/" className="text-accent underline">
          Back to library
        </Link>
      </p>
    );

  const full = plan.length >= PLAN_LIMIT && !plan.some((p) => p.id === w.id);
  const specs: [string, string][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", String(w.rating)],
  ];
  return (
    <div className="py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white"
      >
        <ChevronLeft size={16} /> Back to library
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={w.image}
          alt={w.title}
          className="aspect-square w-full rounded-2xl border border-line object-cover lg:aspect-auto lg:h-full"
        />
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">
            {w.title}
          </h1>
          <p className="text-neutral-400">{w.description}</p>
          <Tags tags={w.categories} />
          <dl className="divide-y divide-line rounded-xl border border-line bg-panel">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-3 text-sm">
                <dt className="font-semibold uppercase tracking-wider text-neutral-400">
                  {k}
                </dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold uppercase">
              Instructions
            </h2>
            <ol className="space-y-3">
              {w.instructions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-neutral-300">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(w)}
              disabled={full}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={18} /> Add to today&apos;s plan
            </button>
            <button
              onClick={() => saveForLater(w)}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-600 px-5 py-3 font-semibold transition hover:border-accent"
            >
              <Bookmark size={18} /> Save for later
            </button>
          </div>
          {full && (
            <p className="text-sm text-red-400">
              Today&apos;s plan is full (5 lifts).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
