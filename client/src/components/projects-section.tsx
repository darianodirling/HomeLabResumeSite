import { Network, Shield, Boxes, GraduationCap, Play, FileText, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Production Security Lab",
    description:
      "A vSphere-hosted Cisco security environment for validating enterprise architectures, identity controls, and Zero Trust designs.",
    href: "/production-lab",
    icon: Shield,
    action: "View Production Lab",
    videoId: undefined,
    playlistUrl: undefined,
    externalUrl: undefined,
  },
  {
    title: "Nutanix Lab",
    description:
      "A growing Nutanix platform lab focused on AHV, Flow microsegmentation, NDB, NUS, Active Directory, and infrastructure automation.",
    href: "/nutanix-lab",
    icon: Boxes,
    action: "View Nutanix Lab",
    videoId: undefined,
    playlistUrl: undefined,
    externalUrl: undefined,
  },
  {
    title: "CompTIA Security+ Video Course",
    description:
      "Built from a semester-long Georgia Tech research project in which I developed a framework for video education. I wrote a paper on the framework that is soon to be published, then applied the approach to create this CompTIA Security+ course.",
    href: undefined,
    icon: GraduationCap,
    action: undefined,
    videoId: "ZQkpP46BG8A",
    playlistUrl: "https://www.youtube.com/watch?v=TiyAyGJPsNY&list=PLXJLDjTml0Cs",
    externalUrl: undefined,
  },
  {
    title: "Simple Network Topology for Learning VPN & More",
    description:
      "A LinkedIn article that explores a practical network topology for learning VPN concepts and building hands-on networking skills.",
    href: undefined,
    icon: FileText,
    action: undefined,
    videoId: undefined,
    playlistUrl: undefined,
    externalUrl: "https://www.linkedin.com/pulse/simple-network-topology-learning-vpn-more-darian-o-dirling-zv78e/",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hands-on environments where I build, test, and deepen platform expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(({ title, description, href, icon: Icon, action, videoId, playlistUrl, externalUrl }) => (
            <article key={title} className="bg-card p-8 rounded-xl border border-border hover-lift">
              <Icon className="text-emerald-500 w-10 h-10 mb-5" />
              <h3 className="text-2xl font-serif font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{description}</p>
              {videoId ? (
                <>
                  <div className="aspect-video overflow-hidden rounded-lg border border-border mb-6">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                      title="CompTIA Security+ Video Course"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Watch the Full Playlist <Play className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </>
              ) : externalUrl ? (
                <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Read Article <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <Link href={href!}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    {action} <Network className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
