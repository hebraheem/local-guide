"use client";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

export enum Proficiency {
  BASIC = "BASIC",
  CONVERSATIONAL = "CONVERSATIONAL",
  FLUENT = "FLUENT",
  NATIVE = "NATIVE",
}

export interface Language {
  name: string;
  proficiency: Proficiency;
}

interface LanguageInputProps {
  label: string;
  name: string;
  placeholder: string;
  values: Language[];
  onValuesChange: (values: Language[]) => void;
  addButtonLabel?: string;
}

export default function LanguageInput({
  label,
  name,
  placeholder,
  values,
  onValuesChange,
  addButtonLabel = "ADD",
}: LanguageInputProps) {
  const { t } = useTranslation();
  const [languageName, setLanguageName] = useState("");
  const [proficiency, setProficiency] = useState<Proficiency>(
    Proficiency.FLUENT
  );

  const proficiencyOptions = [
    { value: Proficiency.BASIC, label: "BASIC" },
    { value: Proficiency.CONVERSATIONAL, label: "CONVERSATIONAL" },
    { value: Proficiency.FLUENT, label: "FLUENT" },
    { value: Proficiency.NATIVE, label: "NATIVE" },
  ];

  const addLanguage = () => {
    if (
      languageName.trim() &&
      !values.some((lang) => lang.name === languageName.trim())
    ) {
      onValuesChange([
        ...values,
        { name: languageName.trim(), proficiency },
      ]);
      setLanguageName("");
      setProficiency(Proficiency.BASIC);
    }
  };

  const removeLanguage = (languageName: string) => {
    onValuesChange(values.filter((lang) => lang.name !== languageName));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t(label)}
      </label>
      <div className="flex gap-2 flex-col md:flex-row">
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="dark:text-primary-800 flex-1 focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-3 text-sm"
          placeholder={t(placeholder)}
        />
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value as Proficiency)}
          className="dark:text-primary-800 focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-3 text-sm"
        >
          {proficiencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addLanguage}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all"
        >
          {t(addButtonLabel)}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((language, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-primary-100 dark:bg-primary-800 rounded-lg"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {language.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              ({t(language.proficiency)})
            </span>
            <button
              type="button"
              onClick={() => removeLanguage(language.name)}
              className="text-red-600 hover:text-red-800 font-bold text-lg leading-none p-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* Hidden inputs for form submission */}
      {values.map((language, index) => (
        <div key={index}>
          <input
            type="hidden"
            name={`${name}[${index}][name]`}
            value={language.name}
          />
          <input
            type="hidden"
            name={`${name}[${index}][proficiency]`}
            value={language.proficiency}
          />
          <input
            type="hidden"
            name={`${name}[]`}
            value={JSON.stringify(values[index])}
          />
        </div>
      ))}
    </div>
  );
}
