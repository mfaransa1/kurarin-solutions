import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  showTagline?: boolean;
};

export function SiteLogo({
  className = "",
  priority = false,
  showTagline = false,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Kurarin Solutions home"
      className={`inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--kurarin-orange)] ${className}`}
    >
      <Image
        src="/images/kurarin-solutions-logo.png"
        alt="Kurarin Solutions — Storing Knowledge, Delivering Solutions."
        width={1024}
        height={1024}
        priority={priority}
        sizes="(max-width: 640px) 64px, 84px"
        className="h-16 w-16 shrink-0 object-contain sm:h-[5.25rem] sm:w-[5.25rem]"
      />
      <span className="flex min-w-0 flex-col">
        <span className="text-lg font-extrabold tracking-tight text-[var(--kurarin-black)] sm:text-xl">
          Kurarin <span className="text-[var(--kurarin-orange)]">Solutions</span>
        </span>
        {showTagline ? (
          <span className="mt-1 max-w-56 text-xs leading-relaxed text-[var(--kurarin-gray)] sm:text-sm">
            Storing Knowledge, Delivering Solutions.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
