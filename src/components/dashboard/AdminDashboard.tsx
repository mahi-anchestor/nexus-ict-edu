import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, MessageSquare, Bell, Settings, BarChart3, Calendar, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const systemStats = [
  { label: 'Total Students', value: '142', icon: Users, color: 'text-primary' },
  { label: 'Active Courses', value: '8', icon: BookOpen, color: 'text-success' },
  { label: 'Teachers', value: '3', icon: Users, color: 'text-info' },
  { label: 'Pending Applications', value: '12', icon: UserPlus, color: 'text-warning' },
];

const recentActivities = [
  { action: 'New student registered', user: 'John Doe', time: '5 minutes ago', type: 'user' },
  { action: 'Assignment submitted', user: 'Jane Smith', time: '15 minutes ago', type: 'assignment' },
  { action: 'Class schedule updated', user: 'Mr. Rahman', time: '1 hour ago', type: 'schedule' },
  { action: 'New announcement posted', user: 'Admin', time: '2 hours ago', type: 'announcement' },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-card rounded-xl p-8 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back, {user?.fullName}! Manage your ICT education platform.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <Settings className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <Badge className="bg-destructive/20 text-destructive border border-destructive/30">
            Administrator
          </Badge>
          <Badge variant="secondary">
            Full Access
          </Badge>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="interactive-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Management */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Student Management</span>
            </CardTitle>
            <CardDescription>
              Manage all enrolled students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Students
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Student Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Course Management */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Course Management</span>
            </CardTitle>
            <CardDescription>
              Manage courses and curriculum
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Courses
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Class Scheduling
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Course Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Communication */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Communications</span>
            </CardTitle>
            <CardDescription>
              Send announcements and messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Manage Chat Rooms
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Bulk Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="interactive-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Recent System Activities</span>
          </CardTitle>
          <CardDescription>
            Latest activities across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-primary/10">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Server Status</span>
                <Badge className="bg-success/20 text-success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <Badge className="bg-success/20 text-success">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="text-sm font-medium">24 online</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto py-4 flex-col space-y-2" variant="outline">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
              <Button className="h-auto py-4 flex-col space-y-2" variant="outline">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">Reports</span>
              </Button>
              <Button className="h-auto py-4 flex-col space-y-2" variant="outline">
                <Users className="h-5 w-5" />
                <span className="text-xs">Users</span>
              </Button>
              <Button className="h-auto py-4 flex-col space-y-2" variant="outline">
                <Bell className="h-5 w-5" />
                <span className="text-xs">Alerts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}