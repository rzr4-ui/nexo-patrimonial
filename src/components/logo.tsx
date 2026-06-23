import { cn } from "@/lib/utils";

export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="9"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path
          d="M12 28V12L28 28V12"
          stroke="#C8A15A"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="leading-none">
        <span className="block text-[1.05rem] font-bold tracking-[0.12em]">
          NEXO
          <span className="ml-1 font-light tracking-[0.2em] opacity-80">
            PATRIMONIAL
          </span>
        </span>
        {showTagline && (
          <span className="mt-1 block text-[0.6rem] font-semibold tracking-[0.34em] text-gold">
            PATRIMONIO 360°
          </span>
        )}
      </div>
    </div>
  );
}
