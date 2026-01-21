import Image from "next/image";

type Props = {
  name: string;
  role: string;
  city: string;
  rating?: number;
  avatarSrc?: string;
};

export default function HelperCard({ name, role, city, rating = 4.8, avatarSrc = "/svg/undraw_agreement_ftet.svg" }: Props) {
  return (
    <div className="rounded-2xl bg-white border border-primary-100 shadow-sm p-3 flex gap-3">
      <div className="h-12 w-12 rounded-xl overflow-hidden bg-primary-100 flex items-center justify-center">
        <Image src={avatarSrc} alt={name} width={48} height={48} className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-navy-800 truncate">{name}</p>
          <span className="inline-flex items-center gap-1 text-[12px] text-yellow-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z"/></svg>
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-primary-700">{role}, {city}</p>
      </div>
    </div>
  );
}
