import { defineConfig } from 'vite'
import { rnw } from "vite-plugin-rnw";

// https://vite.dev/config/
export default defineConfig({
  plugins: [rnw()],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
})
