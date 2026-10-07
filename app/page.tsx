"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Dumbbell, Search } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import WorkoutCard from "@/components/WorkoutCard";

type SortKey = "duration" | "calories" | "rating";

export default function Home() {
  const [items, setItems] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortKey>("duration");
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchWorkouts()
      .then(setItems)
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => {
    const term = q.toLowerCase();
    return items
      .filter(
        (w) =>
          !term ||
          w.title.toLowerCase().includes(term) ||
          w.categories.some((c) => c.toLowerCase().includes(term)),
      )
      .sort((a, b) =>
        sort === "duration" ? a.duration - b.duration : b[sort] - a[sort],
      );
  }, [items, sort, q]);

  return (
    <>
      <section className="my-8 overflow-hidden rounded-2xl border border-line bg-panel px-6 py-10 sm:px-10 md:my-10 md:px-16 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-accent">
              WORKOUT LIBRARY
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Train with intent. Log every set.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-xs font-bold tracking-wide text-black transition hover:brightness-110"
            >
              <Dumbbell size={14} /> BROWSE WORKOUTS
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/banner.png"
            alt="FitLog workout banner"
            className="mx-auto h-64 w-full object-contain md:h-80"
          />
        </div>
      </section>

      <section id="library" className="scroll-mt-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">
              The Library
            </h2>
            <p className="text-neutral-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-sm">
              <Search size={16} className="text-neutral-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or tag"
                className="w-40 bg-transparent outline-none placeholder:text-neutral-500"
              />
            </label>
            <label className="relative flex items-center text-sm">
              <span className="mr-2 text-neutral-400">Sort By</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 outline-none focus:border-accent"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
            <p className="text-neutral-400">Loading workouts…</p>
          </div>
        ) : error ? (
          <p className="py-20 text-center text-red-400">{error}</p>
        ) : list.length === 0 ? (
          <p className="py-20 text-center text-neutral-400">
            No workouts match your search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => (
              <WorkoutCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
