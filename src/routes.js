import Index from "views/Index.js";
import HealthAssessment from "views/examples/HealthAssessment";
import StateStat from "views/examples/StateStat";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/farmer",
  },
  {
    path: "/statestat",
    name: "State Stat",
    icon: "ni ni-chart-bar-32 text-blue",
    component: StateStat,
    layout: "/farmer",
  },
  {
    path: "/healthassesment",
    name: "Health Assessment",
    icon: "ni ni-fat-add text-red",
    component: HealthAssessment,
    layout: "/farmer",
  }
];
export default routes;
