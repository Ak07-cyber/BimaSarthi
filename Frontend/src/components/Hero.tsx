import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Languages, SlidersHorizontal, GraduationCap } from "lucide-react";
import { useI18n } from "./I18nProvider";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { t } = useI18n();
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
        >
          {t("hero_title")}
        </motion.h1>
        <p className="mt-4 text-slate-600 md:text-lg">{t("hero_sub")}</p>
        <ul className="mt-6 space-y-2 text-slate-700">
          {["hero_points_1", "hero_points_2", "hero_points_3", "hero_points_4"].map((k) => (
            <li key={k} className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> {t(k)}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3">
          <button
            onClick={onGetStarted}
            className="rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm md:text-base shadow-sm hover:shadow-md transition"
          >
            {t("cta_get_started")}
          </button>
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm md:text-base hover:bg-slate-50"
          >
            {t("nav_learn")}
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <MiniCard icon={FileText} title={t("hero_points_1")} sub="PDF, PNG, DOCX" />
            <MiniCard icon={Languages} title={t("hero_points_2")} sub="English • हिन्दी • বাংলা • தமிழ்" />
            <MiniCard icon={SlidersHorizontal} title={t("hero_points_3")} sub="Transparent trade‑offs" />
            <MiniCard icon={GraduationCap} title={t("hero_points_4")} sub="Quizzes & glossaries" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface MiniCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}
const MiniCard: React.FC<MiniCardProps> = ({ icon: Icon, title, sub }) => (
  <div className="rounded-2xl border bg-white p-4 hover:shadow-sm transition">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <p className="font-medium">{title}</p>
    </div>
    <p className="text-xs text-slate-500 mt-1">{sub}</p>
  </div>
);

export default Hero;
