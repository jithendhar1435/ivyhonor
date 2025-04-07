
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Crown, Check, BookOpen, Notebook, Calendar, Loader2 } from "lucide-react";

const PremiumPage = () => {
  const { isPremium } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "🎉 Subscription successful!",
        description: "You now have access to all premium features!",
      });
      
      // In a real implementation, this would trigger a state update via the auth context
      // For demo purposes, we'll just reload the page
      window.location.reload();
      
      setIsLoading(false);
    }, 2000);
  };

  const premiumFeatures = [
    {
      title: "Advanced Course Planning",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Detailed, school-specific course recommendations tailored to your target universities' preferences.",
      examples: [
        "MIT values STEM rigor - Add AP Physics C if available",
        "For Harvard, balance STEM with humanities to show breadth"
      ]
    },
    {
      title: "Enhanced Essay Feedback",
      icon: <Notebook className="h-5 w-5" />,
      description: "Narrative enhancement suggestions and school-specific content recommendations.",
      examples: [
        "Your essay lacks a personal hook - start with a specific story",
        "Stanford values innovation - emphasize your creative projects"
      ]
    },
    {
      title: "Strategic Application Tips",
      icon: <Calendar className="h-5 w-5" />,
      description: "Prioritized task lists and deadline optimization based on each school's process.",
      examples: [
        "Submit Harvard essay by Dec 15 - two weeks before deadline",
        "Princeton values demonstrated interest - mention campus visit"
      ]
    }
  ];

  if (isPremium) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Crown className="h-12 w-12 text-ivy-accent" />
          </div>
          <h1 className="text-3xl font-bold text-ivy mb-4">You're a Premium Member!</h1>
          <p className="text-xl text-gray-600 mb-8">
            You have full access to all premium features and services.
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="rounded-full bg-ivy-accent/10 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-gray-600">
            Thank you for supporting IvyCraft! If you have any questions or need assistance with your premium features,
            please contact our support team.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-ivy mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-600">
            Get advanced AI features, detailed guidance, and personalized strategies to maximize your college application success.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-t-4 border-t-ivy-accent">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="flex justify-center mb-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-xl text-gray-500">/month</span>
                  <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-4">
                      <div className="rounded-full bg-ivy-accent/10 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                    
                    <div className="ml-16 space-y-2">
                      {feature.examples.map((example, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4">
                  <div className="rounded-full bg-ivy-accent/10 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Historical Data Access</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Access historical acceptance data and successful essays from past applicants.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-6">
              <Button
                size="lg"
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full max-w-xs bg-ivy-accent text-ivy hover:bg-ivy-accent/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Subscribe for $10/month
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PremiumPage;
