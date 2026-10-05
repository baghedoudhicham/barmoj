import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionTitle, Shell } from "./components";
import { getProfile, saveProfile } from "./data";
export default function Onboarding() {
  const initial = getProfile();
  const [child, setChild] = useState(initial.child);
  const [supervised, setSupervised] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!supervised) return;
    if (!saveProfile({ child })) {
      setStorageError(true);
      return;
    }
    navigate("/kid");
  }
  return (
    <Shell>
      <main className="wrap narrow section onboarding-wrap">
        <div className="onboarding-index"><span>01</span><b>وليّ الأمر</b><span>02</span><b>لقب اختياري</b><span>03</span><b>ابدأ</b></div>
        <SectionTitle level={1} eyebrow="إعداد الأسرة" title="بداية بسيطة، وبيانات أقل" body="هذه تجربة عائلية بإشراف بالغ. لا نطلب اسم وليّ الأمر أو العمر الدقيق أو البريد الإلكتروني." />
        <form className="form-panel" onSubmit={submit}>
          <label>لقب للطفل (اختياري)<input value={child} onChange={(event) => setChild(event.target.value)} placeholder="مثال: المستكشف" maxLength={24} autoComplete="off" /></label>
          <p className="privacy-hint">استخدم لقبًا بدل الاسم الكامل. لا تكتب معلومات عن المدرسة أو العنوان أو وسيلة التواصل.</p>
          <label className="supervision-check"><input type="checkbox" checked={supervised} onChange={(event) => setSupervised(event.target.checked)} required /> أنا وليّ الأمر أو المرافق البالغ، وسأبقى حاضرًا أثناء تجربة الطفل.</label>
          <p className="pilot-disclosure">التقدم والإجابات محفوظة في هذا المتصفح فقط، ولا تُرسل إلى حساب أو خدمة تحليلات داخل التطبيق. من يستخدم ملف المتصفح نفسه قد يتمكن من رؤية لوحة الأهل. <Link to="/privacy">اقرأ تفاصيل تجربة الأسرة.</Link></p>
          {storageError && <p role="alert" className="storage-alert">تعذّر حفظ اللقب في هذا المتصفح. تحقق من إعدادات التخزين ثم أعد المحاولة.</p>}
          <button className="button" type="submit" disabled={!supervised}>ادخل مساحة التعلّم <ArrowLeft size={18} /></button>
        </form>
      </main>
    </Shell>
  );
}
