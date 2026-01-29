import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  loadMore: () => void,
  hasMore?: boolean,
  isLoading?: boolean,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "50px" },
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return ref;
};
