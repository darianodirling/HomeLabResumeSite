import { Linkedin, Mail } from "lucide-react";
import ITIcon from "./it-icon";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-1 lg:order-1">
            <p className="text-emerald-500 font-medium mb-4 tracking-wide">WELCOME</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Darian O'Dirling,<br />
              <span className="gradient-text">IT Enthusiast</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              I specialize in <span className="text-emerald-400">networking</span>,{" "}
              <span className="text-emerald-400">systems administration</span>, and{" "}
              <span className="text-emerald-400">cloud</span>, with a passion for building
              resilient, secure IT infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => scrollToSection("about")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
              >
                About Me
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border border-border hover:border-emerald-500 text-muted-foreground hover:text-emerald-400 px-8 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Let's Connect
              </button>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/darianodirling/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-500 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:darianodirling@gmail.com"
                className="text-muted-foreground hover:text-emerald-500 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="order-2 lg:order-2 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
              <ITIcon className="w-full h-auto hover-lift" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
