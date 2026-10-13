import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_LOCK_FALLBACK_MS = 1500;

export const useActiveSection = (ids: string[], homeId: string) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollLockRef = useRef(false);

  const select = useCallback(
    (id: string) => setActiveId(id === homeId ? null : id),
    [homeId],
  );

  const goTo = useCallback(
    (id: string) => {
      select(id);
      scrollLockRef.current = true;
      let timeout = 0;
      const unlock = () => {
        scrollLockRef.current = false;
        window.clearTimeout(timeout);
        window.removeEventListener("scrollend", unlock);
      };
      window.addEventListener("scrollend", unlock);
      timeout = window.setTimeout(unlock, SCROLL_LOCK_FALLBACK_MS);
    },
    [select],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) select(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    [homeId, ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, homeId, select]);

  return { activeId, goTo };
};
