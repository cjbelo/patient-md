export const sleep = (min = 500, max = 1500) =>
  new Promise<void>((r) => setTimeout(r, Math.floor(min + Math.random() * (max - min))));
