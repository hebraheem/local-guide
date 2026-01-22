import { getLocale } from "@/src/lib/i18n/detect";
import initTranslations from "@/src/lib/i18n/server";
import LandingHeaderClient from "./LandingHeaderClient";

const LandingHeader = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations();

  return (
    <LandingHeaderClient
      locale={locale}
      translations={{
        howItWorks: t("HOW_IT_WORKS"),
        safety: t("FOOTER_SAFETY"),
        about: t("FOOTER_ABOUT"),
        login: t("LOGIN"),
        signUp: t("SIGN_UP"),
      }}
    />
  );
};

export default LandingHeader;
