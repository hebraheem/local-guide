import LandingHeaderClient from "./LandingHeaderClient";
import { getTranslations } from "next-intl/server";

const LandingHeader = async () => {
  const t = await getTranslations();

  return (
    <LandingHeaderClient
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
