import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, Bell, Mail, Search, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-background text-foreground dark:bg-black dark:text-white">
      <nav className="w-20 lg:w-64 border-r border-border fixed h-full flex flex-col justify-between py-4">
        <div>

          <div className="px-4 mb-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-8 w-8 text-foreground"
                fill="currentColor"
              >
                <g>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </g>
              </svg>
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-auto p-2 rounded-full hover:bg-accent transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="space-y-1">
            <NavItem to="/" icon={<Home />} label="Home" />
            <NavItem to="/explore" icon={<Search />} label="Explore" />
            <NavItem to="/notifications" icon={<Bell />} label="Notifications" />
            <NavItem to="/messages" icon={<Mail />} label="Messages" />
            <NavItem to="/profile" icon={<User />} label="Profile" />
          </div>

          <div className="px-4 mt-6">
            <Button className="w-full rounded-full bg-primary text-primary-foreground">
              {isMobile ? "+" : "Post"}
            </Button>
          </div>
        </div>

        <div className="px-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden lg:inline">Log out</span>
          </Button>
        </div>
      </nav>

      <main className="flex-1 ml-20 lg:ml-64">
        <div className="container mx-auto max-w-2xl py-4">{children}</div>
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-foreground rounded-full hover:bg-accent transition-colors"
    >
      <span className="mr-4">{icon}</span>
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
};

export default Layout;
