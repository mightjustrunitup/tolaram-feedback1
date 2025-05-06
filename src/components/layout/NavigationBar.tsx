
import { cn } from "@/lib/utils";
import Logo from "./Logo";

interface NavigationBarProps {
  className?: string;
}

export default function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav className={cn(
      "w-full bg-[#E51E25] shadow-md py-4 px-6",
      className
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo className="text-white" />
        <div className="flex items-center gap-4">
          {/* This space is intentionally left empty as requested */}
        </div>
      </div>
    </nav>
  );
}
