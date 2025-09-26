import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Calendar, Bell, FileText, MessageSquare, Clock, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const myClasses = [
  { name: 'HSC 2nd Year ICT', students: 25, time: '10:00 AM - 12:00 PM', day: 'Mon, Wed, Fri' },
  { name: 'Programming Fundamentals', students: 18, time: '2:00 PM - 4:00 PM', day: 'Tue, Thu' },
  { name: 'University Admission Prep', students: 12, time: '6:00 PM - 8:00 PM', day: 'Sat, Sun' },
];

const pendingTasks = [
  { task: 'Grade HSC assignments', count: 15, priority: 'high', dueDate: 'Today' },
  { task: 'Prepare lecture materials', count: 3, priority: 'medium', dueDate: 'Tomorrow' },
  { task: 'Update course syllabus', count: 2, priority: 'low', dueDate: 'This week' },
];

const studentProgress = [
  { name: 'Alice Rahman', course: 'HSC 2nd Year', progress: 92, status: 'excellent' },
  { name: 'Mohammed Ali', course: 'Programming', progress: 78, status: 'good' },
  { name: 'Sarah Ahmed', course: 'Admission Prep', progress: 85, status: 'good' },
  { name: 'Karim Hassan', course: 'HSC 2nd Year', progress: 65, status: 'needs_improvement' },
];

export default function TeacherDashboard() {
  const { profile } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success/20 text-success';
      case 'good': return 'bg-info/20 text-info';
      case 'needs_improvement': return 'bg-warning/20 text-warning';
      default: return 'bg-secondary/20 text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'low': return 'bg-success/20 text-success';
      default: return 'bg-secondary/20 text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Teacher Header */}
      <div className="bg-gradient-card rounded-xl p-8 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Good morning, {profile?.full_name}! Ready to inspire young minds?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <Award className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <Badge className="bg-info/20 text-info border border-info/30">
            ICT Teacher
          </Badge>
          <Badge variant="secondary">
            Senior Educator
          </Badge>
        </div>
      </div>

      {/* Teaching Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">55</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">3</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">18</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-info">8</p>
                <p className="text-sm text-muted-foreground">Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Classes */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>My Classes</span>
            </CardTitle>
            <CardDescription>
              Your assigned courses and schedules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myClasses.map((cls, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{cls.name}</h4>
                  <Badge variant="secondary">{cls.students} students</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{cls.time}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{cls.day}</span>
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Pending Tasks</span>
            </CardTitle>
            <CardDescription>
              Your upcoming deadlines and tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{task.task}</h4>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{task.count} items</span>
                  <span className="text-muted-foreground">Due: {task.dueDate}</span>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Student Progress Overview */}
      <Card className="interactive-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Student Progress Overview</span>
          </CardTitle>
          <CardDescription>
            Monitor your students' learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentProgress.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-primary/10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{student.progress}%</p>
                    <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300" 
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Teaching Actions */}
      <Card className="interactive-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Commonly used teaching tools and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <Bell className="h-6 w-6 text-primary" />
              <span className="text-sm">Send Announcement</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-sm">Create Assignment</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-sm">Class Discussion</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm">View Students</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}