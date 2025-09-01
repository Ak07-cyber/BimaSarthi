import React from "react";
import { ShieldCheck } from "lucide-react"; // This line remains unchanged
import { useI18n } from "./I18nProvider"; // Removed LANGS import
import LanguageSelect from "./LanguageSelect"; // Ensure case-sensitive match

export interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
}

interface AppShellProps {
  route: string;
  setRoute: (route: string) => void;
  children?: React.ReactNode;
  nav: NavItem[];
}

const AppShell: React.FC<AppShellProps> = ({ route, setRoute, children, nav }) => {
  const { t, lang, setLang } = useI18n();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-semibold tracking-tight">Life Insurance Copilot</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n: NavItem) => (
              <button
                key={n.id}
                onClick={() => setRoute(n.id)}
                className={
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition " +
                  (route === n.id ? "bg-slate-900 text-white" : "hover:bg-slate-100")
                }
              >
                <n.icon className="h-4 w-4" /> {t(n.labelKey)}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelect value={lang} onChange={setLang} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
        <p className="mb-2">© {new Date().getFullYear()} Life Insurance Copilot</p>
        <p className="italic">{useI18n().t("disclaimer")}</p>
      </footer>
    </div>
  );
};

export default AppShell;
