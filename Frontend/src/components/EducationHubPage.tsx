import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Search, BookOpen, ChevronRight } from "lucide-react";
import { useI18n } from "./I18nProvider";

const ARTICLES = [
  {
    id: 1,
    title: "Types of life insurance (Term, Endowment, ULIP, Annuity)",
    summary: "Understand how each product works, who it’s for, pros/cons, and typical pitfalls.",
    tags: ["Basics", "Compare"],
  },
  {
    id: 2,
    title: "What agents can and cannot promise",
    summary: "Spot mis‑selling: guaranteed returns claims, bonus assumptions, and verbal promises not in brochure.",
    tags: ["Rights", "Mis‑selling"],
  },
  {
    id: 3,
    title: "Claims checklist & timelines",
    summary: "Documents you need, typical insurer SLAs, and how to avoid delays.",
    tags: ["Claims", "How‑to"],
  },
  {
    id: 4,
    title: "Free‑look, grace period & revival",
    summary: "Key timelines that protect you — when you can exit or revive without losing too much.",
    tags: ["Rules", "Timelines"],
  },
  {
    id: 5,
    title: "Understanding charges in ULIPs",
    summary: "Allocation, policy admin, mortality, fund management — what they mean and how they affect returns.",
    tags: ["ULIP", "Charges"],
  },
  {
    id: 6,
    title: "How much cover is enough?",
    summary: "A simple way to estimate sum assured and adjust for your family’s needs.",
    tags: ["Planning", "Protection"],
  },
];

const EducationHubPage: React.FC = () => {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    ARTICLES.filter((a) =>
      (a.title + " " + a.summary + " " + a.tags.join(" ")).toLowerCase().includes(q.toLowerCase())
    ),
  [q]);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-6 w-6" /> {t("learn_title")}
        </h2>
        <p className="text-slate-600 mt-2">{t("learn_sub")}</p>
      </header>
      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-[420px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full rounded-2xl border pl-9 pr-3 py-2 text-sm border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-white p-5 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="h-3.5 w-3.5" /> {a.tags.join(" • ")}
            </div>
            <h3 className="mt-2 font-semibold text-slate-800">{a.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{a.summary}</p>
            <button className="mt-3 inline-flex items-center gap-1 text-sm text-slate-900 hover:underline">
              {t("view_article")} <ChevronRight className="h-4 w-4" />
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default EducationHubPage;
