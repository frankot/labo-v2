export interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

export interface FadeInViewProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
  rootMargin?: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}
