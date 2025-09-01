import { useState } from "react";
import { I18nProvider as I18nContextProvider } from "./components/I18nProvider";
import AppShell from "./components/AppShell";
import Hero from "./components/Hero";
import UploadExplainerPage from "./components/UploadExplainerPage";
import LanguagesPage from "./components/LanguagesPage";
import RecommendationPage from "./components/RecommendationPage";
import EducationHubPage from "./components/EducationHubPage";
import { Upload, Languages, GraduationCap, Home as HomeIcon, SlidersHorizontal } from "lucide-react";

const NAV = [
  { id: "home", icon: HomeIcon, labelKey: "nav_home" },
  { id: "upload", icon: Upload, labelKey: "nav_upload" },
  { id: "language", icon: Languages, labelKey: "nav_language" },
  { id: "recommend", icon: SlidersHorizontal, labelKey: "nav_recommend" },
  { id: "learn", icon: GraduationCap, labelKey: "nav_learn" },
];

const translations = {
  ta: {
    upload_title: "காப்பீட்டை பதிவேற்றி எளிய விளக்கம்",
    upload_sub: "முக்கிய விவரங்கள், நன்மை‑குறைபாடுகள் மற்றும் பக்கம் குறிப்புகள்.",
    choose_file: "கோப்பு தேர்வு",
    or_drag: "அல்லது இழுத்து விடவும்",
    target_lang: "இலக்கு மொழி",
    explain_btn: "விளக்கவும்",
    sample_result: "மாதிரி சுருக்கம் (மொக்)",
    speaking: "வாசிக்கிறது…",
    speak: "ஒலி",
    lang_title: "மொழிகள் & உள்ளூர்மயம்",
    lang_sub: "இன்டர்ஃபேஸ் மொழியை மாற்றுங்கள்.",
    lang_choose: "உங்கள் மொழியை தேர்ந்தெடுங்கள்",
    lang_tip: "குறிப்பு: பின்னர் இன்னும் மொழிகள் சேர்க்கலாம்.",
    rec_title: "தனிப்பட்ட பரிந்துரைகள்",
    rec_sub: "சில விவரங்களைத் தெரிவிக்கவும். தெளிவான விருப்பங்களை நாங்கள் தருகிறோம்.",
    form_age: "வயது",
    form_city: "நகரம்/மாநிலம்",
    form_income: "மாத வருமானம் (₹)",
    form_dependents: "பாதுகாவலர்கள்",
    form_existing: "தற்போதைய கவர் (₹)",
    form_liabilities: "பாக்கிகள் (₹)",
    form_risk: "அபாய சகிப்பு",
    risk_low: "குறைவு",
    risk_med: "நடுத்தரம்",
    risk_high: "உயர்",
    form_goal: "முதன்மை குறிக்கோள்",
    goal_protection: "பாதுகாப்பு",
    goal_savings: "சேமிப்பு/உத்தரவாதம்",
    goal_growth: "நீண்டகால வளர்ச்சி",
    form_horizon: "கால வரம்பு (ஆண்டு)",
    form_liquidity: "5 ஆண்டுக்கு முன் பணம் தேவைப்படுமா?",
    form_preference: "விருப்பம்",
    pref_guaranteed: "உத்தரவாதம்",
    pref_market: "சந்தை‑இணைப்பு",
    form_health: "உடல் நலம்",
    form_smoker: "புகைப்பவர்",
    form_budget: "மாத செலவு (₹)",
    submit_get_rec: "பரிந்துரைகள்",
    results: "விளைவுகள்",
    why: "ஏன்?",
    learn_title: "கல்வி மையம்",
    learn_sub: "எளிய மொழியில் கட்டுரைகள்.",
    search_placeholder: "தலைப்புகள் தேட…",
    view_article: "மேலும்",
    disclaimer: "இது கல்வி நோக்கத்திற்கானது; நிதி ஆலோசனை அல்ல.",
  },
};

export default function App() {
  const [route, setRoute] = useState("home");

  console.log(translations);

  return (
    <I18nContextProvider>
      <AppShell route={route} setRoute={setRoute} nav={NAV}>
        {route === "home" && <Hero onGetStarted={() => setRoute("upload")} />}
        {route === "upload" && <UploadExplainerPage />}
        {route === "language" && <LanguagesPage />}
        {route === "recommend" && <RecommendationPage />}
        {route === "learn" && <EducationHubPage />}
      </AppShell>
    </I18nContextProvider>
  );
}