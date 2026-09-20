// One shared set of timing values so every transition in the site feels
// like it belongs to the same hand, rather than each component picking
// its own duration and easing.

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  hover: 0.18, // button / card hover states
  scene: 0.5, // scene and content crossfades
  petal: 1.1, // petal-fall burst
};

export const IDLE_LOOP = {
  duration: 6,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;
