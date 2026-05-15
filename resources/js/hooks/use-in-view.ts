import { useEffect, useState, useRef } from 'react';

export interface UseInViewOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

export function useInView(options?: UseInViewOptions) {
    const [inView, setInView] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options?.triggerOnce) {
                    observer.unobserve(entry.target);
                }
            } else if (!options?.triggerOnce) {
                setInView(false);
            }
        }, options);

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return { ref, inView };
}
