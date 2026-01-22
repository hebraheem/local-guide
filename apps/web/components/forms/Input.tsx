"use client";
import React, { useRef, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

interface InputProps {
  label: string;
  name: string;
  className?: string;
  type?: string;
}

const Input = ({
  className = "",
  type,
  name,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputProps) => {
  const [inputType, setInputType] = useState(type);
  const [, force] = useState(0);
  const [error, setError] = useState(false);
  const visited = useRef(false);
  const { t } = useTranslation();
  className +=
    "dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm";

  if (type === "password") className += " rounded-tr-0 rounded-br-0";

  const handleBlur = () => {
    const input = document.getElementById(`${name}-input`) as HTMLInputElement;
    if (
      !visited.current &&
      props.required &&
      !input.value.trim() &&
      input.value !== "0"
    ) {
      visited.current = true;
      force((v) => v + 1); // one re-render only
    } else {
      visited.current = false;
    }
    setError(visited.current);
  };

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label id={`${name}-label`} htmlFor={`${name}-input`}>
        {t(props.label)}
      </label>
      <div className="flex flex-row items-center relative bg-primary-100 dark:text-primary-800 rounded-xl">
        <input
          type={inputType || "text"}
          id={`${name}-input`}
          className={className}
          onBlur={handleBlur}
          aria-labelledby={`${name}-label`}
          placeholder={t(props.placeholder ?? "")}
          {...props}
        />
        <button
          type="button"
          role="button"
          aria-label="Show password"
          onClick={() => {
            setInputType((prev) => (prev === "password" ? "text" : "password"));
          }}
          className={`${type === "password" ? "" : "hidden"} px-4 py-4`}
        >
          <span className="material-symbols-outlined bg-primary-100 dark:text-primary-800">
            {inputType !== "password" ? "visibility" : "visibility_off"}
          </span>
        </button>
      </div>
      <small className={`text-red-600 ${error ? "" : "hidden"} capitalize`}>
        {name} {t("IS_REQUIRED")}
      </small>
    </div>
  );
};
export default Input;
