import { GraduationCap, Award, Network, Cloud, Shield } from "lucide-react";

const AboutSection = () => {
  const skills = [
    "Python",
    "JavaScript",
    "Bash Scripting",
    "PowerShell",
    "Kubernetes",
    "Docker",
    "Proxmox",
    "AWS",
    "SAS Administration",
    "Cybersecurity",
    "Networking",
    "AI & Machine Learning",
  ];

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate IT enthusiast with expertise in systems engineering, cybersecurity,
            programming, and leveraging AI to optimize infrastructure automation.
          </p>
        </div>

        {/* Education */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card p-8 rounded-xl hover-lift">
            <div className="flex items-center mb-4">
              <GraduationCap className="text-emerald-500 w-8 h-8 mr-4" />
              <h3 className="text-2xl font-serif font-semibold">Education</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-400">
                  Bachelor of Science: Computer Science
                </h4>
                <p className="text-muted-foreground">East Carolina University, 2024</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-emerald-400">
                  Master of Science: Computer Science
                </h4>
                <p className="text-muted-foreground">Georgia Institute of Technology</p>
                <span className="text-sm text-emerald-500 font-medium">In Progress</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-card p-8 rounded-xl hover-lift">
            <div className="flex items-center mb-4">
              <Award className="text-emerald-500 w-8 h-8 mr-4" />
              <h3 className="text-2xl font-serif font-semibold">Certifications</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Network className="text-blue-400 w-5 h-5 mr-3" />
                <span>Cisco CCNA</span>
              </div>
              <div className="flex items-center">
                <Cloud className="text-blue-500 w-5 h-5 mr-3" />
                <span>Microsoft Azure AZ-900</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-400 w-5 h-5 mr-3" />
                <span>Salesforce Certified Associate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-card p-8 rounded-xl">
          <h3 className="text-2xl font-serif font-semibold mb-6 text-center">
            Core Technologies
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
