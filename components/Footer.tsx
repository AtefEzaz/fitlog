import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-400 sm:flex-row sm:px-6">
        <Logo />
        <p className="text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
