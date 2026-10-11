import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { pill: "h-10 pl-5 pr-1 text-sm gap-3", circle: "w-8 h-8", icon: 15 },
  md: { pill: "h-12 pl-6 pr-1.5 text-sm gap-4", circle: "w-9 h-9", icon: 16 },
  lg: { pill: "h-14 pl-7 pr-2 text-base gap-5", circle: "w-10 h-10", icon: 18 },
};

const tones = {
  light: { pill: "bg-white text-black hover:bg-white/90", circle: "bg-black text-white" },
  dark: { pill: "bg-black text-white hover:bg-black/85", circle: "bg-white text-black" },
  ghost: {
    pill: "bg-white/[0.06] text-white border border-white/20 backdrop-blur-xl hover:bg-white/[0.12]",
    circle: "bg-white text-black",
  },
};

/** A single pill button with the label and a round arrow badge inside it. */
export const PillLink = ({
  href,
  label,
  size = "sm",
  variant = "light",
  external,
  onClick,
  className,
}: {
  href: string;
  label: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof tones;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const s = sizes[size];
  const t = tones[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center shrink-0 rounded-full font-medium whitespace-nowrap transition-colors duration-300",
        s.pill,
        t.pill,
        className
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          s.circle,
          t.circle,
          "rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"
        )}
      >
        <ArrowUpRight size={s.icon} />
      </span>
    </a>
  );
};
