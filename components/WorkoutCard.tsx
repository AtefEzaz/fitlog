import Link from "next/link";
import { Workout } from "@/lib/types";
import Stats from "./Stats";
export const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t) => (
      <span key={t} className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase text-accent">{t}</span>
    ))}
  </div>
);
export default function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link href={`/workout/${w.id}`} className="group block overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-4">
        <Tags tags={w.categories} />
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{w.title}</h3>
        <p className="text-sm text-neutral-400">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}
