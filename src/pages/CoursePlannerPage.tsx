
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, PlusCircle, TrashIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  id: string;
  name: string;
  category: string;
}

interface SchoolPlan {
  schoolName: string;
  currentCourses: Course[];
  suggestions: {
    basic: string[];
    premium?: string[];
  };
}

const CoursePlannerPage = () => {
  const { isPremium } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [targetSchool, setTargetSchool] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCategory, setCourseCategory] = useState("academic");
  
  const [currentCourses, setCurrentCourses] = useState<Course[]>([
    { id: "1", name: "AP Calculus BC", category: "academic" },
    { id: "2", name: "AP Literature", category: "academic" },
    { id: "3", name: "French IV", category: "academic" },
    { id: "4", name: "Debate Club", category: "extracurricular" }
  ]);
  
  const [schoolPlans, setSchoolPlans] = useState<SchoolPlan[]>([
    {
      schoolName: "MIT",
      currentCourses: [...currentCourses],
      suggestions: {
        basic: [
          "Consider taking AP Physics if available at your school",
          "Continue with your math sequence, ideally through calculus"
        ],
        premium: [
          "MIT values STEM rigor - Add AP Physics C if available, as MIT's engineering programs are highly competitive",
          "Consider a coding class or extracurricular if possible, as computer science skills are highly valued",
          "Continue with high-level math; MIT looks for students who take the most advanced math available"
        ]
      }
    }
  ]);
  
  const addCourse = () => {
    if (!courseName.trim()) return;
    
    const newCourse = {
      id: Date.now().toString(),
      name: courseName,
      category: courseCategory
    };
    
    setCurrentCourses([...currentCourses, newCourse]);
    setCourseName("");
  };
  
  const removeCourse = (id: string) => {
    setCurrentCourses(currentCourses.filter(course => course.id !== id));
  };

  const generateRecommendations = () => {
    if (!targetSchool.trim()) {
      toast({
        title: "School name required",
        description: "Please enter a target school name",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newPlan: SchoolPlan = {
        schoolName: targetSchool,
        currentCourses: [...currentCourses],
        suggestions: {
          basic: [
            "Add a higher level science course to demonstrate academic rigor",
            "Consider a foreign language course for at least 3-4 years"
          ],
          premium: isPremium ? [
            `${targetSchool} values well-rounded students - add an arts elective to balance your STEM courses`,
            `For ${targetSchool}, consider taking AP Computer Science as they value technological literacy`,
            "Add leadership positions in your extracurriculars to demonstrate initiative and commitment"
          ] : undefined
        }
      };
      
      setSchoolPlans([newPlan, ...schoolPlans]);
      setTargetSchool("");
      setIsLoading(false);
      
      toast({
        title: "Course plan generated",
        description: `Recommendations for ${targetSchool} are ready!`,
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-ivy">Course Planner</h1>
          <p className="text-gray-600 mt-1">
            Plan your courses strategically based on your target schools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Courses */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Courses
              </CardTitle>
              <CardDescription>
                Add your current and planned courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {currentCourses.map(course => (
                  <div 
                    key={course.id} 
                    className="flex justify-between items-center p-2 bg-slate-50 rounded"
                  >
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{course.category}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => removeCourse(course.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-name">Course Name</Label>
                    <Input
                      id="course-name"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="e.g., AP Biology"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="course-category">Category</Label>
                    <Select 
                      value={courseCategory} 
                      onValueChange={setCourseCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="extracurricular">Extracurricular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={addCourse} 
                disabled={!courseName.trim()} 
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </CardFooter>
          </Card>

          {/* Generate Plan */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Generate Course Recommendations</CardTitle>
              <CardDescription>
                Get AI suggestions based on your target school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-school">Target School</Label>
                <Input
                  id="target-school"
                  value={targetSchool}
                  onChange={(e) => setTargetSchool(e.target.value)}
                  placeholder="e.g., Harvard University"
                />
              </div>
              
              <Button 
                onClick={generateRecommendations} 
                disabled={isLoading || !targetSchool.trim() || currentCourses.length === 0}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : "Generate Recommendations"}
              </Button>
              
              {!isPremium && (
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  <span className="text-ivy-accent">Premium users</span> receive detailed, school-specific guidance.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* School Plans */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-ivy">Your Course Plans</h2>
          
          {schoolPlans.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No course plans yet. Add your courses and generate recommendations for your target schools.
                </p>
              </CardContent>
            </Card>
          ) : (
            schoolPlans.map((plan, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{plan.schoolName}</CardTitle>
                  <CardDescription>
                    Course recommendations based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Your Courses</h3>
                    <div className="flex flex-wrap gap-2">
                      {plan.currentCourses.map((course, i) => (
                        <div 
                          key={i} 
                          className="text-sm py-1 px-2 bg-slate-100 rounded"
                        >
                          {course.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="list-disc ml-5 space-y-2">
                      {plan.suggestions.basic.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>

                    {isPremium && plan.suggestions.premium && (
                      <div className="mt-4 p-3 bg-ivy-accent/10 border border-ivy-accent/20 rounded-md">
                        <h4 className="text-sm font-medium text-ivy flex items-center mb-2">
                          <svg className="w-4 h-4 mr-1 text-ivy-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Premium Insights
                        </h4>
                        <ul className="list-disc ml-5 space-y-1">
                          {plan.suggestions.premium.map((suggestion, i) => (
                            <li key={i} className="text-sm">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {!isPremium && (
                      <div className="mt-4 p-3 border border-dashed border-ivy-accent/40 rounded-md text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="text-ivy font-medium">Upgrade to Premium</span> for detailed, school-specific course recommendations
                        </p>
                        <Button size="sm" variant="outline" className="text-ivy border-ivy" onClick={() => window.location.href = "/premium"}>
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePlannerPage;
