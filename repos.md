# Repo map

Every repository in this story, in one place. Eleven of them — most are historical stepping stones, one is the living project.

| Repo | Role in the story | Status |
|---|---|---|
| [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion) | The main project: SDCC firmware for tag and hub, the serial bootloader, ShelfKit-Server (web app, InkServices, InkLayout), host tooling, docs and flash dumps | **active** |
| [ESL-Modding](https://github.com/BeatSkip/ESL-Modding) | The original chronicles of the reverse engineering, as a Docusaurus site published at [beatskip.github.io/ESL-Modding](https://beatskip.github.io/ESL-Modding/) | historical — superseded by this site, still online |
| [SES-Imagotag-UU340](https://github.com/BeatSkip/SES-Imagotag-UU340) | The first RE repo: pinout, datasheets and the original bootloader of the Vusion 2.6" UU340 | superseded by ShelfKit-Vusion (its README says so itself) |
| [Axsem-sdcc-helloworld](https://github.com/BeatSkip/Axsem-sdcc-helloworld) | The SDCC breakthrough: first own code running on the AX8052, plus the full flash dump of the stock firmware | superseded by ShelfKit-Vusion |
| [Vusion-Bootloader](https://github.com/BeatSkip/Vusion-Bootloader) | Placeholder, reserved as a name | **empty** |
| [ImagoTag-Vusion-custom-firmware](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware) | Early IAR/CMake scaffold for the AX8052, with `axsem-flasher.py` | superseded by ShelfKit-Vusion |
| [ImagoTag-Vusion-project-scaffold](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold) | Early IAR/CMake project scaffold | superseded by ShelfKit-Vusion |
| [ImagoTagESL](https://github.com/BeatSkip/ImagoTagESL) | IAR/CMake scaffold that was later expanded to the TI CC2510 G1 tags | superseded by ShelfKit-Vusion |
| [axsem-sdcc-template](https://github.com/BeatSkip/axsem-sdcc-template) | The SDCC + Docker devcontainer toolchain template the first builds ran on | superseded by ShelfKit-Vusion |
| [imagotag-g1-4.4-fw](https://github.com/BeatSkip/imagotag-g1-4.4-fw) | Side quest: firmware for the CC2510-based G1 4.4" tags, built with PlatformIO and flashed via ESP_CC_Flasher | side quest, kept as reference |
| [Solum-Flasher](https://github.com/BeatSkip/Solum-Flasher) | Side quest: ATC1441's ZBS flasher ported to the RP2040, for the Solum tags | side quest, kept as reference |

## How the repos evolved into ShelfKit

The order of attack was: [SES-Imagotag-UU340](https://github.com/BeatSkip/SES-Imagotag-UU340) first — pinout, datasheets, the stock bootloader — then a round of IAR/CMake scaffolds ([ImagoTagESL](https://github.com/BeatSkip/ImagoTagESL), [ImagoTag-Vusion-custom-firmware](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware), [ImagoTag-Vusion-project-scaffold](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold)) while the vendor toolchain was still fighting back. The actual breakthrough was [axsem-sdcc-template](https://github.com/BeatSkip/axsem-sdcc-template) + [Axsem-sdcc-helloworld](https://github.com/BeatSkip/Axsem-sdcc-helloworld): once SDCC could build and flash the AX8052, everything else got rewritten around it. That work now lives in [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion), which is the only repo you need to clone to run the whole fleet.

> The scaffold repos look almost empty next to ShelfKit-Vusion. They are not wasted — each one taught the next one something the vendor docs never would.

## What the reference pages import

The [Reference](/reference/) section of this site imports verbatim docs from several of these repos: the [UU340 README](/reference/uu340-readme), the [helloworld README](/reference/helloworld-readme), the [early scaffolds](/reference/early-scaffolds), the ESL-Modding chronicles pages, the [Solum-Flasher README](/reference/solum-flasher) and the [G1 firmware README](/reference/g1-fw). The PDFs and datasheets stay in the repos — the reference pages link to their GitHub blob pages instead of copying them.

## Sources

- READMEs of all eleven repos under [github.com/BeatSkip](https://github.com/BeatSkip?tab=repositories), e.g. [SES-Imagotag-UU340](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/README.md), [Axsem-sdcc-helloworld](https://github.com/BeatSkip/Axsem-sdcc-helloworld/blob/main/README.md), [Solum-Flasher](https://github.com/BeatSkip/Solum-Flasher/blob/main/README.md), [imagotag-g1-4.4-fw](https://github.com/BeatSkip/imagotag-g1-4.4-fw/blob/main/README.md), [ESL-Modding](https://github.com/BeatSkip/ESL-Modding/blob/main/README.md)
- [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion) — the current home of the work
