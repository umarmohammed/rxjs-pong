export const gameKeyPresses = ["a", "q", "o", "l"] as const;

export type KeyPress = typeof gameKeyPresses[number];
