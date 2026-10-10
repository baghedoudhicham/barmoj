import { Link, useSearchParams } from "react-router-dom";
import { Shell } from "./components";
import type { BrandLanguage } from "./brand";
import { LanguagePicker } from "./language-picker";
import { pilotUiCopy } from "./pilot-ui-copy";

const contact = "contact@wiwedo.com";

const copy: Record<BrandLanguage, {
  eyebrow: string; title: string; intro: string; operator: string; operatorBody: string;
  contactTitle: string; contactBody: string; subject: string; dataTitle: string; dataBody: string;
  deleteTitle: string; deleteBody: string; safetyTitle: string; safetyBody: string;
  privacy: string; parent: string;
}> = {
  ar: {
    eyebrow: "مساعدة الأهل · تجربة بِركار", title: "المساعدة والتواصل",
    intro: "هذه تجربة مجانية بإشراف بالغ. إذا واجهتم مشكلة أو أردتم إبلاغنا بملاحظة تتعلق بالخصوصية أو سلامة الطفل، تواصلوا معنا عبر البريد أدناه.",
    operator: "من يدير التجربة؟", operatorBody: "بِركار مشروع مستقل يديره مؤسسه. يتولى المؤسس مراجعة رسائل الأهل والملاحظات المتعلقة بالخصوصية والسلامة عبر وسيلة التواصل هذه. لم تُفتح قائمة التسجيل بعد.",
    contactTitle: "تواصلوا معنا", contactBody: "هذا البريد موجّه للأهل والبالغين. اذكروا نوع الجهاز والصفحة والمشكلة إن أمكن، من دون إرسال اسم الطفل الكامل أو إجاباته أو صوره أو بيانات مدرسته.", subject: "ملاحظة حول تجربة بِركار",
    dataTitle: "أين تُحفظ الإجابات؟", dataBody: "تُحفظ الألقاب الاختيارية والمسودات والتجارب والتفسيرات في متصفح هذا الموقع على الجهاز المستخدم فقط. قد يراها من يستخدم ملف المتصفح نفسه. لا يوجد حساب أو نسخ احتياطي أو تشفير لهذه البيانات داخل التطبيق كخزنة خاصة.",
    deleteTitle: "كيف نحذف السجل؟", deleteBody: "افتحوا لوحة الأهل في المتصفح نفسه واضغطوا «حذف سجل التجربة من هذا المتصفح»، ثم أكدوا الحذف. يمكنكم أيضًا مسح بيانات هذا الموقع من إعدادات المتصفح. لا يمكن استرجاع السجل بعد الحذف.",
    safetyTitle: "حدود التجربة", safetyBody: "أربعة مختبرات تفاعلية وصفحات الأسرة متاحة بالعربية والإنجليزية والفرنسية. يمكن للطفل التوقف في أي وقت. لا نقيس الذكاء أو الانتباه، ولا توجد حسابات للأطفال أو دفع في هذه التجربة.",
    privacy: "تفاصيل الخصوصية", parent: "لوحة الأهل",
  },
  en: {
    eyebrow: "Parent help · BRKAR preview", title: "Help and contact",
    intro: "This is a free preview with an adult. If something goes wrong, or you want to raise a privacy or child-safety concern, use the email below.",
    operator: "Who runs the preview?", operatorBody: "BRKAR is an independent, founder-led project. The founder reviews adult support, privacy and safety concerns through this contact route. The interest list is not open yet.",
    contactTitle: "Contact us", contactBody: "This address is for parents and other adults. Describe the device, page and issue if you can. Please do not send a child's full name, answers, photos or school details.", subject: "BRKAR preview question",
    dataTitle: "Where are answers saved?", dataBody: "Optional nicknames, drafts, trials and explanations stay in this website's browser storage on the device used. Anyone using the same browser profile may see them. There is no account, backup or app-level encryption that makes this a private vault.",
    deleteTitle: "How do I delete the record?", deleteBody: "Open the parent dashboard in the same browser and select “Delete this browser’s trial record,” then confirm. Clearing this site's data in browser settings also removes it. The record cannot be recovered after deletion.",
    safetyTitle: "Preview limits", safetyBody: "Four interactive labs and the family pages are available in Arabic, English and French. A child can stop at any time. This preview does not measure intelligence or attention and has no child accounts or payments.",
    privacy: "Privacy details", parent: "Parent dashboard",
  },
  fr: {
    eyebrow: "Aide aux parents · aperçu BRKAR", title: "Aide et contact",
    intro: "Cet aperçu gratuit se découvre avec un adulte. Pour signaler un problème ou une préoccupation liée à la confidentialité ou à la sécurité d’un enfant, utilisez l’adresse ci-dessous.",
    operator: "Qui gère cet aperçu ?", operatorBody: "BRKAR est un projet indépendant porté par son fondateur. Celui-ci examine les demandes des adultes et les préoccupations liées à la confidentialité et à la sécurité reçues à cette adresse. La liste d’intérêt n’est pas encore ouverte.",
    contactTitle: "Nous contacter", contactBody: "Cette adresse s’adresse aux parents et aux autres adultes. Si possible, indiquez l’appareil, la page et le problème. N’envoyez pas le nom complet, les réponses, les photos ou les informations scolaires d’un enfant.", subject: "Question sur l’aperçu BRKAR",
    dataTitle: "Où les réponses sont-elles conservées ?", dataBody: "Les surnoms facultatifs, brouillons, essais et explications restent dans le stockage de ce site, dans le navigateur de l’appareil utilisé. Toute personne qui utilise le même profil de navigateur peut les voir. Il n’y a ni compte, ni sauvegarde, ni chiffrement intégré faisant de cet espace un coffre privé.",
    deleteTitle: "Comment supprimer les données ?", deleteBody: "Ouvrez le tableau de bord des parents dans le même navigateur, choisissez « Supprimer les données de l’essai dans ce navigateur », puis confirmez. Effacer les données du site dans les paramètres du navigateur les supprime également. La suppression est irréversible.",
    safetyTitle: "Limites de l’aperçu", safetyBody: "Quatre ateliers interactifs et les pages familiales sont disponibles en arabe, anglais et français. Un enfant peut s’arrêter à tout moment. Cet aperçu ne mesure ni l’intelligence ni l’attention et ne propose ni compte enfant ni paiement.",
    privacy: "Détails de confidentialité", parent: "Tableau des parents",
  },
};

export function SupportPage() {
  const [params] = useSearchParams();
  const requested = params.get("lang");
  const language: BrandLanguage = requested === "en" || requested === "fr" ? requested : "ar";
  const c = copy[language];
  return <Shell language={language}>
    <main className="wrap narrow privacy-page" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <LanguagePicker language={language} label={pilotUiCopy[language].languageLabel} />
      <p className="eyebrow">{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <p className="privacy-intro">{c.intro}</p>
      <section><h2>{c.operator}</h2><p>{c.operatorBody}</p></section>
      <section><h2>{c.contactTitle}</h2><p>{c.contactBody}</p><p><a href={`mailto:${contact}?subject=${encodeURIComponent(c.subject)}`}>{contact}</a></p></section>
      <section><h2>{c.dataTitle}</h2><p>{c.dataBody}</p></section>
      <section><h2>{c.deleteTitle}</h2><p>{c.deleteBody}</p><Link to={`/parent?lang=${language}`}>{c.parent}</Link></section>
      <section><h2>{c.safetyTitle}</h2><p>{c.safetyBody}</p><Link to={`/privacy?lang=${language}`}>{c.privacy}</Link></section>
    </main>
  </Shell>;
}
