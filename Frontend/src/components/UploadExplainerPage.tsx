import React, { useState } from "react";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";
import { useI18n } from "./I18nProvider";
import LanguageSelect from "./LanguageSelect";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const UploadExplainerPage: React.FC = () => {
  const { t, lang } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState(lang);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null);

  const explain = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('targetLang', targetLang);

    try {
      const response = await fetch('http://localhost:5000/api/explain', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error explaining document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Upload className="h-6 w-6" /> {t("upload_title")}
        </h2>
        <p className="text-slate-600 mt-2">{t("upload_sub")}</p>
      </header>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className={cn(
              "rounded-3xl border border-dashed p-6 text-center bg-white",
              file ? "border-slate-300" : "border-slate-300 hover:border-slate-400"
            )}
          >
            <div className="flex flex-col items-center justify-center gap-3 py-8">
              <FileText className="h-10 w-10" />
              <p className="text-sm text-slate-600">
                <span className="font-medium">{t("choose_file")}</span> {t("or_drag")}
              </p>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={onPick} />
              {file && <p className="text-xs text-slate-500">Selected: {file.name}</p>}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm text-slate-700">{t("target_lang")}</label>
            <LanguageSelect value={targetLang} onChange={setTargetLang} />
            <button
              onClick={explain}
              disabled={!file || loading}
              className={cn(
                "rounded-2xl px-4 py-2 text-sm flex items-center gap-2",
                !file || loading ? "bg-slate-200 text-slate-500" : "bg-slate-900 text-white"
              )}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} {t("explain_btn")}
            </button>
          </div>
        </div>
        <div>
          <div className="rounded-3xl border bg-white p-5">
            <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> {t("sample_result")}
            </h3>
            <div className="space-y-3 text-sm">
              {loading && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </div>
              )}
              {!loading && result && (
                <div className="prose prose-sm whitespace-pre-wrap">{result.explanation}</div>
              )}
              {!loading && !result && (
                <p className="text-slate-500">Upload a file to see the explanation here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadExplainerPage;
