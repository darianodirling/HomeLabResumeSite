import { Github, Linkedin, Mail } from "lucide-react";

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
              I specialize in{" "}
              <span className="text-emerald-400">systems engineering</span>,{" "}
              <span className="text-emerald-400">cybersecurity</span>, and{" "}
              <span className="text-emerald-400">infrastructure automation</span>.
              My experience spans from enterprise SAS environments to building resilient
              homelab architectures that push the boundaries of what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => scrollToSection("homelab")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Explore My HomeLab
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
                href="https://linkedin.com/in/darianodirling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-500 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-500 transition-colors"
              >
                <Github className="w-6 h-6" />
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
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
              alt="IT professional in modern server environment"
              className="rounded-2xl shadow-2xl hover-lift w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
