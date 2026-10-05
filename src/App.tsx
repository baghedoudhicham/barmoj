import { Route, Routes } from "react-router-dom";
import { Onboarding } from "./pages-next";
import { BrandHome } from "./brand-home";
import {
  EconomyMission,
  Result,
  RoutingMission,
  TrafficMission,
  WaterMission,
} from "./mission-lab";
import { KidHomeV2, MissionHub, ParentDashboardV2 } from "./pilot";
import { CurriculumPage } from "./curriculum";
import { PrivacyPage } from "./privacy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BrandHome />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kid" element={<KidHomeV2 />} />
      <Route path="/missions" element={<MissionHub />} />
      <Route path="/mission/water" element={<WaterMission />} />
      <Route path="/mission/routing" element={<RoutingMission />} />
      <Route path="/mission/traffic" element={<TrafficMission />} />
      <Route path="/mission/economy" element={<EconomyMission />} />
      <Route path="/result" element={<Result />} />
      <Route path="/parent" element={<ParentDashboardV2 />} />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<BrandHome />} />
    </Routes>
  );
}
