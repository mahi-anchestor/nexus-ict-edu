import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Users, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingElements = [
  { icon: BookOpen, delay: '0s', position: 'top-20 left-10' },
  { icon: Users, delay: '1s', position: 'top-32 right-20' },
  { icon: Award, delay: '2s', position: 'bottom-32 left-20' },
  { icon: Phone, delay: '0.5s', position: 'bottom-20 right-10' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,136,0.1)_50%,transparent_75%)] bg-[length:60px_60px] animate-[slide_20s_linear_infinite]"></div>
        
        {/* Floating Icons */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.position} animate-float opacity-20`}
              style={{ animationDelay: element.delay }}
            >
              <Icon className="h-8 w-8 text-primary" />
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fadeInUp">
          {/* Badge */}
          <Badge className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 text-sm font-medium">
            🎓 Professional ICT Education in Bangladesh
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="hero-text">
              Master ICT with
              <span className="block text-primary animate-glow">
                Expert Guidance
              </span>
            </h1>
            <p className="hero-subtitle">
              Join Exclusive ICT Care for comprehensive computer science education. 
              From SSC to university admission - we've got you covered with professional, 
              personalized ICT tuition by experienced educators.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:glow-primary group"
              >
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 rounded-xl transition-all duration-300 hover:border-primary"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Teacher
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <Card className="interactive-card animate-slideInFromLeft">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </Card>
            
            <Card className="interactive-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Successful Students</div>
              </div>
            </Card>
            
            <Card className="interactive-card animate-slideInFromRight" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}