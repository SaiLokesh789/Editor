"use client";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "details", label: "Details" },
  { href: "problems", label: "Problems" },
  { href: "moderators", label: "Moderators" },
  { href: "signups", label: "Signups" },
];

export function EditContestNavBar() {
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, -1).join("/");
  const navItemsWithBase = navItems.map((item) => ({
    ...item,
    href: `${basePath}/${item.href}`,
  }));

  return (
    <div className="flex flex-col bg-gray-100 border border-gray-400 rounded-t-lg px-6 pt-4 pb-0">
      <div className="flex gap-2 sm:gap-4">
        {navItemsWithBase.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center px-4 pt-2 rounded-t-lg transition-colors duration-150 pb-3
                ${
                  isActive
                    ? "bg-white border border-b-0 border-gray-400 mb-[-1px]"
                    : "text-gray-500 bg-gray-100"
                }
                hover:text-black`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
