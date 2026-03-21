import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "RECEIVABLE", path: "/" },
  { label: "PAYABLE", path: "/accounts-payable" },
];

export function HubNav() {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-2 font-mono text-xs tracking-widest">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-4 py-2 rounded-md transition-all ${
            pathname === item.path
              ? "bg-primary/20 text-primary glow-border"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
