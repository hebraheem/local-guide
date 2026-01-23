"use client";
import React, { useRef, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

interface TextareaProps {
  label: string;
  name: string;
  className?: string;
  rows?: number;
}

const Textarea = ({
  className = "",
  name,
  rows = 4,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  TextareaProps) => {
  const [, force] = useState(0);
  const [error, setError] = useState(false);
  const visited = useRef(false);
  const { t } = useTranslation();
  className +=
    " dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm resize-none";

  const handleBlur = () => {
    const textarea = document.getElementById(`${name}-textarea`) as HTMLTextAreaElement;
    if (
      !visited.current &&
      props.required &&
      !textarea.value.trim()
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
      <label id={`${name}-label`} htmlFor={`${name}-textarea`}>
        {t(props.label)}
      </label>
      <textarea
        id={`${name}-textarea`}
        name={name}
        rows={rows}
        className={className}
        onBlur={handleBlur}
        aria-labelledby={`${name}-label`}
        placeholder={t(props.placeholder ?? "")}
        {...props}
      />
      <small className={`text-red-600 ${error ? "" : "hidden"} capitalize`}>
        {name} {t("IS_REQUIRED")}
      </small>
    </div>
  );
};

export default Textarea;
