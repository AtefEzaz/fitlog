export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.png"
        alt="FitLog logo"
        className="h-8 w-8 object-contain"
      />
      <span className="font-display text-xl font-bold tracking-wider">
        FITLOG
      </span>
    </span>
  );
}
