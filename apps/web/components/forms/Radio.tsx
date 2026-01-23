"use client";
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface RadioProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
}

const Radio = ({
  className = "",
  name,
  options,
  ...props
}: Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> &
  RadioProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t(props.label)}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              className={`h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 ${className}`}
              {...props}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {t(option.label)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
