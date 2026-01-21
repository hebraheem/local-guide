import Image from "next/image";
import agreement from "../public/svg/undraw_agreement_ftet.svg";
import initTranslations from "@/src/lib/i18n/server";
import BottomNav from "@/common/BottomNav";

const Land = async () => {
  const { t } = await initTranslations();
  return <>
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-primary-600 text-2xl">{t('WELCOME_NOTE')}</h1>
        <p className="text-primary-800">{t('WELCOME_DESCRIPTION')}</p>
        <Image src={agreement} alt="agreement" width={200} height={200} />
        <div className="flex gap-2">
          {/* Example translated button/label could go here */}
        </div>
      </div>
      <BottomNav />
    </section>
  </>;
};

export default Land;
