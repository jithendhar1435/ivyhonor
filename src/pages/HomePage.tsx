
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Notebook, Calendar, CheckCircle } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const HomePage = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ivy mb-6">
            Transform Your College Application Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            IvyCraft helps ambitious students create compelling applications for elite universities through AI-powered guidance and strategic planning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-ivy hover:bg-ivy-accent text-white">
                Get Started
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-ivy text-ivy hover:bg-ivy hover:text-white">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ivy mb-12">
            Our Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course Planner */}
            <Card className="border-t-4 border-t-ivy shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-ivy/10 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-ivy" />
                </div>
                <h3 className="text-xl font-bold mb-2">Course Planner</h3>
                <p className="text-gray-600">
                  Get personalized course recommendations based on your target schools and academic goals.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">School-specific course suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">Academic strength analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Essay Editor */}
            <Card className="border-t-4 border-t-ivy-accent shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-ivy-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Notebook className="h-6 w-6 text-ivy-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Essay Editor</h3>
                <p className="text-gray-600">
                  Develop compelling narratives with AI-powered feedback tailored to your target schools.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">Grammar and style improvement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">School-specific content suggestions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Application Tracker */}
            <Card className="border-t-4 border-t-ivy shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-ivy/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-ivy" />
                </div>
                <h3 className="text-xl font-bold mb-2">Application Tracker</h3>
                <p className="text-gray-600">
                  Stay on top of deadlines and requirements with a comprehensive application dashboard.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">Deadline reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-ivy-accent mr-2 shrink-0" />
                    <span className="text-sm">Application progress monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-16 bg-ivy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Upgrade to Premium</h2>
            <p className="text-lg text-white/80 mb-8">
              Get advanced AI features, detailed guidance, and personalized strategies for just $10/month.
            </p>
            
            <div className="bg-white rounded-lg p-6 text-left shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-ivy text-2xl font-bold">Premium Plan</h3>
                  <p className="text-gray-600">Unlock your full potential</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-ivy">$10</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Detailed course planning tailored to target schools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced essay feedback with narrative enhancement</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Prioritized application strategies and timelines</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited AI-powered recommendations</span>
                </li>
              </ul>
              
              <Link to="/signup">
                <Button className="w-full bg-ivy hover:bg-ivy-accent">
                  Get Started with Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ivy mb-12">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-ivy-accent">★★★★★</div>
                <p className="italic mb-4">
                  "IvyCraft helped me plan my courses strategically. I got accepted to Stanford with their guidance!"
                </p>
                <div className="font-medium">Alex T.</div>
                <div className="text-sm text-gray-500">Stanford University '26</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-ivy-accent">★★★★★</div>
                <p className="italic mb-4">
                  "The essay feedback transformed my personal statement. Harvard was impressed with my story."
                </p>
                <div className="font-medium">Priya M.</div>
                <div className="text-sm text-gray-500">Harvard University '25</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-ivy-accent">★★★★★</div>
                <p className="italic mb-4">
                  "The application tracker kept me organized and ahead of deadlines. Yale, here I come!"
                </p>
                <div className="font-medium">Jordan L.</div>
                <div className="text-sm text-gray-500">Yale University '26</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-ivy mb-6">
            Ready to Transform Your College Application?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of students who have successfully navigated their way to elite universities with IvyCraft.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-ivy hover:bg-ivy-accent text-white">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
