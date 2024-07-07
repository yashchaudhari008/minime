import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	base: `${process.env.BASE_URL || "/"}`,
	plugins: [react()],
});
