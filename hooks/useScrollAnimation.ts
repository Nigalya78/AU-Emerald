import { useEffect, useRef, useState, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.05,
    rootMargin = '100px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return { ref, isVisible } as { ref: RefObject<T>; isVisible: boolean };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(itemCount: number, options: ScrollAnimationOptions = {}) => {
  const { ref, isVisible } = useScrollAnimation<T>(options);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = [];
      for (let index = 0; index < itemCount; index++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * 100);
        timeouts.push(timeout);
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible, itemCount]);

  return { ref, visibleItems } as { ref: RefObject<T>; visibleItems: Set<number> };
};
