import Image from "next/image";
import agreement from "../public/svg/undraw_agreement_ftet.svg";
import initTranslations from "@/src/lib/i18n/server";

import ActionButtons from "@/components/ActionButtons";

const Land = async () => {
  const { t } = await initTranslations();
  return (
    <div className="min-h-dvh bg-brand-bg text-brand-text dark:bg-brand-bg-dark dark:text-brand-text-dark">
      <section
        className={`flex flex-col items-center justify-center h-[calc(100vh-var(--header-h))]`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold">{t("WELCOME_NOTE")}</h1>
          <p>{t("WELCOME_DESCRIPTION")}</p>
          <Image src={agreement} alt="agreement" width={300} loading="eager" />
          <div className="flex gap-2"></div>
        </div>
        <ActionButtons />
      </section>
    </div>
  );
};

export default Land;
