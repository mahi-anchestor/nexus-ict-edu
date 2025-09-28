import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, MessageCircle, Calendar, Plus, Edit, Eye } from 'lucide-react';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  description: string;
  level: 'SSC' | 'HSC';
  subject: string;
  duration: string;
  price: number;
  enrolledStudents: string[];
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
}

interface Student {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  classLevel: string;
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      // Filter courses taught by this teacher
      const teacherCourses = response.data.courses.filter(
        (course: Course & { instructor: { _id: string } }) => 
          course.instructor._id === user?.id
      );
      
      setMyCourses(teacherCourses);
      
      // Calculate total students
      const total = teacherCourses.reduce((acc: number, course: Course) => 
        acc + (course.enrolledStudents?.length || 0), 0
      );
      setTotalStudents(total);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
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
          <p className="text-muted-foreground">Teacher Dashboard</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          Teacher
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myCourses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myCourses.filter(course => new Date(course.endDate) > new Date()).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myCourses.slice(0, 3).map((course) => (
                  <div key={course._id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.enrolledStudents?.length || 0} students • {course.level}
                      </p>
                    </div>
                    <Badge variant="outline">{course.subject}</Badge>
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
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Students
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Class
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Upload Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {myCourses.map((course) => (
              <Card key={course._id}>
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
                    <p>Students: {course.enrolledStudents?.length || 0}</p>
                    <p>Duration: {course.duration}</p>
                    <p>Price: ৳{course.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View Students
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div key={course._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant="outline">
                        {course.enrolledStudents?.length || 0} students
                      </Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                      {course.enrolledStudents?.map((studentId) => (
                        <div key={studentId} className="p-2 bg-muted/50 rounded text-sm">
                          Student ID: {studentId}
                        </div>
                      ))}
                    </div>
                    {(!course.enrolledStudents || course.enrolledStudents.length === 0) && (
                      <p className="text-muted-foreground text-sm">No students enrolled yet</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Course Materials</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </div>

          <div className="space-y-4">
            {myCourses.map((course) => (
              <Card key={course._id}>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.materials?.length > 0 ? (
                      course.materials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{material.title}</p>
                              <p className="text-xs text-muted-foreground">{material.type}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No materials uploaded for this course yet.</p>
                        <Button className="mt-4" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Material
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}