// @ts-check
import reactPlugin from 'vite-plugin-react';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      rewrite: (path) => path.replace(/^\/api/, ''),
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
};

export default config;
