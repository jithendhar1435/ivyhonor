
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-ivy font-bold text-xl flex items-center gap-2">
            IvyCraft
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-ivy text-ivy hover:bg-ivy hover:text-white">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-ivy hover:bg-ivy-accent text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ivy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-ivy-accent font-bold text-lg mb-3">IvyCraft</h3>
              <p className="text-white/70 text-sm">
                Your AI-powered college admissions assistant.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Course Planner</li>
                <li>Essay Editor</li>
                <li>Application Tracker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>About Us</li>
                <li>Contact</li>
                <li>Testimonials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/50 text-center">
            © {new Date().getFullYear()} IvyCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
