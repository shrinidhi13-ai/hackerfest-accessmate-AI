
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000";

const TEXT = {
  en: {
    welcome: "Welcome to AccessMate AI",
    intro: "Understand notices, forms, signs, and documents in your language.",
    choose: "Choose your preferred language",
    continue: "Continue",
    heading: "Understand your document",
    description: "Upload a clear photo of a notice, form, sign, or menu.",
    upload: "Choose an image",
    analyze: "Explain my document",
    analyzing: "Reading and translating your document...",
    summary: "Simple explanation",
    important: "Important information",
    instructions: "Instructions",
    steps: "What you need to do",
    dates: "Dates",
    times: "Times",
    locations: "Locations",
    warnings: "Warnings",
    language: "Preferred language",
    translate: "Translate explanation",
    listen: "Listen",
    stop: "Stop",
    change: "Change language",
    error: "Something went wrong. Please try again.",
    noImage: "Please choose an image first.",
    noResult: "Your explanation will appear here.",
    translationError: "Translation failed. Showing the original analysis.",
    voiceMissing: "No matching voice is installed. Install a voice for this language on your device.",
    audioUnsupported: "Speech is not supported by this browser.",
    audioError: "Audio playback failed. Try another browser or device.",
    loadingLanguages: "Loading languages...",
  },
  kn: {
    welcome: "AccessMate AI ಗೆ ಸ್ವಾಗತ",
    intro: "ಸೂಚನೆಗಳು, ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    choose: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    heading: "ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    description: "ಸೂಚನೆ, ಫಾರ್ಮ್, ಫಲಕ ಅಥವಾ ಮೆನುವಿನ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    upload: "ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    analyze: "ನನ್ನ ದಾಖಲೆಯನ್ನು ವಿವರಿಸಿ",
    analyzing: "ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಓದಿ ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
    summary: "ಸರಳ ವಿವರಣೆ",
    important: "ಪ್ರಮುಖ ಮಾಹಿತಿ",
    instructions: "ಸೂಚನೆಗಳು",
    steps: "ನೀವು ಮಾಡಬೇಕಾದ ಕೆಲಸಗಳು",
    dates: "ದಿನಾಂಕಗಳು",
    times: "ಸಮಯಗಳು",
    locations: "ಸ್ಥಳಗಳು",
    warnings: "ಎಚ್ಚರಿಕೆಗಳು",
    language: "ಆದ್ಯತೆಯ ಭಾಷೆ",
    translate: "ವಿವರಣೆಯನ್ನು ಅನುವಾದಿಸಿ",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    change: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
    error: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noImage: "ಮೊದಲು ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    noResult: "ನಿಮ್ಮ ವಿವರಣೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
    translationError: "ಅನುವಾದ ವಿಫಲವಾಗಿದೆ. ಮೂಲ ವಿಶ್ಲೇಷಣೆಯನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    voiceMissing: "ಈ ಭಾಷೆಯ ಧ್ವನಿ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ.",
    audioUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯವಿಲ್ಲ.",
    audioError: "ಧ್ವನಿ ಪ್ಲೇ ಆಗಲಿಲ್ಲ. ಬೇರೆ ಬ್ರೌಸರ್ ಅಥವಾ ಸಾಧನವನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
    loadingLanguages: "ಭಾಷೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
  },
  hi: {
    welcome: "AccessMate AI में आपका स्वागत है",
    intro: "सूचनाओं, फ़ॉर्म और दस्तावेज़ों को अपनी भाषा में समझें।",
    choose: "अपनी पसंदीदा भाषा चुनें",
    continue: "आगे बढ़ें",
    heading: "अपने दस्तावेज़ को समझें",
    description: "सूचना, फ़ॉर्म, संकेत या मेनू की साफ़ तस्वीर अपलोड करें।",
    upload: "तस्वीर चुनें",
    analyze: "मेरा दस्तावेज़ समझाएँ",
    analyzing: "दस्तावेज़ पढ़ा और अनुवाद किया जा रहा है...",
    summary: "सरल व्याख्या",
    important: "महत्वपूर्ण जानकारी",
    instructions: "निर्देश",
    steps: "आपको क्या करना है",
    dates: "तारीखें",
    times: "समय",
    locations: "स्थान",
    warnings: "चेतावनियाँ",
    language: "पसंदीदा भाषा",
    translate: "व्याख्या का अनुवाद करें",
    listen: "सुनें",
    stop: "रोकें",
    change: "भाषा बदलें",
    error: "कुछ गलत हुआ। कृपया फिर कोशिश करें।",
    noImage: "पहले एक तस्वीर चुनें।",
    noResult: "आपकी व्याख्या यहाँ दिखाई देगी।",
    translationError: "अनुवाद विफल हुआ। मूल विश्लेषण दिखाया जा रहा है।",
    voiceMissing: "इस भाषा की आवाज़ आपके डिवाइस पर उपलब्ध नहीं है।",
    audioUnsupported: "इस ब्राउज़र में वाक् सुविधा उपलब्ध नहीं है।",
    audioError: "ऑडियो नहीं चल पाया। दूसरा ब्राउज़र या डिवाइस आज़माएँ।",
    loadingLanguages: "भाषाएँ लोड हो रही हैं...",
  },
};

const VOICE_LOCALES = {
  en: ["en-IN", "en-US", "en-GB"],
  kn: ["kn-IN"],
  hi: ["hi-IN"],
  ta: ["ta-IN"],
  te: ["te-IN"],
  ml: ["ml-IN"],
  bn: ["bn-IN"],
  mr: ["mr-IN"],
  gu: ["gu-IN"],
  pa: ["pa-IN"],
  or: ["or-IN"],
  ur: ["ur-IN"],
  as: ["as-IN"],
  ne: ["ne-NP", "ne-IN"],
  sa: ["sa-IN", "hi-IN"],
};

function App() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(
    sessionStorage.getItem("accessmateLanguage") || "en"
  );
  const [screen, setScreen] = useState(
    sessionStorage.getItem("accessmateLanguage") ? "home" : "welcome"
  );
  const [image, setImage] = useState(null);
  const [originalAnalysis, setOriginalAnalysis] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  const t = TEXT[language] || TEXT.en;

  useEffect(() => {
    let active = true;

    fetch(`${API}/api/languages`)
      .then((response) => {
        if (!response.ok) throw new Error("Language request failed");
        return response.json();
      })
      .then((data) => {
        if (active) setLanguages(data.languages || []);
      })
      .catch(() => {
        if (active) setError("Could not load languages. Check the backend.");
      });

    return () => {
      active = false;
    };
  }, []);

  // Browser voices may load asynchronously.
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  function enterHome() {
    sessionStorage.setItem("accessmateLanguage", language);

    const selected = languages.find((item) => item.code === language);
    if (selected) {
      sessionStorage.setItem("accessmateLanguageName", selected.name);
    }

    setScreen("home");
    setError("");
  }

  async function changeLanguage(event) {
    const code = event.target.value;
    setLanguage(code);
    sessionStorage.setItem("accessmateLanguage", code);

    const selected = languages.find((item) => item.code === code);
    if (selected) {
      sessionStorage.setItem("accessmateLanguageName", selected.name);
    }

    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setError("");
    setNotice("");

    // If a document has already been analyzed, translate it again.
    if (originalAnalysis) {
      await translateAnalysis(originalAnalysis, code);
    }
  }

  async function translateAnalysis(analysis, targetCode) {
    const target = languages.find((item) => item.code === targetCode);

    if (!target) {
      setResult(analysis);
      setNotice("The selected language is not in the backend language list.");
      return;
    }

    // English analysis is already in the requested language.
    if (targetCode === "en") {
      setResult(analysis);
      setNotice("");
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: analysis,
          target_language: target.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Translation request failed.");
      }

      // Preserve the original extraction for future language changes.
      // Replace the user-facing explanation with the translated content.
      setResult({
        ...analysis,
        document_type: analysis.document_type,
        simple_summary: data.translated_summary,
        important_information: data.translated_important_information,
        instructions: data.translated_instructions,
        steps: data.translated_steps,
      });

      setNotice("");
    } catch (err) {
      setResult(analysis);
      setNotice(`${t.translationError} ${err.message || ""}`);
    } finally {
      setBusy(false);
    }
  }

  async function analyzeDocument() {
    if (!image) {
      setError(t.noImage);
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");
    setOriginalAnalysis(null);
    setResult(null);
    window.speechSynthesis?.cancel();
    setSpeaking(false);

    try {
      const body = new FormData();
      body.append("image", image);

      const response = await fetch(`${API}/api/analyze`, {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || t.error);
      }

      setOriginalAnalysis(data);

      // Automatically translate the explanation to the selected language.
      await translateAnalysis(data, language);
    } catch (err) {
      setError(err.message || t.error);
    } finally {
      setBusy(false);
    }
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }

  function speak(text) {
    if (!text?.trim()) return;

    if (!("speechSynthesis" in window)) {
      setError(t.audioUnsupported);
      return;
    }

    stopSpeech();
    setError("");

    const preferredLocales = VOICE_LOCALES[language] || [language];
    const languagePrefix = `${language.toLowerCase()}-`;

    // Never silently speak Kannada/Hindi text using an English voice.
    const voice = preferredLocales
      .map((locale) =>
        voices.find((item) =>
          item.lang.toLowerCase() === locale.toLowerCase()
        )
      )
      .find(Boolean) || voices.find((item) =>
        item.lang.toLowerCase().startsWith(languagePrefix)
      );

    if (!voice) {
      setError(t.voiceMissing);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setError(t.audioError);
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function goBackToLanguage() {
    stopSpeech();
    setScreen("welcome");
    setError("");
    setNotice("");
  }

  function speakAllResults() {
    if (!result) return;

    const parts = [
      result.simple_summary,
      ...(result.important_information || []),
      ...(result.instructions || []),
      ...(result.steps || []),
      ...(result.dates || []).map((item) =>
        `${item.text}. ${item.purpose}`
      ),
      ...(result.times || []).map((item) =>
        `${item.text}. ${item.purpose}`
      ),
      ...(result.locations || []),
      ...(result.warnings || []),
    ];

    speak(parts.filter(Boolean).join(". "));
  }

  if (screen === "welcome") {
    return (
      <main className="welcome-page">
        <section className="welcome-card">
          <div className="brand-icon" aria-hidden="true">✨</div>
          <p className="eyebrow">ACCESSMATE AI</p>
          <h1>{t.welcome}</h1>
          <p className="intro">{t.intro}</p>

          <label htmlFor="language">{t.choose}</label>
          <select
            id="language"
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
              setError("");
            }}
          >
            {(languages.length ? languages : [
              { name: "English", code: "en" },
              { name: "Kannada", code: "kn" },
              { name: "Hindi", code: "hi" },
            ]).map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>

          {error && <p className="error-message" role="alert">{error}</p>}

          <button
            className="continue-button"
            onClick={enterHome}
          >
            {t.continue}
          </button>

          <p className="privacy-note">
            AccessMate AI · Your accessibility companion
          </p>
        </section>
      </main>
    );
  }

  const sections = [
    [t.important, result?.important_information],
    [t.instructions, result?.instructions],
    [t.steps, result?.steps],
    [
      t.dates,
      (result?.dates || []).map((item) =>
        `${item.text} — ${item.purpose}`
      ),
    ],
    [
      t.times,
      (result?.times || []).map((item) =>
        `${item.text} — ${item.purpose}`
      ),
    ],
    [t.locations, result?.locations],
    [t.warnings, result?.warnings],
  ];

  return (
    <main className="app-page">
      <header className="app-header">
        <div>
          <p className="eyebrow">ACCESSMATE AI</p>
          <h1>{t.heading}</h1>
        </div>

        <button className="secondary-button" onClick={goBackToLanguage}>
          {t.change}
        </button>
      </header>

      <section className="upload-card">
        <p>{t.description}</p>

        <label className="file-picker">
          <span>📄 {t.upload}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              setImage(event.target.files?.[0] || null);
              setOriginalAnalysis(null);
              setResult(null);
              setError("");
              setNotice("");
            }}
          />
        </label>

        {image && <p className="file-name">{image.name}</p>}

        <button
          className="continue-button"
          onClick={analyzeDocument}
          disabled={busy || !image}
        >
          {busy ? t.analyzing : t.analyze}
        </button>
      </section>

      {error && <p className="error-message" role="alert">{error}</p>}
      {notice && <p className="error-message" role="status">{notice}</p>}

      <section className="result-card" aria-live="polite">
        {!result ? (
          <p className="empty-state">
            {busy ? t.analyzing : t.noResult}
          </p>
        ) : (
          <>
            <div className="result-heading">
              <h2>{t.summary}</h2>
              <div>
                <button
                  className="secondary-button"
                  onClick={speakAllResults}
                  disabled={busy}
                >
                  🔊 {t.listen}
                </button>
                {speaking && (
                  <button className="text-button" onClick={stopSpeech}>
                    {t.stop}
                  </button>
                )}
              </div>
            </div>

            <p className="summary-text">{result.simple_summary}</p>

            {sections.map(([heading, items]) =>
              items?.length ? (
                <div className="result-section" key={heading}>
                  <h3>{heading}</h3>
                  <ul>
                    {items.map((item, index) => (
                      <li key={`${heading}-${index}`}>{item}</li>
                    ))}
                  </ul>
                  <button
                    className="text-button"
                    onClick={() => speak(items.join(". "))}
                  >
                    🔊 {t.listen}
                  </button>
                </div>
              ) : null
            )}

            <div className="translation-actions">
              <label htmlFor="result-language">{t.language}</label>
              <select
                id="result-language"
                value={language}
                onChange={changeLanguage}
                disabled={busy}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>

              <button
                className="continue-button"
                onClick={() => originalAnalysis && translateAnalysis(originalAnalysis, language)}
                disabled={busy || !originalAnalysis}
              >
                {busy ? t.analyzing : t.translate}
              </button>
            </div>
          </>
        )}
      </section>

      <footer>AccessMate AI · Understand information with confidence</footer>
    </main>
  );
}

export default App;
