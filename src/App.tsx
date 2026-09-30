import { Route, Routes } from "react-router-dom";
import {
  EconomyMission,
  Landing,
  Onboarding,
  Result,
  RoutingMission,
  TrafficMission,
  WaterMission,
} from "./pages-next";
import { KidHomeV2, MissionHub, ParentDashboardV2 } from "./pilot";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kid" element={<KidHomeV2 />} />
      <Route path="/missions" element={<MissionHub />} />
      <Route path="/mission/water" element={<WaterMission />} />
      <Route path="/mission/routing" element={<RoutingMission />} />
      <Route path="/mission/traffic" element={<TrafficMission />} />
      <Route path="/mission/economy" element={<EconomyMission />} />
      <Route path="/result" element={<Result />} />
      <Route path="/parent" element={<ParentDashboardV2 />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
