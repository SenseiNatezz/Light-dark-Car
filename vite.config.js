import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Honor the harness-assigned port (PORT env) when present; otherwise use a
    // dedicated port (NOT Vite's 5173 default, which collides with other servers).
    port: process.env.PORT ? Number(process.env.PORT) : 5181,
  },
})
