import { Component, lazy, Suspense, type ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { BrandHome } from "./brand-home";
import { Shell } from "./components";

const Onboarding = lazy(() => import("./onboarding"));
const KidHomeV2 = lazy(() => import("./pilot").then(m => ({ default: m.KidHomeV2 })));
const MissionHub = lazy(() => import("./pilot").then(m => ({ default: m.MissionHub })));
const ParentDashboardV2 = lazy(() => import("./pilot").then(m => ({ default: m.ParentDashboardV2 })));
const WaterMission = lazy(() => import("./mission-lab").then(m => ({ default: m.WaterMission })));
const RoutingMission = lazy(() => import("./mission-lab").then(m => ({ default: m.RoutingMission })));
const TrafficMission = lazy(() => import("./mission-lab").then(m => ({ default: m.TrafficMission })));
const EconomyMission = lazy(() => import("./mission-lab").then(m => ({ default: m.EconomyMission })));
const Result = lazy(() => import("./mission-lab").then(m => ({ default: m.Result })));
const CurriculumPage = lazy(() => import("./curriculum").then(m => ({ default: m.CurriculumPage })));
const PrivacyPage = lazy(() => import("./privacy").then(m => ({ default: m.PrivacyPage })));

class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <Shell><main className="wrap narrow route-recovery">
      <h1>تعذّر فتح هذه المساحة</h1>
      <p>تحقق من الاتصال ثم أعد تحميل الصفحة. العمل المحفوظ في هذا المتصفح يبقى متاحًا.</p>
      <button className="button" onClick={() => window.location.reload()}>أعد المحاولة</button>
      <a className="text-link" href="/">العودة إلى البداية</a>
    </main></Shell>;
  }
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <PageErrorBoundary key={pathname}>
    <Suspense fallback={<div className="route-loading" role="status" lang="ar" dir="rtl">نفتح المساحة…</div>}>
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
    </Suspense>
    </PageErrorBoundary>
  );
}
