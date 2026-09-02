import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/recovery-college-sandbox/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        calendar: resolve(__dirname, 'src/calendar.html'),
        news: resolve(__dirname, 'src/news.html'),
        meetTheTeam: resolve(__dirname, 'src/meet-the-team.html'),
        workshops: resolve(__dirname, 'src/workshops.html'),
      },
    },
  },
})