import { useSearchParams } from "react-router-dom";
import type { BrandLanguage } from "./brand";
import { languageNames } from "./languages";

export function LanguagePicker({ language, label }: { language: BrandLanguage; label: string }) {
  const [params, setParams] = useSearchParams();
  function select(nextLanguage: BrandLanguage) {
    const next = new URLSearchParams(params);
    next.set("lang", nextLanguage);
    setParams(next, { replace: true });
  }

  return (
    <div className="pilot-language-control">
      <div className="language-tabs" role="group" aria-label={label}>
        {(Object.keys(languageNames) as BrandLanguage[]).map((item) => (
          <button
            type="button"
            key={item}
            lang={item}
            className={language === item ? "selected" : ""}
            aria-pressed={language === item}
            onClick={() => select(item)}
          >
            {languageNames[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
