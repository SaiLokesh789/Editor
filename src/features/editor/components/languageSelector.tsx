import { Languages } from "@/features/editor/configure/defaultCodes";

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {Languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
}
