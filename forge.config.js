const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'src/icons/logo.ico') // use absolute path and include file extension
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: "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",
        repository: {
          owner: 'endourdev',
          name: 'youtube-app'
        },
        prerelease: false
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://github.com/Endour-Tech/youtube-app/blob/main/src/img/logo.ico',
        authors: 'Mohamed Ouaouda',
        description: 'https://endour.tech',
        setupIcon: path.join(__dirname, 'src/icons/logo.ico'), // use absolute path and include file extension
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Mohamed Ouaouda',
          homepage: 'https://endour.tech'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
