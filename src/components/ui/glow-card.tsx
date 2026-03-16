"use client";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className="relative group">
      {/* Layer 1 — outer dark glow */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-xl blur-[3px]
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px]
        before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
        before:rotate-[60deg]
        before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
        before:transition-all before:duration-[2000ms]
        group-hover:before:rotate-[-120deg]" />
      {/* Layer 2 — inner soft glow */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-xl blur-[3px]
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px]
        before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
        before:rotate-[82deg]
        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)]
        before:transition-all before:duration-[2000ms]
        group-hover:before:rotate-[-98deg]" />
      {/* Layer 3 — highlight shimmer */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-xl blur-[2px]
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px]
        before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
        before:rotate-[83deg]
        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)]
        before:brightness-[1.40]
        before:transition-all before:duration-[2000ms]
        group-hover:before:rotate-[-97deg]" />
      {/* Layer 4 — dark inner fill */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-xl blur-[0.5px]
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px]
        before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
        before:rotate-[70deg]
        before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)]
        before:brightness-[1.30]
        before:transition-all before:duration-[2000ms]
        group-hover:before:rotate-[-110deg]" />
      {/* Card content — sits above all glow layers */}
      <div className={className}>{children}</div>
    </div>
  );
}
