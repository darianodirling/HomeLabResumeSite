import { Boxes, Database, Network, ShieldCheck, Server, Workflow } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NutanixLab = () => {
  const capabilities = [
    {
      title: "Nutanix Cloud Platform",
      description: "A dedicated environment for building platform expertise across Nutanix services and operational patterns.",
      icon: Boxes,
    },
    {
      title: "Flow Microsegmentation",
      description: "Policy-driven segmentation experiments that strengthen workload security and support Zero Trust design.",
      icon: ShieldCheck,
    },
    {
      title: "NDB & NUS",
      description: "Exploring database operations with Nutanix Database Service and storage capabilities with Nutanix Unified Storage.",
      icon: Database,
    },
    {
      title: "Identity & Infrastructure",
      description: "Integrating Active Directory and foundational services to model enterprise-ready operating environments.",
      icon: Server,
    },
    {
      title: "Automation with Terraform",
      description: "Using automation and Terraform to build repeatable infrastructure workflows and continuously improve the lab.",
      icon: Workflow,
    },
    {
      title: "Continuous Expansion",
      description: "Continuing to add services, scenarios, and integrations to deepen practical platform expertise.",
      icon: Network,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-serif font-semibold cursor-pointer">Darian O'Dirling</Link>
          <Link href="/"><Button variant="ghost" className="text-emerald-500">Back to Portfolio</Button></Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            Nutanix <span className="text-emerald-500">Lab</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An evolving hands-on environment for developing deep Nutanix platform expertise through secure,
            automated, enterprise-oriented infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {capabilities.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="bg-card border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
              <CardHeader><Icon className="text-emerald-500 w-10 h-10 mb-2" /><CardTitle>{title}</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">{description}</p></CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-emerald-500/10 p-8 rounded-2xl border border-emerald-500/20 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Built for Continuous Learning</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This lab is intentionally growing over time—adding new services, automation, and real-world scenarios
            to build practical expertise in resilient cloud infrastructure.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NutanixLab;
