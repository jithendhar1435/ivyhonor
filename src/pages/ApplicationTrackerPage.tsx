
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, 
  Calendar, 
  Check, 
  Clock, 
  PlusCircle, 
  Crown,
  CheckCircle2,
  XCircle,
  AlarmClock
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Application {
  id: string;
  schoolName: string;
  deadline: string;
  status: "not_started" | "in_progress" | "submitted" | "accepted" | "rejected";
  tasks: ApplicationTask[];
  tips?: string[];
}

interface ApplicationTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const ApplicationTrackerPage = () => {
  const { isPremium } = useAuth();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const [schoolName, setSchoolName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<Application["status"]>("not_started");
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      schoolName: "Harvard University",
      deadline: "2025-01-01",
      status: "in_progress",
      tasks: [
        { id: "t1", title: "Write 'Why Harvard' essay", dueDate: "2024-12-15", completed: false },
        { id: "t2", title: "Request recommendation letters", dueDate: "2024-11-01", completed: true },
        { id: "t3", title: "Complete Common App profile", dueDate: "2024-10-15", completed: true }
      ],
      tips: [
        "Harvard values demonstrated intellectual curiosity - highlight research projects",
        "Submit your application a week before the deadline to avoid technical issues"
      ]
    },
    {
      id: "2",
      schoolName: "Stanford University",
      deadline: "2025-01-05",
      status: "not_started",
      tasks: [
        { id: "t4", title: "Write 'Why Stanford' essay", dueDate: "2024-12-15", completed: false },
        { id: "t5", title: "Complete activities section", dueDate: "2024-11-15", completed: false }
      ]
    }
  ]);

  const addApplication = () => {
    if (!schoolName || !deadline) return;
    
    const newApplication: Application = {
      id: Date.now().toString(),
      schoolName,
      deadline,
      status,
      tasks: []
    };
    
    setApplications([...applications, newApplication]);
    setSchoolName("");
    setDeadline("");
    setStatus("not_started");
    setDate(undefined);
    setIsDialogOpen(false);
    
    toast({
      title: "Application added",
      description: `${schoolName} has been added to your tracker.`,
    });
  };

  const updateTaskStatus = (appId: string, taskId: string) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          tasks: app.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return app;
    }));
  };

  const updateApplicationStatus = (appId: string, newStatus: Application["status"]) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    toast({
      title: "Status updated",
      description: `Application status has been updated.`,
    });
  };

  const generateTips = (appId: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setApplications(applications.map(app => {
        if (app.id === appId) {
          const schoolSpecificTips = [
            `Complete your ${app.schoolName} essay by ${new Date(app.deadline).toLocaleDateString("en-US", {month: 'long', day: 'numeric'})} (two weeks before deadline)`,
            `${app.schoolName} values community involvement - highlight your volunteer work`,
            `Submit your application 3-5 days before the ${app.deadline} deadline to avoid technical issues`
          ];
          
          return {
            ...app,
            tips: schoolSpecificTips
          };
        }
        return app;
      }));
      
      setIsLoading(false);
      
      toast({
        title: "Tips generated",
        description: "Application tips are now available!",
      });
    }, 1500);
  };

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "not_started":
        return <Badge variant="outline" className="text-slate-500">Not Started</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="text-blue-500">In Progress</Badge>;
      case "submitted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Submitted</Badge>;
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProgressPercentage = (tasks: ApplicationTask[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-ivy">Application Tracker</h1>
            <p className="text-gray-600 mt-1">
              Track your college applications and deadlines.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ivy hover:bg-ivy/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add School
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New School</DialogTitle>
                <DialogDescription>
                  Track a new college application.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g., Yale University"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          if (newDate) {
                            setDeadline(format(newDate, "yyyy-MM-dd"));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-status">Initial Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as Application["status"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addApplication} disabled={!schoolName || !deadline}>
                  Add School
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No applications added yet. Start tracking your college applications.
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First School
                </Button>
              </CardContent>
            </Card>
          ) : (
            applications.map((app) => (
              <Card key={app.id} className="overflow-hidden">
                <div className="bg-gray-50 p-6 border-b">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-ivy">{app.schoolName}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Deadline: {new Date(app.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={app.status} 
                        onValueChange={(value) => updateApplicationStatus(app.id, value as Application["status"])}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {!app.tips && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateTips(app.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Generate Tips"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{getProgressPercentage(app.tasks)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-ivy-accent h-2 rounded-full"
                        style={{ width: `${getProgressPercentage(app.tasks)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-medium mb-4 flex items-center">
                      <AlarmClock className="mr-2 h-4 w-4 text-ivy" />
                      Tasks & Requirements
                    </h4>
                    
                    {app.tasks.length === 0 ? (
                      <p className="text-sm text-gray-500">No tasks added yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {app.tasks.map(task => (
                          <div 
                            key={task.id}
                            className="flex items-start gap-3 p-3 bg-slate-50 rounded-md"
                          >
                            <div className="mt-1">
                              <input 
                                type="checkbox" 
                                checked={task.completed}
                                onChange={() => updateTaskStatus(app.id, task.id)}
                                className="rounded text-ivy"
                              />
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {app.tips && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        {isPremium ? (
                          <Crown className="mr-2 h-4 w-4 text-ivy-accent" />
                        ) : (
                          <Check className="mr-2 h-4 w-4 text-ivy" />
                        )}
                        Application Tips
                      </h4>
                      
                      <div className={`p-3 rounded-md ${isPremium ? 'bg-ivy-accent/10 border border-ivy-accent/20' : 'bg-slate-50'}`}>
                        <ul className="list-disc ml-5 space-y-1">
                          {app.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm">
                              {tip}
                            </li>
                          ))}
                        </ul>
                        
                        {!isPremium && (
                          <div className="mt-3 pt-3 border-t border-dashed border-gray-300 text-center">
                            <p className="text-xs text-gray-600 mb-2">
                              <span className="text-ivy font-medium">Upgrade to Premium</span> for more detailed, school-specific tips
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ApplicationTrackerPage;
