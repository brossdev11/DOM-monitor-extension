import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../package.json';

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: `Dom Change Alerter`,
  description: 'Test Assignment',
  version,
  background: {
    service_worker: 'background/index.ts',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', 'file:///*'],
      js: ['content/index.tsx'],
    },
  ],
  host_permissions: ['<all_urls>'],
  action: {
    default_icon: {
      '16': 'images/extension_16.png',
      '32': 'images/extension_32.png',
      '48': 'images/extension_48.png',
      '128': 'images/extension_128.png',
    },
  },
  icons: {
    '16': 'images/extension_16.png',
    '32': 'images/extension_32.png',
    '48': 'images/extension_48.png',
    '128': 'images/extension_128.png',
  },
  permissions: ['scripting', 'storage', 'tabs', 'activeTab'],
}));

export default manifest;
