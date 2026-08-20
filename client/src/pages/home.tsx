import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ResumeSection from "@/components/resume-section";
import HomelabSection from "@/components/homelab-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <HomelabSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Darian O'Dirling. Hosted on my Proxmox HomeLab with ❤️ and a lot of caffeine.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
