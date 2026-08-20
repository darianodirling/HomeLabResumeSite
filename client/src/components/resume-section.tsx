import { ChevronRight } from "lucide-react";

const ResumeSection = () => {
  const experiences = [
    {
      title: "Customer Experience Manager",
      company: "Nutanix",
      location: "Remote",
      period: "March 2026 - Present",
      highlights: [
        "Design strategic business-IT roadmaps by leading tailored Customer Success Plans that align complex Nutanix architectures with executive goals for long-term scalability and measurable ROI.",
        "Architect operational maturity by advising IT leadership on infrastructure standardization and governance, leveraging frameworks such as ITIL to transition customers toward automated, resilient cloud operating models.",
        "Orchestrate full-stack adoption by directing the end-to-end integration of Nutanix solutions, including AHV, Flow, and DR, ensuring technical requirements translate into stable, enterprise-grade production environments.",
        "Bridge technical advocacy and engineering as a high-level liaison between customers and Nutanix Product teams to mitigate architectural risks and prioritize feature designs that support evolving infrastructure needs.",
      ],
    },
    {
      title: "Technical Consulting Engineer - Network Security (Contract)",
      company: "Cisco",
      location: "Morrisville, NC",
      period: "October 2025 - March 2026",
      highlights: [
        "Deliver advanced troubleshooting and support for Cisco Secure Access solutions, including VPN, Zero Trust Network Access (ZTNA), and identity-based security architectures.",
        "Educated customers on Zero Trust principles, endpoint posture validation, and threat mitigation strategies, strengthening organizational cybersecurity posture.",
        "Collaborated cross-functionally with Secure Firewall, Identity Services Engine (ISE), and Secure Access Cloud teams to deliver integrated, end-to-end access control solutions",
        "Maintained security clearance eligibility and adhered to strict data protection and compliance standards while supporting federal and enterprise clients.",
      ],
    },
    {
      title: "Systems Technical Support Engineer",
      company: "SAS",
      location: "Cary, NC",
      period: "December 2024 – October 2025",
      highlights: [
        "Resolved complex technical issues in SAS 9.4 and SAS Viya environments, minimizing downtime and improving system stability for enterprise clients",
        "Diagnosed system-level bottlenecks in SAS Viya on Kubernetes, implementing optimizations that improved runtime performance",
        "Collaborated with cross-functional teams to deliver timely technical solutions, strengthening client satisfaction",
      ],
    },
    {
      title: "Research Assistant - Cybersecurity",
      company: "East Carolina University",
      location: "Greenville, NC",
      period: "August 2024 - December 2024",
      highlights: [
        "Conducted academic research simulating network-layer attacks in IoT environments for intrusion detection framework",
        "Designed and implemented state-of-the-art cybersecurity lab with routers, switches, and IoT devices",
        "Conducted over 30 cybersecurity attacks, identifying critical vulnerabilities and developing robust security measures",
      ],
    },
    {
      title: "Technical Consulting Engineer Intern",
      company: "Cisco",
      location: "Morrisville, NC",
      period: "May 2023 – August 2023",
      highlights: [
        "Built lab environments to replicate kernel-level and routing issues in Cisco NX-OS",
        "Selected as one of 14 Global Intern Ambassadors from 1,400+ candidates",
        "Created Spanish-language content for Cisco website, enhancing accessibility",
      ],
    },
  ];

  return (
    <section id="resume" className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            A journey through enterprise systems engineering and cybersecurity research
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={index} className="bg-card p-8 rounded-xl hover-lift">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-emerald-400">
                    {experience.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {experience.company} • {experience.location}
                  </p>
                </div>
                <span className="text-muted-foreground font-mono text-sm mt-2 lg:mt-0">
                  {experience.period}
                </span>
              </div>
              <ul className="text-muted-foreground space-y-2">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-start">
                    <ChevronRight className="text-emerald-500 w-3 h-3 mt-1 mr-3 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
