import React from "react";
import { LANGS } from "./I18nProvider";
import type { LangCode } from "./I18nProvider";

interface LanguageSelectProps {
  value: LangCode;
  onChange: (lang: LangCode) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LangCode)}
      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageSelect;
