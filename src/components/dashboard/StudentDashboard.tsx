import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, MessageSquare, Bell, Trophy, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const upcomingClasses = [
  { title: 'Programming Fundamentals', time: '10:00 AM', date: 'Today', subject: 'C Programming' },
  { title: 'Database Concepts', time: '2:00 PM', date: 'Tomorrow', subject: 'MySQL' },
  { title: 'Web Development', time: '4:00 PM', date: 'Friday', subject: 'HTML/CSS' },
];

const recentAnnouncements = [
  { title: 'New Assignment Posted', message: 'Database design assignment is now available', time: '2 hours ago', type: 'assignment' },
  { title: 'Class Schedule Update', message: 'Next week programming class moved to Tuesday', time: '1 day ago', type: 'schedule' },
  { title: 'Exam Preparation', message: 'HSC board exam preparation materials uploaded', time: '3 days ago', type: 'exam' },
];

export default function StudentDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-card rounded-xl p-8 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.full_name}!
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to continue your ICT learning journey?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <Badge className="bg-primary/20 text-primary border border-primary/30">
            {profile?.class_level?.toUpperCase()} Student
          </Badge>
          <Badge variant="secondary">
            Active Learner
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">85%</p>
                <p className="text-sm text-muted-foreground">Progress</p>
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
                <p className="text-2xl font-bold text-warning">24</p>
                <p className="text-sm text-muted-foreground">Study Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-info">5</p>
                <p className="text-sm text-muted-foreground">Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Classes</span>
            </CardTitle>
            <CardDescription>
              Your next scheduled learning sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div>
                  <h4 className="font-semibold text-foreground">{cls.title}</h4>
                  <p className="text-sm text-muted-foreground">{cls.subject}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{cls.time}</p>
                  <p className="text-sm text-muted-foreground">{cls.date}</p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Announcements</span>
            </CardTitle>
            <CardDescription>
              Latest updates from your teachers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                  <span className="text-xs text-muted-foreground">{announcement.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{announcement.message}</p>
                <Badge variant="secondary" className="text-xs">
                  {announcement.type}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="interactive-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Access your most used features quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-sm">Join Chat</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-sm">Study Materials</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-sm">Assignments</span>
            </Button>
            <Button className="h-auto py-6 flex-col space-y-2" variant="outline">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-sm">Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}