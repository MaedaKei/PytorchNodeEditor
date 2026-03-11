import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5173,//portを指定しないとデフォルトで5173になる
  },
  build:{
    rollupOptions:{
      input:"index.html",//defaultはindex.html
    }
  }
})
