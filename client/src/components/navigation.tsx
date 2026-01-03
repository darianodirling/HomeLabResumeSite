import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();

  useEffect(() => {
    if (location !== "/") return;
    const handleScroll = () => {
      const sections = ["home", "about", "resume", "homelab", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "homelab", label: "HomeLab" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-serif font-semibold">Darian O'Dirling</div>
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? "text-emerald-500"
                    : "text-muted-foreground hover:text-emerald-500"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/production-lab">
              <span className={`cursor-pointer transition-colors ${location === "/production-lab" ? "text-emerald-500" : "text-muted-foreground hover:text-emerald-500"}`}>
                Production Lab
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
