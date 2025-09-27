import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface EnrolledStudent {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  classLevel: 'SSC' | 'HSC';
}

interface CourseWithStudents {
  _id: string;
  title: string;
  level: 'SSC' | 'HSC';
  instructor: {
    fullName: string;
    email: string;
  };
  enrolledStudents: EnrolledStudent[];
}

export default function EnrolledStudents() {
  const [courses, setCourses] = useState<CourseWithStudents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  const fetchEnrolledStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/enrolled-students', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        toast.error('Failed to load enrolled students');
      }
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
      toast.error('Failed to load enrolled students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading enrolled students...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <Card key={course._id} className="border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Instructor: {course.instructor.fullName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={course.level === 'SSC' ? 'default' : 'secondary'}>
                  {course.level}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.enrolledStudents.length} students
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {course.enrolledStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Class Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.enrolledStudents.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{student.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{student.username}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{student.email}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.classLevel === 'SSC' ? 'default' : 'secondary'}>
                            {student.classLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No students enrolled in this course yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {courses.length === 0 && (
        <Card className="border-primary/20">
          <CardContent className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground">No active courses with enrolled students found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}