import {
  Server,
  Network,
  Database,
  Shield,
  BarChart3,
  Globe,
  Container,
  Zap,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HomelabSection = () => {
  const projects = [
    {
      icon: <Zap className="text-blue-400 w-8 h-8" />,
      title: "Kubernetes Cluster",
      description: "Multi-node K8s deployment for container orchestration experiments",
    },
    {
      icon: <Container className="text-blue-500 w-8 h-8" />,
      title: "Docker Services",
      description: "Containerized applications including monitoring and logging stacks",
    },
    {
      icon: <Globe className="text-emerald-500 w-8 h-8" />,
      title: "Web Hosting",
      description: "This portfolio site and other projects hosted on the cluster",
    },
    {
      icon: <BarChart3 className="text-yellow-500 w-8 h-8" />,
      title: "Monitoring Stack",
      description: "Prometheus, Grafana, and custom dashboards for infrastructure monitoring",
    },
    {
      icon: <Database className="text-red-500 w-8 h-8" />,
      title: "Database Clusters",
      description: "PostgreSQL and Redis deployments with replication and backup strategies",
    },
    {
      icon: <Shield className="text-purple-500 w-8 h-8" />,
      title: "Security Lab",
      description: "Isolated network segments for cybersecurity research and penetration testing",
    },
  ];

  return (
    <section id="homelab" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            My <span className="gradient-text">HomeLab</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A high-availability Proxmox cluster built from repurposed Dell OptiPlex systems,
            showcasing enterprise-grade infrastructure at home scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional server rack with multiple systems and network equipment"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-semibold">Architecture Overview</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My homelab consists of two Dell OptiPlex systems configured in a Proxmox cluster
              for high availability. This setup allows me to experiment with enterprise-grade
              technologies while ensuring resilience through redundancy.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Server className="text-emerald-500 w-6 h-6 mr-4" />
                <span className="text-muted-foreground">
                  2x Dell OptiPlex Systems in HA Cluster
                </span>
              </div>
              <div className="flex items-center">
                <Network className="text-emerald-500 w-6 h-6 mr-4" />
                <span className="text-muted-foreground">
                  Proxmox VE Clustering with Shared Storage
                </span>
              </div>
              <div className="flex items-center">
                <Zap className="text-emerald-500 w-6 h-6 mr-4" />
                <span className="text-muted-foreground">
                  Nginx Load Balancer for Application Hosting
                </span>
              </div>
              <div className="flex items-center">
                <Container className="text-emerald-500 w-6 h-6 mr-4" />
                <span className="text-muted-foreground">
                  Container Orchestration with Docker & K8s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Diagram */}
        <div className="bg-card p-8 rounded-xl mb-12">
          <h3 className="text-2xl font-serif font-semibold mb-8 text-center">
            Network Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Load Balancer */}
            <div className="space-y-4">
              <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg p-6 hover-lift">
                <Zap className="text-emerald-400 w-12 h-12 mb-4 mx-auto" />
                <h4 className="text-xl font-semibold text-emerald-400">
                  Nginx Load Balancer
                </h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Traffic distribution and SSL termination
                </p>
              </div>
            </div>

            {/* Proxmox Cluster */}
            <div className="space-y-4">
              <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 hover-lift">
                <Server className="text-blue-400 w-12 h-12 mb-4 mx-auto" />
                <h4 className="text-xl font-semibold text-blue-400">Proxmox HA Cluster</h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Dell OptiPlex Node 1 & 2
                </p>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                <div className="flex justify-center space-x-2 items-center">
                  <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                  <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                  <span className="text-green-400">Both Nodes Online</span>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="space-y-4">
              <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6 hover-lift">
                <Container className="text-purple-400 w-12 h-12 mb-4 mx-auto" />
                <h4 className="text-xl font-semibold text-purple-400">Applications</h4>
                <p className="text-muted-foreground text-sm mt-2">
                  K8s, Docker containers, web services
                </p>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center mt-8">
            <div className="text-muted-foreground text-sm font-mono">
              ← Internet Traffic → Load Balancer → Proxmox Cluster → Applications →
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="bg-card p-6 rounded-xl hover-lift">
              <div className="mb-4">{project.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
              <p className="text-muted-foreground text-sm">{project.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-500/10 p-8 rounded-2xl border border-emerald-500/20 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Looking for my Enterprise Lab?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Explore my dedicated Cisco Security Production Lab hosted on vSphere, featuring FMC, FTD, ISE, and advanced ZTA architectures.
          </p>
          <Link href="/production-lab">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              View Production Lab
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomelabSection;
