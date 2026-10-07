import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="mt-2 text-neutral-400">That route doesn&apos;t exist. Head back to the library.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-5 py-3 font-semibold text-black">Go to workouts</Link>
    </div>
  );
}
