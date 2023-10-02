import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/web3-wallet-connect',
  define: {
    'process.env': {}
  }
});
