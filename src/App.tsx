import { Component, lazy, Suspense, type ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { BrandHome } from "./brand-home";
import { Shell } from "./components";
import type { BrandLanguage } from "./brand";

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

const routeStatusCopy: Record<BrandLanguage, { loading: string; title: string; body: string; retry: string; home: string }> = {
  ar: { loading: "نفتح المساحة…", title: "تعذّر فتح هذه المساحة", body: "تحقق من الاتصال ثم أعد تحميل الصفحة. العمل المحفوظ في هذا المتصفح يبقى متاحًا.", retry: "أعد المحاولة", home: "العودة إلى البداية" },
  en: { loading: "Opening this space…", title: "This space could not be opened", body: "Check your connection and reload the page. Work saved in this browser remains available.", retry: "Try again", home: "Return to the start" },
  fr: { loading: "Ouverture de l’espace…", title: "Impossible d’ouvrir cet espace", body: "Vérifiez la connexion puis rechargez la page. Le travail enregistré dans ce navigateur reste disponible.", retry: "Réessayer", home: "Retour au début" },
};

class PageErrorBoundary extends Component<{ children: ReactNode; language: BrandLanguage }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    const copy = routeStatusCopy[this.props.language];
    return <Shell language={this.props.language}><main className="wrap narrow route-recovery" lang={this.props.language} dir={this.props.language === "ar" ? "rtl" : "ltr"}>
      <h1>{copy.title}</h1>
      <p>{copy.body}</p>
      <button className="button" onClick={() => window.location.reload()}>{copy.retry}</button>
      <a className="text-link" href={`/?lang=${this.props.language}`}>{copy.home}</a>
    </main></Shell>;
  }
}

export default function App() {
  const { pathname, search } = useLocation();
  const requested = new URLSearchParams(search).get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const copy = routeStatusCopy[language];
  return (
    <PageErrorBoundary key={pathname} language={language}>
    <Suspense fallback={<div className="route-loading" role="status" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>{copy.loading}</div>}>
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
