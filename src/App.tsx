import { Route, Routes } from "react-router-dom";
import {
  EconomyMission,
  KidHome,
  Landing,
  Onboarding,
  ParentDashboard,
  Result,
  RoutingMission,
  TrafficMission,
  WaterMission,
} from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kid" element={<KidHome />} />
      <Route path="/mission/water" element={<WaterMission />} />
      <Route path="/mission/routing" element={<RoutingMission />} />
      <Route path="/mission/traffic" element={<TrafficMission />} />
      <Route path="/mission/economy" element={<EconomyMission />} />
      <Route path="/result" element={<Result />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
