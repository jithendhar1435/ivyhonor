
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Notebook,
  BookOpen,
  Calendar,
  Home,
  LogOut,
  Crown,
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout, isPremium } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Course Planner", path: "/courses", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { name: "Essay Editor", path: "/essays", icon: <Notebook className="mr-2 h-4 w-4" /> },
    { name: "Application Tracker", path: "/applications", icon: <Calendar className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-ivy text-white">
        <div className="px-6 py-5 flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-ivy-accent font-bold text-xl">IvyCraft</span>
          </Link>
        </div>
        <Separator className="bg-ivy-accent/20" />

        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          <nav className="flex-1 px-3 py-6">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-ivy-accent hover:text-ivy transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Premium banner for free users */}
            {user && !isPremium && (
              <div className="mt-6 mx-3 p-3 bg-ivy-accent/10 rounded-md border border-ivy-accent/20">
                <div className="flex items-center mb-2">
                  <Crown className="h-5 w-5 text-ivy-accent" />
                  <span className="ml-2 text-sm font-medium text-ivy-accent">Upgrade to Premium</span>
                </div>
                <p className="text-xs text-white/70 mb-3">
                  Unlock advanced AI features and detailed guidance.
                </p>
                <Button
                  size="sm"
                  onClick={() => navigate("/premium")}
                  className="w-full bg-ivy-accent hover:bg-gold text-ivy font-medium"
                >
                  Upgrade for $10/mo
                </Button>
              </div>
            )}

            {/* Premium badge for premium users */}
            {user && isPremium && (
              <div className="mt-6 mx-3 p-3 bg-ivy-accent/20 rounded-md border border-ivy-accent/30">
                <div className="flex items-center">
                  <Crown className="h-5 w-5 text-ivy-accent" />
                  <span className="ml-2 text-sm font-medium text-ivy-accent">Premium Active</span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  You have access to all premium features.
                </p>
              </div>
            )}
          </nav>

          <div className="p-4">
            {user ? (
              <div className="flex flex-col">
                <div className="px-3 py-2 text-sm text-white/70">
                  {user.email}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center justify-center border-white/20 text-white hover:bg-white/10 hover:text-white mt-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-ivy h-16 flex items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="text-ivy-accent font-bold text-xl">
            IvyCraft
          </Link>
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="text-white">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0">
        <div className="container py-6 md:py-12 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
