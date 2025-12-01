import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['public-items-trade.loca.lt', 'ebdib-122-172-87-107.a.free.pinggy.link']
  }
})
