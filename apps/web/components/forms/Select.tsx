"use client";
import React, { useRef, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

interface SelectProps {
  label: string;
  name: string;
  className?: string;
  options: { value: string; label: string }[];
}

const Select = ({
  className = "",
  name,
  options,
  ...props
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  SelectProps) => {
  const [, force] = useState(0);
  const [error, setError] = useState(false);
  const visited = useRef(false);
  const { t } = useTranslation();
  className +=
    " dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm";

  const handleBlur = () => {
    const select = document.getElementById(`${name}-select`) as HTMLSelectElement;
    if (
      !visited.current &&
      props.required &&
      !select.value.trim()
    ) {
      visited.current = true;
      force((v) => v + 1);
    } else {
      visited.current = false;
    }
    setError(visited.current);
  };

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label id={`${name}-label`} htmlFor={`${name}-select`}>
        {t(props.label)}
      </label>
      <select
        id={`${name}-select`}
        name={name}
        className={className}
        onBlur={handleBlur}
        aria-labelledby={`${name}-label`}
        {...props}
      >
        <option value="">{t("SELECT_OPTION")}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      <small className={`text-red-600 ${error ? "" : "hidden"} capitalize`}>
        {name} {t("IS_REQUIRED")}
      </small>
    </div>
  );
};

export default Select;
