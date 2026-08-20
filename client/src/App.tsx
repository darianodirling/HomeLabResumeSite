import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import ProductionLab from "@/pages/production-lab";
import NutanixLab from "@/pages/nutanix-lab";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/production-lab" component={ProductionLab} />
      <Route path="/nutanix-lab" component={NutanixLab} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Router />
  );
}

export default App;
