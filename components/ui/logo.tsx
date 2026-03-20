import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "white";
}

export function Logo({ className, size = "md", showText = true, variant = "default" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", text: "text-lg", iconInner: "h-4 w-4" },
    md: { icon: "h-10 w-10", text: "text-xl", iconInner: "h-5 w-5" },
    lg: { icon: "h-14 w-14", text: "text-3xl", iconInner: "h-7 w-7" },
  };

  const textColor = variant === "white" ? "text-white" : "text-foreground";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Mark - Stylized "A" with golden accent */}
      <div className={cn(
        "relative rounded-xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20",
        sizes[size].icon
      )}>
        {/* Inner A shape */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={cn("relative z-10", sizes[size].iconInner)}
        >
          <path 
            d="M12 3L4 21H8L10 16H14L16 21H20L12 3ZM11 13L12 9L13 13H11Z" 
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
        {/* Decorative shine */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight leading-none", sizes[size].text, textColor)}>
            AuraWealth
          </span>
          {size !== "sm" && (
            <span className={cn(
              "text-[10px] tracking-widest uppercase mt-0.5",
              variant === "white" ? "text-white/70" : "text-muted-foreground"
            )}>
              Your Private Wealth Manager
            </span>
          )}
        </div>
      )}
    </div>
  );
}
