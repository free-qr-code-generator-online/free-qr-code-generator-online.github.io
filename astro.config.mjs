import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://free-qr-code-generator-online.github.io/',
  integrations: [tailwind(), react()],
});
