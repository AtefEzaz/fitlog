"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();

  const link = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-accent/15 text-accent"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="justify-self-start">
          <Logo />
        </Link>

        <div className="flex items-center gap-1">
          {link("/", "Workouts", path === "/" || path.startsWith("/workout"))}
          {link("/my-plan", "My Plan", path === "/my-plan")}
        </div>

        <div className="flex items-center gap-4 justify-self-end text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-neutral-200"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-neutral-400"
          >
            <span className="hidden sm:inline">Saved</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-neutral-600 bg-neutral-900 px-1 text-[10px] font-bold text-neutral-200">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
