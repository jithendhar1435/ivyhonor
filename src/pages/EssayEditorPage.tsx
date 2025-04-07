
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Notebook, Save, ArrowRight, Crown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Essay {
  id: string;
  title: string;
  school: string;
  content: string;
  updatedAt: string;
  feedback?: {
    general: string[];
    premium?: string[];
  };
}

const EssayEditorPage = () => {
  const { isPremium } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [activeEssayId, setActiveEssayId] = useState<string | null>(null);
  
  const [essayTitle, setEssayTitle] = useState("");
  const [targetSchool, setTargetSchool] = useState("");
  const [essayContent, setEssayContent] = useState("");
  
  const [essays, setEssays] = useState<Essay[]>([
    {
      id: "1",
      title: "Why Harvard Essay",
      school: "Harvard University",
      content: "Harvard has been my dream school since I first heard about its rich history and tradition of academic excellence. The university's commitment to fostering both intellectual growth and personal development aligns perfectly with my own values. I am particularly drawn to Harvard's diverse community, where students from all backgrounds come together to learn from one another.\n\nThrough my high school years, I've cultivated a passion for social justice and community service. Harvard's emphasis on these areas, exemplified through programs like Phillips Brooks House Association, would allow me to continue making an impact while developing as a leader. Additionally, the extensive research opportunities available would support my interest in exploring the intersection of technology and public policy.",
      updatedAt: "2025-04-05T14:30:00Z",
      feedback: {
        general: [
          "Your essay demonstrates genuine interest in Harvard",
          "Consider adding more specific details about Harvard's programs"
        ],
        premium: [
          "Your essay lacks a compelling personal hook. Harvard values authenticity - start with a specific story that illustrates your passion for social justice",
          "Be more specific about which research opportunities interest you - name professors or specific labs that align with your interests",
          "The second paragraph is stronger than your opening - consider restructuring to lead with your unique service background"
        ]
      }
    }
  ]);

  const handleSaveEssay = () => {
    if (!essayTitle.trim() || !targetSchool.trim() || !essayContent.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const newEssay: Essay = {
      id: Date.now().toString(),
      title: essayTitle,
      school: targetSchool,
      content: essayContent,
      updatedAt: new Date().toISOString()
    };
    
    setEssays([newEssay, ...essays]);
    setEssayTitle("");
    setTargetSchool("");
    setEssayContent("");
    
    toast({
      title: "Essay saved",
      description: "Your essay draft has been saved successfully",
    });
  };

  const handleEditEssay = (id: string) => {
    const essay = essays.find(e => e.id === id);
    if (essay) {
      setEssayTitle(essay.title);
      setTargetSchool(essay.school);
      setEssayContent(essay.content);
      setActiveTab("write");
    }
  };

  const generateFeedback = (id: string) => {
    setIsLoading(true);
    setActiveEssayId(id);
    
    // Simulate API call delay
    setTimeout(() => {
      setEssays(essays.map(essay => {
        if (essay.id === id) {
          return {
            ...essay,
            feedback: {
              general: [
                "Your essay has a clear structure and good flow",
                "Consider adding more specific examples to support your points",
                "Check for grammatical errors in paragraph 2"
              ],
              premium: isPremium ? [
                `${essay.school} values students who demonstrate intellectual curiosity - strengthen this aspect in your essay`,
                "Add a specific story that demonstrates your leadership abilities",
                `For ${essay.school}, emphasize how you'll contribute to campus life beyond academics`
              ] : undefined
            }
          };
        }
        return essay;
      }));
      
      setIsLoading(false);
      setActiveEssayId(null);
      
      toast({
        title: "Feedback generated",
        description: "AI feedback for your essay is ready!",
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-ivy">Essay Editor</h1>
          <p className="text-gray-600 mt-1">
            Craft compelling essays with AI-powered feedback.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="essays">My Essays</TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Write a New Essay</CardTitle>
                <CardDescription>
                  Draft your essay and save it for later review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="essay-title">Essay Title</Label>
                    <Input
                      id="essay-title"
                      value={essayTitle}
                      onChange={(e) => setEssayTitle(e.target.value)}
                      placeholder="e.g., Why This College"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-school">Target School</Label>
                    <Input
                      id="target-school"
                      value={targetSchool}
                      onChange={(e) => setTargetSchool(e.target.value)}
                      placeholder="e.g., Princeton University"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="essay-content">Essay Content</Label>
                  <Textarea
                    id="essay-content"
                    value={essayContent}
                    onChange={(e) => setEssayContent(e.target.value)}
                    placeholder="Write your essay here..."
                    className="min-h-[300px]"
                  />
                </div>
                
                <Button 
                  onClick={handleSaveEssay} 
                  disabled={!essayTitle.trim() || !targetSchool.trim() || !essayContent.trim()}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="essays" className="pt-4">
            <div className="space-y-6">
              {essays.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No essays yet. Start by writing a new essay draft.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("write")} 
                      className="mt-4"
                    >
                      Write New Essay
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                essays.map(essay => (
                  <Card key={essay.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{essay.title}</CardTitle>
                          <CardDescription>
                            {essay.school} • Updated {new Date(essay.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditEssay(essay.id)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => generateFeedback(essay.id)}
                            disabled={isLoading && activeEssayId === essay.id}
                          >
                            {isLoading && activeEssayId === essay.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : "Get Feedback"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-md max-h-[300px] overflow-y-auto">
                        {essay.content.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-2">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {essay.feedback && (
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Feedback</h3>
                          
                          <div>
                            <h4 className="font-medium mb-2 text-ivy">General Feedback</h4>
                            <ul className="list-disc ml-5 space-y-2">
                              {essay.feedback.general.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {isPremium && essay.feedback.premium && (
                            <div className="p-3 bg-ivy-accent/10 border border-ivy-accent/20 rounded-md">
                              <h4 className="text-sm font-medium text-ivy flex items-center mb-2">
                                <Crown className="w-4 h-4 mr-1 text-ivy-accent" />
                                Premium Insights
                              </h4>
                              <ul className="list-disc ml-5 space-y-1">
                                {essay.feedback.premium.map((item, idx) => (
                                  <li key={idx} className="text-sm">{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {!isPremium && (
                            <div className="p-3 border border-dashed border-ivy-accent/40 rounded-md text-center">
                              <p className="text-sm text-gray-600 mb-2">
                                <span className="text-ivy font-medium">Upgrade to Premium</span> for school-specific feedback and narrative enhancement
                              </p>
                              <Button size="sm" variant="outline" className="text-ivy border-ivy" onClick={() => window.location.href = "/premium"}>
                                Upgrade Now
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EssayEditorPage;
