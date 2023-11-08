const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "https://b29e-2406-d00-aaaa-bce1-860-75f2-cc1-bf23.ngrok-free.app"
  : "https://scotland-v2-git-webhook-scotlandtitles.vercel.app";
// : "https://scotland-v2.vercel.app";
