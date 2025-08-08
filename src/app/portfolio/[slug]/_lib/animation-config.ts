// Centralized animation configuration for consistent timing and easing
export const animationConfig = {
  // Easing functions - using string notation that framer-motion accepts
  easing: {
    smooth: "easeInOut", // Smooth easing for most animations
    spring: "easeOut", // Spring-like effect for interactive elements
    gentle: "easeOut", // Gentle easing for subtle animations
    sharp: "easeInOut", // Sharp easing for quick transitions
  },

  // Duration presets
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    slower: 1.2,
  },

  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },

  // Common animation variants
  variants: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
  },
}

// Animation presets for common use cases
export const createStaggerContainer = (staggerDelay = animationConfig.stagger.normal) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export const createFadeInUpTransition = (delay = 0, duration = animationConfig.duration.normal) => ({
  ...animationConfig.variants.fadeInUp,
  transition: {
    duration,
    delay,
  },
})
