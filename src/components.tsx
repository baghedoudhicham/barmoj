import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BrandArrow, BrandMark, shellCopy, type BrandLanguage } from "./brand";

export function Shell({ children, language = "ar" }: { children: ReactNode; language?: BrandLanguage }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const c = shellCopy[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    const heading = content.current?.querySelector("h1")?.textContent;
    document.title = `BRKAR | بِركار — ${heading || c.tagline}`;
  }, [language, c.tagline]);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    setOpen(false);
    const heading = content.current?.querySelector("h1");
    let anchor: HTMLElement | null = null;
    try { if (hash) anchor = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { /* Ignore a malformed fragment. */ }
    const target = anchor || heading;
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
    if (anchor) anchor.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  const inKid =
    pathname.startsWith("/kid") ||
    pathname.startsWith("/mission") ||
    pathname === "/parent" ||
    pathname === "/result" ||
    pathname === "/curriculum";
  return (
    <div className="app-shell" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <a className="skip-link" href="#page-content">
        {c.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to={language === "ar" ? "/" : `/?lang=${language}`} aria-label={c.home}>
            <span className="brand-mark" aria-hidden="true">
              <BrandMark />
            </span>
            <span className="brand-lockup">
              <span className="brand-arabic" dir="rtl">بِركار</span>
              <span className="brand-latin" dir="ltr">BRKAR</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label={c.nav}>
            {inKid ? (
              <>
                <Link to="/kid" aria-current={pathname === "/kid" ? "page" : undefined}>{c.space}</Link>
                <Link to={`/curriculum?lang=${language}`} aria-current={pathname === "/curriculum" ? "page" : undefined}>{c.curriculum}</Link>
                <Link to="/parent" aria-current={pathname === "/parent" ? "page" : undefined}>{c.parents}</Link>
              </>
            ) : (
              <>
                <a href={`/?lang=${language}#method`}>{c.method}</a>
                <a href={`/?lang=${language}#track`}>{c.track}</a>
                <Link to={`/curriculum?lang=${language}`}>{c.curriculum}</Link>
                <a href={`/?lang=${language}#families`}>{c.parents}</a>
              </>
            )}
            <Link
              className="button button-small"
              to={inKid ? "/missions" : "/onboarding"}
            >
              {inKid ? c.track : c.start}
            </Link>
          </nav>
          <button
            ref={menuButton}
            type="button"
            className="icon-button mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={c.menu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <span className="brand-menu-close" aria-hidden="true">×</span> : <span className="brand-menu-lines" aria-hidden="true"><i/><i/><i/></span>}
          </button>
        </div>
        {open && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label={c.nav}
          >
            <Link to="/kid" onClick={() => setOpen(false)}>
              {c.space}
            </Link>
            <Link to="/parent" onClick={() => setOpen(false)}>
              {c.parents}
            </Link>
            <Link to={`/curriculum?lang=${language}`} onClick={() => setOpen(false)}>
              {c.curriculum}
            </Link>
            <Link to="/privacy" onClick={() => setOpen(false)}>
              {c.privacy}
            </Link>
            <Link to="/onboarding" onClick={() => setOpen(false)}>
              {c.start}
            </Link>
          </nav>
        )}
      </header>
      <div ref={content} id="page-content" className="page-content" tabIndex={-1}>
        {children}
      </div>
      <footer className="site-footer">
        <div className="brand-footer-copy">
          <b className="footer-brand"><span dir="rtl">بِركار</span><span dir="ltr">BRKAR</span></b>
          <p>{c.tagline}</p>
          <span>{c.pilot}</span>
        </div>
        <nav aria-label={c.nav}>
          <Link to={`/curriculum?lang=${language}`}>{c.curriculum}</Link>
          <Link to="/privacy">{c.privacy}</Link>
          <Link to="/parent">{c.parents}</Link>
        </nav>
      </footer>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
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
      <BrandArrow />
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
