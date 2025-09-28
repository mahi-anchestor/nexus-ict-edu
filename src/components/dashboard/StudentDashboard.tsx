import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, MessageCircle, User, Bell, Clock } from 'lucide-react';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  description: string;
  level: 'SSC' | 'HSC';
  subject: string;
  duration: string;
  price: number;
  instructor: {
    fullName: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  schedule: Array<{
    day: string;
    time: string;
  }>;
  materials: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  enrolledStudents: string[];
}

interface Notice {
  _id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  author: {
    fullName: string;
  };
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, noticesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/courses'),
        axios.get('http://localhost:5000/api/courses/notices')
      ]);

      // Filter courses based on user's class level
      const filtered = coursesRes.data.courses.filter((course: Course) => 
        course.level === user?.classLevel
      );
      
      const enrolled = filtered.filter((course: Course) => 
        user && course.enrolledStudents?.includes(user.id)
      );
      
      const available = filtered.filter((course: Course) => 
        !user || !course.enrolledStudents?.includes(user.id)
      );

      setEnrolledCourses(enrolled);
      setAvailableCourses(available);
      setNotices(noticesRes.data.notices);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.fullName}!</h1>
          <p className="text-muted-foreground">Student Dashboard - {user?.classLevel} Level</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          {user?.classLevel} Student
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableCourses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Notices</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{notices.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Level</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.classLevel}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notices.slice(0, 3).map((notice) => (
                  <div key={notice._id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Bell className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notice.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notice.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={notice.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {notice.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          by {notice.author.fullName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Class Chat
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Access Course Materials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  You haven't enrolled in any courses yet.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {enrolledCourses.map((course) => (
                    <Card key={course._id} className="border-primary/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{course.subject}</p>
                          </div>
                          <Badge>{course.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{course.description}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Instructor: {course.instructor.fullName}</p>
                          <p>Duration: {course.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Access Materials
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses for {user?.classLevel}</CardTitle>
            </CardHeader>
            <CardContent>
              {availableCourses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No available courses for your level at the moment.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {availableCourses.map((course) => (
                    <Card key={course._id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{course.subject}</p>
                          </div>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{course.description}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Instructor: {course.instructor.fullName}</p>
                          <p>Duration: {course.duration}</p>
                          <p className="font-semibold text-primary">Price: ৳{course.price}</p>
                        </div>
                        <Button 
                          onClick={() => enrollInCourse(course._id)} 
                          className="w-full"
                        >
                          Enroll Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Notices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{notice.title}</h3>
                    <Badge variant={notice.priority === 'high' ? 'destructive' : 'secondary'}>
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{notice.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>By {notice.author.fullName}</span>
                    <span>•</span>
                    <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}