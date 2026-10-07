import { Workout } from "./types";

const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

const toList = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.map(String)
    : typeof v === "string" && v
      ? v.split(",").map((s) => s.trim())
      : [];
const toNum = (v: unknown) => {
  const n = parseFloat(String(v ?? "").replace(/[^\d.]/g, ""));
  return isNaN(n) ? 0 : n;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalize(r: any): Workout {
  return {
    id: String(r.id ?? r._id ?? ""),
    title: String(r.title ?? r.name ?? "Untitled"),
    description: String(r.description ?? r.subtitle ?? r.about ?? ""),
    image: String(
      r.image ?? r.thumbnail ?? r.img ?? r.photo ?? r.imageUrl ?? "",
    ),
    categories: toList(r.categories ?? r.category ?? r.tags ?? r.muscleGroups),
    equipment: toList(r.equipment).join(", "),
    difficulty: String(r.difficulty ?? r.level ?? "-"),
    sets: String(r.sets ?? "-"),
    reps: String(r.reps ?? "-"),
    duration: toNum(r.duration ?? r.durationMinutes ?? r.time),
    calories: toNum(r.caloriesBurned ?? r.calories ?? r.kcal),
    rating: toNum(r.rating),
    instructions: toList(r.instructions ?? r.steps).length
      ? Array.isArray(r.instructions ?? r.steps)
        ? (r.instructions ?? r.steps).map(String)
        : toList(r.instructions ?? r.steps)
      : [],
  };
}

async function get(path: string) {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path);
      if (!res.ok) throw new Error(String(res.status));
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const j = await get("");
  const arr = Array.isArray(j) ? j : (j.data ?? j.workouts ?? j.items ?? []);
  return arr.map(normalize);
}

export async function fetchWorkout(id: string): Promise<Workout> {
  const j = await get("/" + id);
  return normalize(j.data ?? j.workout ?? j);
}
