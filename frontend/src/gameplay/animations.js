export const reelSpinVariants = {
  idle: { y: 0 },
  spinning: (i) => ({
    y: [0, -300, 0],
    transition: {
      repeat: Infinity,
      duration: 0.15 + i * 0.05,
      ease: 'linear',
    },
  }),
  stop: () => ({
    y: [ -50, 0 ],
    transition: {
      duration: 0.3,
      ease: 'backOut',
    },
  }),
};

export const symbolWinVariants = {
  idle: { scale: 1 },
  win: {
    scale: [1, 1.2, 1],
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};
