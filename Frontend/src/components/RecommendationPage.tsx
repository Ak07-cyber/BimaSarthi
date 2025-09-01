import React, { useState } from "react";
import { SlidersHorizontal, Loader2, Search, ShieldCheck } from "lucide-react";
import { useI18n } from "./I18nProvider";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const RecommendationPage: React.FC = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({
    age: "",
    city: "",
    income: "",
    dependents: "",
    existing: "",
    liabilities: "",
    risk: "med",
    goal: "protection",
    horizon: "20",
    liquidity: "no",
    preference: "guaranteed",
    health: "none",
    smoker: "no",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<any | null>(null);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecs(null);
    try {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
  const response = await fetch(`${apiBase}/api/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: JSON.stringify(form) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

  const data = await response.json();
  setRecs(data.recommendation);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      // Optionally, set an error state to display a message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <SlidersHorizontal className="h-6 w-6" /> {t("rec_title")}
        </h2>
        <p className="text-slate-600 mt-2">{t("rec_sub")}</p>
      </header>
      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 rounded-3xl border bg-white p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* ...fields... */}
            <Field label={t("form_age")}> <input type="number" required value={form.age} onChange={e => update("age", e.target.value)} className="input" /> </Field>
            <Field label={t("form_city")}> <input value={form.city} onChange={e => update("city", e.target.value)} className="input" /> </Field>
            <Field label={t("form_income")}> <input type="number" value={form.income} onChange={e => update("income", e.target.value)} className="input" /> </Field>
            <Field label={t("form_dependents")}> <input type="number" value={form.dependents} onChange={e => update("dependents", e.target.value)} className="input" /> </Field>
            <Field label={t("form_existing")}> <input type="number" value={form.existing} onChange={e => update("existing", e.target.value)} className="input" /> </Field>
            <Field label={t("form_liabilities")}> <input type="number" value={form.liabilities} onChange={e => update("liabilities", e.target.value)} className="input" /> </Field>
            <Field label={t("form_risk")}> <select value={form.risk} onChange={e => update("risk", e.target.value)} className="input"> <option value="low">{t("risk_low")}</option> <option value="med">{t("risk_med")}</option> <option value="high">{t("risk_high")}</option> </select> </Field>
            <Field label={t("form_goal")}> <select value={form.goal} onChange={e => update("goal", e.target.value)} className="input"> <option value="protection">{t("goal_protection")}</option> <option value="savings">{t("goal_savings")}</option> <option value="growth">{t("goal_growth")}</option> </select> </Field>
            <Field label={t("form_horizon")}> <input type="number" value={form.horizon} onChange={e => update("horizon", e.target.value)} className="input" /> </Field>
            <Field label={t("form_liquidity")}> <select value={form.liquidity} onChange={e => update("liquidity", e.target.value)} className="input"> <option value="no">No</option> <option value="yes">Yes</option> </select> </Field>
            <Field label={t("form_preference")}> <select value={form.preference} onChange={e => update("preference", e.target.value)} className="input"> <option value="guaranteed">{t("pref_guaranteed")}</option> <option value="market">{t("pref_market")}</option> </select> </Field>
            <Field label={t("form_health")}> <input value={form.health} onChange={e => update("health", e.target.value)} className="input" /> </Field>
            <Field label={t("form_smoker")}> <select value={form.smoker} onChange={e => update("smoker", e.target.value)} className="input"> <option value="no">No</option> <option value="yes">Yes</option> </select> </Field>
            <Field label={t("form_budget")}> <input type="number" value={form.budget} onChange={e => update("budget", e.target.value)} className="input" /> </Field>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "rounded-2xl bg-slate-900 text-white px-5 py-2 text-sm flex items-center gap-2",
                loading ? "opacity-70" : ""
              )}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} {t("submit_get_rec")}
            </button>
            <span className="text-xs text-slate-500">Transparent, non‑advisory output</span>
          </div>
        </form>
        <div className="rounded-3xl border bg-white p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="h-4 w-4" /> {t("results")}
          </h3>
          {/* ...recommendation results... */}
          {!loading && !recs && (<p className="text-sm text-slate-500">Fill the form to see recommendations.</p>)}
          {loading && (<div className="flex items-center gap-2 text-slate-600"><Loader2 className="h-4 w-4 animate-spin" /> Computing…</div>)}
          <div className="space-y-3">
            {recs && (
              <>
                <div className="rounded-2xl border p-4 bg-slate-50">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5" />
                    <p className="font-semibold">{recs.title}</p>
                  </div>
                  <p className="text-sm text-slate-700 mb-2"><strong>Summary:</strong> {recs.summary}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-medium text-slate-800 mb-1">Rationale</p>
                      <ul className="list-disc list-inside space-y-0.5">{recs.rationale.map((r:string,i:number)=><li key={i}>{r}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 mb-1">Suggested Coverage</p>
                      <ul className="list-disc list-inside space-y-0.5">{recs.suggestedCoverage.map((r:string,i:number)=><li key={i}>{r}</li>)}</ul>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-medium text-slate-800 mb-1">Cautions</p>
                      <ul className="list-disc list-inside space-y-0.5">{recs.cautions.map((r:string,i:number)=><li key={i}>{r}</li>)}</ul>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-500 italic">{recs.disclaimer}</p>
                </div>
                <div className="space-y-3">
                  {recs.policies?.map((p:any, i:number) => (
                    <div key={i} className="rounded-2xl border p-4 hover:shadow-sm transition bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-slate-800">{i+1}. {p.name}</p>
                          <p className="text-xs text-slate-500">{p.type} • Cover: {p.coverage} • Premium: {p.annualPremium}</p>
                        </div>
                        <span className="text-[10px] bg-slate-100 border rounded px-2 py-0.5 text-slate-600">Why: {p.why}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="font-medium text-green-600">Pros</p>
                          <ul className="list-disc list-inside space-y-0.5">{p.pros.map((x:string,j:number)=><li key={j}>{x}</li>)}</ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-600">Cons</p>
                          <ul className="list-disc list-inside space-y-0.5">{p.cons.map((x:string,j:number)=><li key={j}>{x}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <label className="block text-sm">
    <span className="font-medium text-slate-800">{label}</span>
    {children}
  </label>
);

export default RecommendationPage;
