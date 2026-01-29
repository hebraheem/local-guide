import LandingHeaderClient from "./LandingHeaderClient";
import { getTheme } from "@/lib/theme/detect";
import { getTranslations } from "next-intl/server";

const LandingHeader = async () => {
  const theme = await getTheme();
  const t = await getTranslations();

  return (
    <LandingHeaderClient
      theme={theme}
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
