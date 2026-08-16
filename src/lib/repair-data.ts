// This file can be used for constants and utility functions related to repair data

export const DEVICE_TYPES = {
  LAPTOP: "laptop",
  DESKTOP: "desktop",
} as const;

export const CATEGORIES = {
  HARDWARE: "hardware",
  SOFTWARE: "software",
  CLEANING: "cleaning",
  UPGRADES: "upgrades",
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export const TROUBLESHOOTING_TYPES = {
  POWER: "power",
  PERFORMANCE: "performance",
  DISPLAY: "display",
} as const;

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case DIFFICULTY_LEVELS.EASY:
      return "bg-success-50 text-success-600";
    case DIFFICULTY_LEVELS.MEDIUM:
      return "bg-warning-50 text-warning-700";
    case DIFFICULTY_LEVELS.HARD:
      return "bg-danger-50 text-danger-700";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

export const formatViewCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case CATEGORIES.HARDWARE:
      return "memory";
    case CATEGORIES.SOFTWARE:
      return "code";
    case CATEGORIES.CLEANING:
      return "cleaning_services";
    case CATEGORIES.UPGRADES:
      return "upgrade";
    default:
      return "build";
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case CATEGORIES.HARDWARE:
      return "text-primary-700";
    case CATEGORIES.SOFTWARE:
      return "text-success-600";
    case CATEGORIES.CLEANING:
      return "text-warning-700";
    case CATEGORIES.UPGRADES:
      return "text-purple-600";
    default:
      return "text-gray-600";
  }
};
