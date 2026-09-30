import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Check, ClipboardCheck } from "lucide-react";
import { trackPilotEvent } from "./telemetry";

export function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPilotEvent("page_view", undefined, location.pathname);
  }, [location.pathname]);
  return null;
}

export function ResultFeedback() {
  const location = useLocation();
  const [clarity, setClarity] = useState<string | null>(null);
  const [transfer, setTransfer] = useState<string | null>(null);

  if (location.pathname !== "/result") return null;

  function answer(kind: "clarity" | "transfer", value: string) {
    trackPilotEvent("pilot_feedback", { kind, value });
    if (kind === "clarity") setClarity(value);
    else setTransfer(value);
  }

  return (
    <section className="pilot-feedback" aria-label="ملاحظات التجربة">
      <div className="pilot-feedback-head">
        <div>
          <span>تجربة العائلة</span>
          <b>سؤالان فقط قبل أن نكمل</b>
        </div>
        <ClipboardCheck size={22} />
      </div>

      <div className="pilot-feedback-grid">
        <div>
          <p>هل كانت المهمة واضحة من دون شرح طويل؟</p>
          <div className="pilot-feedback-actions">
            <button className={clarity === "clear" ? "selected" : ""} onClick={() => answer("clarity", "clear")}><Check size={15} /> واضحة</button>
            <button className={clarity === "help" ? "selected" : ""} onClick={() => answer("clarity", "help")}>احتجت مساعدة</button>
          </div>
        </div>
        <div>
          <p>هل تستطيع شرح الفكرة بكلماتك الآن؟</p>
          <div className="pilot-feedback-actions">
            <button className={transfer === "can_explain" ? "selected" : ""} onClick={() => answer("transfer", "can_explain")}><Check size={15} /> أستطيع شرحها</button>
            <button className={transfer === "unsure" ? "selected" : ""} onClick={() => answer("transfer", "unsure")}>ما زلت غير متأكد</button>
          </div>
        </div>
      </div>

      {clarity && transfer && <div className="pilot-feedback-done">تم الحفظ محليًا في هذا المتصفح. <Link to="/pilot">عرض سجل التجربة <ArrowLeft size={15} /></Link></div>}
    </section>
  );
}
