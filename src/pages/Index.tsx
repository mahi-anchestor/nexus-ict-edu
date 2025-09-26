import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import CourseBanners from '@/components/home/CourseBanners';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CourseBanners />
    </div>
  );
};

export default Index;
