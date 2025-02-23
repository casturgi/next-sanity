import { addons } from '@storybook/manager-api'

addons.setConfig({
  enableShortcuts: true,
  showToolbar: true,
  toolbar: {
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
})
