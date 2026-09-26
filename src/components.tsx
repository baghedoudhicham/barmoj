import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const inKid = pathname.startsWith("/kid") || pathname.startsWith("/mission") || pathname === "/result";
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="برموج">
            <span className="brand-mark">ب</span>
            <span>برموج</span>
          </Link>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {inKid ? (
              <>
                <Link to="/kid">مساحتي</Link>
                <Link to="/parent">للأهل</Link>
              </>
            ) : (
              <>
                <a href="/#method">كيف نتعلّم؟</a>
                <a href="/#track">المسار</a>
                <Link to="/parent">للأهل</Link>
              </>
            )}
            <Link className="button button-small" to={inKid ? "/kid" : "/onboarding"}>
              {inKid ? "المهمات" : "ابدأ التجربة"}
            </Link>
          </nav>
          <button className="icon-button mobile-menu" onClick={() => setOpen(!open)} aria-label="القائمة">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav">
            <Link to="/kid" onClick={() => setOpen(false)}>مساحة الطفل</Link>
            <Link to="/parent" onClick={() => setOpen(false)}>لوحة الأهل</Link>
            <Link to="/onboarding" onClick={() => setOpen(false)}>بدء جديد</Link>
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export function Artifact({ name, tone, children }: { name: string; tone: "green" | "yellow" | "red" | "blue"; children: ReactNode }) {
  return (
    <div className="artifact">
      <div className={`artifact-label ${tone}`}>{name}</div>
      <div className="artifact-body">{children}</div>
    </div>
  );
}

export function SystemRail({ active = 2 }: { active?: number }) {
  const steps = ["افهم", "فكّك", "صمّم", "اختبر", "حسّن"];
  return (
    <div className="system-rail" aria-label="دورة التعلّم">
      {steps.map((step, index) => (
        <div className={`rail-step ${index <= active ? "active" : ""}`} key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{step}</b>
        </div>
      ))}
    </div>
  );
}

export function MissionLink({ to, label, children }: { to: string; label: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <span>{label}</span>
      <ArrowLeft size={18} />
    </Link>
  );
}

export function TankDiagram({ level = 72, faulty = false, stopped = false }: { level?: number; faulty?: boolean; stopped?: boolean }) {
  return (
    <div className="tank-scene" aria-label="نموذج نظام الخزان">
      <div className="diagram-label input-label">مدخل / حساس</div>
      <div className={`sensor-dot ${faulty ? "fault" : ""}`} />
      <div className="tank">
        <div className="tank-threshold">80%</div>
        <div className="tank-water" style={{ height: `${Math.min(level, 100)}%` }} />
      </div>
      <div className="diagram-arrow" />
      <div className="rule-node">إذا ≥ 80%<br /><b>أوقف المضخة</b></div>
      <div className="diagram-arrow second" />
      <div className={`pump-node ${stopped ? "stopped" : ""}`}>{stopped ? "متوقفة" : "تعمل"}</div>
    </div>
  );
}
