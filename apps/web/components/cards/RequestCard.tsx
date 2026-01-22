import Image from "next/image";

type Props = {
  title: string;
  category: string;
  location: string;
  postedBy: string;
  postedTime: string;
  avatarSrc?: string;
  urgent?: boolean;
};

export default function RequestCard({ 
  title, 
  category, 
  location, 
  postedBy, 
  postedTime, 
  avatarSrc = "/svg/undraw_agreement_ftet.svg",
  urgent = false 
}: Props) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-xl overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
          <Image src={avatarSrc} alt={postedBy} width={48} height={48} className="object-cover" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
              {title}
            </h3>
            {urgent && (
              <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-semibold rounded-full">
                URGENT
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              📍 {location}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>by {postedBy}</span>
            <span>{postedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
