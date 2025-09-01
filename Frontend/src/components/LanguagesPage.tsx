import React from "react";
import { Languages, Info } from "lucide-react";
import { useI18n, LANGS } from "./I18nProvider";

const LanguagesPage: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Languages className="h-6 w-6" /> {t("lang_title")}
        </h2>
        <p className="text-slate-600 mt-2">{t("lang_sub")}</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm text-slate-600 mb-3">{t("lang_choose")}</p>
          <div className="flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={
                  "rounded-2xl border px-4 py-2 text-sm " +
                  (lang === l.code ? "bg-slate-900 text-white" : "hover:bg-slate-50")
                }
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            <Info className="inline h-3 w-3 mr-1" /> {t("lang_tip")}
          </p>
        </div>
        <div className="rounded-3xl border bg-white p-6">
          <h3 className="font-semibold mb-2">Preview</h3>
          <div className="space-y-2 text-sm">
            <p className="font-medium">{t("hero_title")}</p>
            <p className="text-slate-600">{t("hero_sub")}</p>
            <ul className="list-disc pl-5 text-slate-600">
              <li>{t("hero_points_1")}</li>
              <li>{t("hero_points_2")}</li>
              <li>{t("hero_points_3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesPage;
