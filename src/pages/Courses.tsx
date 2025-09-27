import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

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
  enrolledStudents: string[];
  maxStudents: number;
  startDate: string;
  endDate: string;
}

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'SSC' | 'HSC'>('all');
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      const params = filter !== 'all' ? `?level=${filter}` : '';
      const response = await fetch(`http://localhost:5000/api/courses${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setCourses(data.courses);
      } else {
        toast.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.error('Please login to enroll');
      return;
    }

    setEnrolling(courseId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Successfully enrolled in course!');
        fetchCourses(); // Refresh courses
      } else {
        toast.error(data.message || 'Failed to enroll');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover our comprehensive SSC and HSC courses designed to help you excel
          </p>
          
          <div className="flex justify-between items-center">
            <Select value={filter} onValueChange={(value: 'all' | 'SSC' | 'HSC') => setFilter(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="SSC">SSC Courses</SelectItem>
                <SelectItem value="HSC">HSC Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={course.level === 'SSC' ? 'default' : 'secondary'}>
                    {course.level}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{course.subject}</span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>Instructor: {course.instructor.fullName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {course.duration}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledStudents.length}/{course.maxStudents} students</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-primary">৳{course.price}</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleEnroll(course._id)}
                  disabled={enrolling === course._id || course.enrolledStudents.length >= course.maxStudents}
                >
                  {enrolling === course._id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Enrolling...
                    </>
                  ) : course.enrolledStudents.length >= course.maxStudents ? (
                    'Course Full'
                  ) : (
                    'Enroll Now'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              {filter !== 'all' ? `No ${filter} courses available at the moment.` : 'No courses available at the moment.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}