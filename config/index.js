const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "https://e47a-182-176-179-27.ngrok-free.app"
  : "https://scotland-v2.vercel.app";
