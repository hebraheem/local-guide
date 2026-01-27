"use client";
import { Activity, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

interface TagInputProps {
  label: string;
  name: string;
  placeholder: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  addButtonLabel?: string;
}

export default function TagInput({
  label,
  name,
  placeholder,
  values,
  onValuesChange,
  addButtonLabel = "ADD",
}: TagInputProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  values = values.filter(val => val !== "[]")

  const addValue = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onValuesChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeValue = (valueToRemove: string) => {
    onValuesChange(values.filter((value) => value !== valueToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t(label)}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="dark:text-primary-800 flex-1 focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-3 text-sm"
          placeholder={t(placeholder)}
        />
        <button
          type="button"
          onClick={addValue}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all"
        >
          {t(addButtonLabel)}
        </button>
      </div>
      <Activity mode={values?.length ? "visible" : "hidden"}>
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 bg-primary-100 dark:bg-primary-800 rounded-lg"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {value}
              </span>
              <button
                type="button"
                onClick={() => removeValue(value)}
                className="text-red-600 hover:text-red-800 font-bold text-lg leading-none p-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Activity>

      {/* Hidden inputs for form submission */}
      {values.map((value, index) => (
        <input key={index} type="hidden" name={`${name}[]`} value={value} />
      ))}
    </div>
  );
}
