
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Notebook, School } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const DashboardPage = () => {
  const { user, isPremium } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Harvard essay draft",
      dueDate: "2025-04-15",
      completed: false
    },
    {
      id: "2",
      title: "Review MIT course requirements",
      dueDate: "2025-04-10",
      completed: true
    },
    {
      id: "3",
      title: "Submit Stanford application",
      dueDate: "2025-04-30",
      completed: false
    }
  ]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasksCount / tasks.length) * 100;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Welcome header */}
        <div>
          <h1 className="text-3xl font-bold text-ivy">Welcome back{user?.email ? ", " + user.email.split("@")[0] : ""}!</h1>
          <p className="text-gray-600 mt-1">
            Your application journey is in progress. Here's your current status.
          </p>
        </div>

        {/* Progress overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-gray-500 mt-1">in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Essays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-gray-500 mt-1">drafts created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasksCount}/{tasks.length}</div>
              <p className="text-sm text-gray-500 mt-1">completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Apr 10</div>
              <p className="text-sm text-gray-500 mt-1">MIT requirements</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ivy" />
                Tasks & Deadlines
              </CardTitle>
              <CardDescription>Your upcoming application tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-4">
                <div className="text-sm">Overall progress</div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</div>
                        <div className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Link to="/applications">
                  <Button variant="outline" size="sm">View All Tasks</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump back into your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/courses">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Update Course Plan
                </Button>
              </Link>
              <Link to="/essays">
                <Button variant="outline" className="w-full justify-start">
                  <Notebook className="mr-2 h-4 w-4" />
                  Work on Essays
                </Button>
              </Link>
              <Link to="/applications">
                <Button variant="outline" className="w-full justify-start">
                  <School className="mr-2 h-4 w-4" />
                  Add New School
                </Button>
              </Link>

              {!isPremium && (
                <div className="p-4 bg-ivy-accent/10 rounded-lg border border-ivy-accent/30 mt-6">
                  <h3 className="font-medium text-ivy mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get personalized AI recommendations and detailed planning.
                  </p>
                  <Link to="/premium">
                    <Button size="sm" className="w-full bg-ivy-accent text-ivy hover:bg-ivy-accent/80">
                      Upgrade for $10/mo
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
