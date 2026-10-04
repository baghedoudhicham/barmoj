import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);
  const inKid =
    pathname.startsWith("/kid") ||
    pathname.startsWith("/mission") ||
    pathname === "/result" ||
    pathname === "/curriculum";
  return (
    <div className="app-shell">
      <a className="skip-link" href="#page-content">
        انتقل إلى المحتوى
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="بِرْكار، BRKAR، تُنطق بيركار">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" focusable="false">
                <path d="M12 6c0-2 1.8-3.5 4-3.5S20 4 20 6" />
                <path d="m13 7-5 18m11-18 5 18" />
                <path d="M6 25c2.8-6.8 6.4-10.2 10-10.2S23.2 18.2 26 25" />
                <circle cx="16" cy="6" r="1.7" />
              </svg>
            </span>
            <span className="brand-lockup">
              <span className="brand-arabic" dir="rtl">بِرْكار</span>
              <span className="brand-latin" dir="ltr">BRKAR · BIRKAR</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {inKid ? (
              <>
                <Link to="/kid">مساحتي</Link>
                <Link to="/curriculum">المسار الكامل</Link>
                <Link to="/parent">للأهل</Link>
              </>
            ) : (
              <>
                <a href="/#method">كيف نتعلّم؟</a>
                <a href="/#track">المسار</a>
                <Link to="/curriculum">المنهج الكامل</Link>
                <Link to="/parent">للأهل</Link>
              </>
            )}
            <Link
              className="button button-small"
              to={inKid ? "/kid" : "/onboarding"}
            >
              {inKid ? "المهمات" : "ابدأ التجربة"}
            </Link>
          </nav>
          <button
            className="icon-button mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="التنقل على الهاتف"
          >
            <Link to="/kid" onClick={() => setOpen(false)}>
              مساحة الطفل
            </Link>
            <Link to="/parent" onClick={() => setOpen(false)}>
              لوحة الأهل
            </Link>
            <Link to="/curriculum" onClick={() => setOpen(false)}>
              المنهج الكامل
            </Link>
            <Link to="/privacy" onClick={() => setOpen(false)}>
              الخصوصية في التجربة
            </Link>
            <Link to="/onboarding" onClick={() => setOpen(false)}>
              بدء جديد
            </Link>
          </nav>
        )}
      </header>
      <div id="page-content" tabIndex={-1}>
        {children}
      </div>
      <footer className="site-footer">
        <div>
          <b className="footer-brand"><span dir="rtl">بِرْكار</span><span dir="ltr">BRKAR · BIRKAR</span></b>
          <span>نسخة تجربة عائلية بإشراف وليّ الأمر</span>
        </div>
        <nav aria-label="روابط العائلة">
          <Link to="/curriculum">المنهج الكامل</Link>
          <Link to="/privacy">الخصوصية في التجربة</Link>
          <Link to="/parent">لوحة الأهل</Link>
        </nav>
      </footer>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export function Artifact({
  name,
  tone,
  children,
}: {
  name: string;
  tone: "green" | "yellow" | "red" | "blue";
  children: ReactNode;
}) {
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
        <div
          className={`rail-step ${index <= active ? "active" : ""}`}
          key={step}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{step}</b>
        </div>
      ))}
    </div>
  );
}

export function MissionLink({
  to,
  label,
  children,
}: {
  to: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <span>{label}</span>
      <ArrowLeft size={18} />
    </Link>
  );
}

export function TankDiagram({
  level = 72,
  faulty = false,
  stopped = false,
}: {
  level?: number;
  faulty?: boolean;
  stopped?: boolean;
}) {
  return (
    <div className="tank-scene" aria-label="نموذج نظام الخزان">
      <div className="diagram-label input-label">مدخل / حساس</div>
      <div className={`sensor-dot ${faulty ? "fault" : ""}`} />
      <div className="tank">
        <div className="tank-threshold">80%</div>
        <div
          className="tank-water"
          style={{ height: `${Math.min(level, 100)}%` }}
        />
      </div>
      <div className="diagram-arrow" />
      <div className="rule-node">
        إذا ≥ 80%
        <br />
        <b>أوقف المضخة</b>
      </div>
      <div className="diagram-arrow second" />
      <div className={`pump-node ${stopped ? "stopped" : ""}`}>
        {stopped ? "متوقفة" : "تعمل"}
      </div>
    </div>
  );
}
