import * as React from "react";
import { cn } from "../../lib/utils";

export interface NavigationMenuItem {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationMenuItem[];
}

export const NavigationMenu = React.forwardRef<
  HTMLElement,
  NavigationMenuProps
>(({ className, items, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between py-4 px-6 bg-background border-b border-border",
        className
      )}
      {...props}
    >
      <ul className="flex gap-2 md:gap-4">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={item.onClick}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
              )}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              {/* Hide text on small screens, show on medium and up */}
              <span className="hidden md:inline-block md:ml-2">
                {typeof item.label === "string" ? item.label : item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

NavigationMenu.displayName = "NavigationMenu";
