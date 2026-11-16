import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ShelfKit — ESL reverse engineering & open firmware',
  description:
    'The full story of reverse engineering SES-Imagotag Vusion 2.6" e-ink shelf tags (Axsem AX8052) and ShelfKit, the open-source firmware, hub and web app built on top of them.',
  // GitHub Pages serves this repo as a project site under /shelfkit-docs/
  base: process.env.PAGES_BASE ?? (process.env.NODE_ENV === 'production' ? '/shelfkit-docs/' : '/'),
  cleanUrls: true,
  lastUpdated: false,
  sitemap: { hostname: 'https://beatskip.github.io/shelfkit-docs/' },

  themeConfig: {
    logo: '/assets/img/polyform-eink.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'The Journey', link: '/journey/' },
      { text: 'Hardware', link: '/hardware/' },
      { text: 'Wireless & Firmware', link: '/wireless/' },
      { text: 'ShelfKit', link: '/shelfkit/' },
      { text: 'Repos', link: '/repos' },
      { text: 'Reference', link: '/reference/' }
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/BeatSkip' }],
    footer: {
      message:
        'Unofficial hobby project. Not affiliated with or endorsed by SES-Imagotag, Axsem or any other company. MIT-licensed documentation.'
    }
  },

  sidebar: {
    '/journey/': [
      {
        text: 'The Journey — reverse engineering the Vusion tag',
        items: [
          { text: 'Overview & timeline', link: '/journey/' },
          { text: '1. The haul: from Solum to 80 Vusion tags', link: '/journey/01-the-haul' },
          { text: '2. Cracking the tag open', link: '/journey/02-cracking-open' },
          { text: '3. The programmer', link: '/journey/03-programmer' },
          { text: '4. The toolchain saga', link: '/journey/04-toolchain' },
          { text: '5. Bootloader & flasher', link: '/journey/05-bootloader-flasher' },
          { text: '6. SDCC hello world & the flash dump', link: '/journey/06-sdcc-flashdump' },
          { text: '7. Side quests: G1 4.4 and Solum', link: '/journey/07-side-quests' }
        ]
      }
    ],
    '/hardware/': [
      {
        text: 'Hardware — Vusion 2.6" BWR (UU340)',
        items: [
          { text: 'Overview & components', link: '/hardware/' },
          { text: 'Pin map', link: '/hardware/pinout' },
          { text: 'E-paper panel (GDEW026Z39 / IL0373)', link: '/hardware/display' },
          { text: 'PA2 / PA5 transistor lines', link: '/hardware/transistors' },
          { text: 'NFC field detect', link: '/hardware/nfc' },
          { text: 'Gotchas & context sheet', link: '/hardware/gotchas' },
          { text: 'AX8052 silicon errata (applied)', link: '/hardware/errata' }
        ]
      }
    ],
    '/wireless/': [
      {
        text: 'Wireless & firmware internals',
        items: [
          { text: 'The 868 MHz link', link: '/wireless/' },
          { text: 'OTA firmware updates', link: '/wireless/ota' },
          { text: 'Tag identity & flash map', link: '/wireless/identity' },
          { text: 'Power deep-dive (CR2450)', link: '/wireless/power-deepdive' },
          { text: 'Power audit (2026-11-10)', link: '/wireless/power-audit' },
          { text: 'Battery drain findings (2026-11-13)', link: '/wireless/power-findings' },
          { text: 'Deep-sleep wake debugging', link: '/wireless/deepsleep' }
        ]
      }
    ],
    '/shelfkit/': [
      {
        text: 'ShelfKit — the project',
        items: [
          { text: 'Overview', link: '/shelfkit/' },
          { text: 'Quickstart', link: '/shelfkit/start' },
          { text: 'The web app (ShelfKit-Server)', link: '/shelfkit/server' },
          { text: 'InkServices apps', link: '/shelfkit/inkservices' },
          { text: 'InkLayout screen language', link: '/shelfkit/inklayout' },
          { text: 'InkServices implementation plan', link: '/shelfkit/plan' },
          { text: 'Firmware layout & building', link: '/shelfkit/firmware' },
          { text: 'Bootloader', link: '/shelfkit/bootloader' },
          { text: 'Host tooling', link: '/shelfkit/tooling' },
          { text: 'Tag firmware (Vusion)', link: '/shelfkit/tag-firmware' },
          { text: 'Hub firmware (Vusion-Hub)', link: '/shelfkit/hub-firmware' },
          { text: 'Roadmap & gaps', link: '/shelfkit/roadmap' }
        ]
      }
    ],
    '/reference/': [
      {
        text: 'Reference library (verbatim from the repos)',
        items: [
          { text: 'Library index', link: '/reference/' },
          { text: 'SES-Imagotag-UU340 README', link: '/reference/uu340-readme' },
          { text: 'Axsem-sdcc-helloworld README', link: '/reference/helloworld-readme' },
          { text: 'Early IAR scaffolds', link: '/reference/early-scaffolds' },
          { text: 'ESL-Modding: Vusion 2.6 overview', link: '/reference/esl-vusion-overview' },
          { text: 'ESL-Modding: components & pinouts', link: '/reference/esl-vusion-pinouts' },
          { text: 'ESL-Modding: PCB overview', link: '/reference/esl-vusion-pcb' },
          { text: 'ESL-Modding: Axsem toolchain', link: '/reference/esl-toolchain-axsem' },
          { text: 'ESL-Modding: Axsem bootloader', link: '/reference/esl-bootloader-axsem' },
          { text: 'ESL-Modding: Axsem flasher', link: '/reference/esl-flasher-axsem' },
          { text: 'Solum-Flasher README', link: '/reference/solum-flasher' },
          { text: 'imagotag-g1-4.4-fw README', link: '/reference/g1-fw' },
          { text: 'Skill: axsem-expert', link: '/reference/skill-axsem-expert' },
          { text: 'Skill: shelfkit-apps', link: '/reference/skill-shelfkit-apps' },
          { text: 'Apps: HTTP API', link: '/reference/apps-http-api' },
          { text: 'Apps: InkLayout notes', link: '/reference/apps-inklayout' },
          { text: 'Apps: SDK & runtime', link: '/reference/apps-sdk' },
          { text: 'Apps: UI today', link: '/reference/apps-ui' },
          { text: 'Apps: gaps & roadmap', link: '/reference/apps-gaps' },
          { text: 'AX8052 core & memory', link: '/reference/ax-mcu-core-memory' },
          { text: 'AX8052 clocks & power', link: '/reference/ax-clocks-power' },
          { text: 'AX8052 interrupts & GPIO', link: '/reference/ax-interrupts-gpio' },
          { text: 'AX8052 register index', link: '/reference/ax-register-index' },
          { text: 'AX8052 errata notes', link: '/reference/ax-errata' },
          { text: 'AX5043 radio', link: '/reference/ax-radio' },
          { text: 'LibMF / AXRadio', link: '/reference/ax-libmf' },
          { text: 'SDCC 8051 C/asm notes', link: '/reference/ax-sdcc' },
          { text: 'Vusion board notes', link: '/reference/ax-board-vusion' },
          { text: 'Server: web interface notes', link: '/reference/server-web-ui' },
          { text: 'Server: AI session notes', link: '/reference/server-ai-notes' },
          { text: 'Firmware build log', link: '/reference/build-log' }
        ]
      }
    ]
  },

  markdown: {
    attrs: { target: '_blank' }
  }
})
