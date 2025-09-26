import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Users, BookOpen, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';

const qualifications = [
  { degree: 'BSc (Hons) in Computer Science and Engineering', grade: 'First Class', year: '2018' },
  { degree: 'MSc in Computer Science and Engineering', grade: 'First Class', year: '2020' },
];

const achievements = [
  { title: '5+ Years Teaching Experience', description: 'Professional ICT education expertise' },
  { title: '100+ Successful Students', description: 'Helped students achieve their goals' },
  { title: '95% Success Rate', description: 'Exceptional board exam results' },
  { title: 'Expert in Programming', description: 'C, C++, Java, Python, Web Development' },
];

const services = [
  {
    title: 'SSC ICT Course',
    description: 'Complete foundation course for secondary students',
    features: ['Basic Programming', 'Computer Fundamentals', 'Practical Sessions']
  },
  {
    title: 'HSC ICT Program',
    description: 'Comprehensive higher secondary ICT education',
    features: ['Advanced Programming', 'Database Management', 'Project Work']
  },
  {
    title: 'University Admission',
    description: 'Specialized preparation for computer science admission',
    features: ['MCQ Practice', 'Programming Tests', 'Interview Preparation']
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 mb-6">
              About Our Teacher
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Meet Md Ali Hossain
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dedicated ICT educator with advanced degrees from Rajshahi University, 
              committed to providing exceptional computer science education in Bangladesh.
            </p>
          </div>
        </section>

        {/* Teacher Profile */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Professional Educator & ICT Expert
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With over 5 years of dedicated teaching experience and advanced degrees in 
                  Computer Science and Engineering from Rajshahi University, I am passionate 
                  about making ICT education accessible and engaging for students at all levels.
                </p>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 text-primary mr-2" />
                  Academic Qualifications
                </h3>
                <div className="space-y-3">
                  {qualifications.map((qual, index) => (
                    <Card key={index} className="interactive-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{qual.degree}</h4>
                            <p className="text-sm text-muted-foreground">Rajshahi University</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-primary/20 text-primary mb-1">{qual.grade}</Badge>
                            <p className="text-sm text-muted-foreground">{qual.year}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-card p-6 rounded-xl border border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>01303-177324 (Mobile/WhatsApp)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>alih.bd@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Rajshahi, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                Teaching Excellence & Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="interactive-card">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 mb-6">
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comprehensive ICT Education
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From basic computer literacy to advanced programming concepts, 
                we provide structured learning paths for every student.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="interactive-card h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your ICT Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of successful students who have achieved their goals 
              with professional ICT education. Let's build your future in technology together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-background px-8">
                  <Users className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Teacher
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}