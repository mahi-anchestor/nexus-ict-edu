import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Trophy, Target, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 'ssc',
    title: 'SSC ICT Course',
    level: 'Secondary',
    description: 'Comprehensive ICT foundation for SSC students with hands-on practical sessions.',
    features: ['Basic Programming', 'Computer Fundamentals', 'Digital Technology', 'Exam Preparation'],
    duration: '6 months',
    students: '50+',
    icon: BookOpen,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'hsc1',
    title: 'HSC 1st Year ICT',
    level: 'Higher Secondary',
    description: 'Advanced programming concepts and database management for HSC 1st year students.',
    features: ['C Programming', 'Database Concepts', 'Web Development Basics', 'Project Work'],
    duration: '8 months',
    students: '40+',
    icon: GraduationCap,
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'hsc2',
    title: 'HSC 2nd Year ICT',
    level: 'Higher Secondary',
    description: 'Complete HSC ICT syllabus with advanced programming and final exam preparation.',
    features: ['Advanced Programming', 'System Analysis', 'Final Projects', 'Board Exam Prep'],
    duration: '10 months',
    students: '35+',
    icon: Trophy,
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'admission',
    title: 'University Admission',
    level: 'Admission Prep',
    description: 'Specialized coaching for computer science university admission tests.',
    features: ['MCQ Practice', 'Programming Tests', 'Math & Logic', 'University Guidelines'],
    duration: '4 months',
    students: '25+',
    icon: Target,
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
  },
];

export default function CourseBanners() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 mb-6">
          Our Courses
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Complete ICT Education
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From basic computer skills to advanced programming - we offer comprehensive courses 
          for every stage of your ICT learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course, index) => {
          const Icon = course.icon;
          return (
            <Card 
              key={course.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${course.gradient} border ${course.borderColor} hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {course.level}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">What You'll Learn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} enrolled</span>
                  </div>
                </div>

                {/* CTA */}
                <Link to="/auth">
                  <Button className="w-full bg-primary/20 hover:bg-primary hover:text-background text-primary border border-primary/50 hover:border-primary transition-all duration-300">
                    Enroll Now
                  </Button>
                </Link>
              </CardContent>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}