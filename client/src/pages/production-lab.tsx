import { Shield, Network, Server, ShieldCheck, Cpu, Key, Globe, Lock } from "lucide-react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductionLab = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-serif font-semibold cursor-pointer">
              Darian O'Dirling
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-emerald-500">Back to Portfolio</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            Production <span className="text-emerald-500">Security Lab</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive vSphere-hosted DMZ environment dedicated to mastering Cisco Security products,
            recreating customer architectures, and hardening enterprise-grade infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <Shield className="text-emerald-500 w-10 h-10 mb-2" />
              <CardTitle>Cisco Firepower & ASA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Centralized management with Firepower Management Center (FMC) controlling Next-Gen Firewalls (FTD) 
                and classic ASA instances for perimeter security and deep packet inspection.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <Key className="text-emerald-500 w-10 h-10 mb-2" />
              <CardTitle>Cisco ISE & Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Implementing Cisco Identity Services Engine (ISE) for NAC, 802.1X, and policy enforcement across 
                the entire virtualized infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <Network className="text-emerald-500 w-10 h-10 mb-2" />
              <CardTitle>Routing & Switching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complex routing scenarios using IOS routers, implementing advanced NAT, OSPF, and BGP 
                configurations to simulate real-world service provider and enterprise edges.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-secondary/30 p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
              <Lock className="mr-3 text-emerald-500" /> VPN & Zero Trust
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Multiple Site-to-Site VPN tunnels between virtual branches.
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                AnyConnect Remote Access VPN with Duo Multi-Factor Authentication.
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Exploring Zero Trust Access (ZTA) architectures for secure application delivery.
              </li>
            </ul>
          </div>

          <div className="bg-secondary/30 p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
              <Server className="mr-3 text-emerald-500" /> Active Directory Ecosystem
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Windows Server Domain Controllers in a high-availability setup.
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Managed Windows 10/11 clients for testing endpoint security policies.
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                GPO hardening and identity synchronization with Cisco ISE.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-500/10 p-8 rounded-2xl border border-emerald-500/20 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Customer Case Replication</h2>
          <p className="text-lg text-muted-foreground mb-6">
            This lab isn't just for learning—it's my primary environment for recreating complex 
            customer issues, validating security patches, and testing configuration changes before 
            production implementation. It's one of the best perks of my role.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center text-sm text-emerald-400">
              <ShieldCheck className="mr-2" /> Hardened
            </div>
            <div className="flex items-center text-sm text-emerald-400">
              <Globe className="mr-2" /> Global Reach
            </div>
            <div className="flex items-center text-sm text-emerald-400">
              <Cpu className="mr-2" /> Scalable
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-secondary border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Darian O'Dirling. Built for continuous learning and professional excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductionLab;
