# Reference library

Verbatim documents imported from the repos — READMEs, chronicles pages, skill files and internal notes, kept as they were written. Datasheets and PDFs stay in the repos; where a page needs one, it links to the GitHub blob page rather than copying the file. The repos themselves are mapped on the [repo map](/repos).

## Original RE repos

- [SES-Imagotag-UU340 README](/reference/uu340-readme) — the first repo: chips used, pinout, original bootloader, links to the datasheets
- [Axsem-sdcc-helloworld README](/reference/helloworld-readme) — the SDCC breakthrough: first own firmware on the AX8052 and the stock flash dump
- [Early IAR scaffolds](/reference/early-scaffolds) — the IAR/CMake project scaffolds that preceded the SDCC workflow, with `axsem-flasher.py`
- [Solum-Flasher README](/reference/solum-flasher) — the ZBS flasher ported to RP2040: pin tables, power control, usage
- [imagotag-g1-4.4-fw README](/reference/g1-fw) — the side quest: CC2510 G1 4.4" firmware via PlatformIO and ESP_CC_Flasher

## ESL-Modding chronicles docs

Pages from the original Docusaurus chronicles ([beatskip.github.io/ESL-Modding](https://beatskip.github.io/ESL-Modding/)), imported verbatim:

- [Vusion 2.6 overview](/reference/esl-vusion-overview) — what the tag is and what is on the board
- [Components & pinouts](/reference/esl-vusion-pinouts) — every connector and pin, mapped
- [PCB overview](/reference/esl-vusion-pcb) — the board, front and back
- [Axsem toolchain](/reference/esl-toolchain-axsem) — getting the vendor tools to build anything at all
- [Axsem bootloader](/reference/esl-bootloader-axsem) — the mask-ROM serial bootloader, command by command
- [Axsem flasher](/reference/esl-flasher-axsem) — the first script that talked to it

## ShelfKit-Vusion internals

Notes from inside the main repo, [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion):

**InkServices / InkLayout (the apps):**

- [Apps: HTTP API](/reference/apps-http-api) — every JSON endpoint the phone pages and shell use
- [Apps: InkLayout notes](/reference/apps-inklayout) — the XML layout language reference for models and humans
- [Apps: SDK & runtime](/reference/apps-sdk) — the `InkApp` SDK and the host that runs apps
- [Apps: UI today](/reference/apps-ui) — what the Apps and Develop screens do now
- [Apps: gaps & roadmap](/reference/apps-gaps) — chunk-by-chunk plan status, observed gaps, open questions

**AX8052 / AX5043 (the silicon), from the `axsem-expert` skill's reference folder:**

- [AX8052 core & memory](/reference/ax-mcu-core-memory) — 8051 core, memory map, addressing modes
- [AX8052 clocks & power](/reference/ax-clocks-power) — clock tree and the power modes used between polls
- [AX8052 interrupts & GPIO](/reference/ax-interrupts-gpio) — interrupt vectors, GPIO, the PA2/PA5 lines
- [AX8052 register index](/reference/ax-register-index) — the register map used across the firmware
- [AX8052 errata notes](/reference/ax-errata) — silicon errata, applied where relevant
- [AX5043 radio](/reference/ax-radio) — the radio transceiver and its configuration
- [LibMF / AXRadio](/reference/ax-libmf) — the vendor radio library wrapped by the firmware
- [SDCC 8051 C/asm notes](/reference/ax-sdcc) — SDCC quirks for 8051 C and inline asm
- [Vusion board notes](/reference/ax-board-vusion) — board-level notes: panel, NFC chip, SPI flash, debug pads

## Agent skills

The two skill files shipped in the repo's `.agents/skills/`, verbatim:

- [Skill: axsem-expert](/reference/skill-axsem-expert) — everything an agent needs to write AX8052/AX5043 firmware with SDCC
- [Skill: shelfkit-apps](/reference/skill-shelfkit-apps) — how to write InkServices apps and InkLayout screens

## Server notes

- [Server: web interface notes](/reference/server-web-ui) — the ShelfKit-Server interface spec the UI follows
- [Server: AI session notes](/reference/server-ai-notes) — how the Develop screen talks to the AI services

## Tooling

- [Firmware build log](/reference/build-log) — every build `build-all.py` ever made: date, version, commit, image hashes

## Sources

- [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion) — `Documentation/`, `.agents/skills/`, `ShelfKit-Firmware/build-log.md`
- [SES-Imagotag-UU340](https://github.com/BeatSkip/SES-Imagotag-UU340), [Axsem-sdcc-helloworld](https://github.com/BeatSkip/Axsem-sdcc-helloworld), [ImagoTagESL](https://github.com/BeatSkip/ImagoTagESL), [Solum-Flasher](https://github.com/BeatSkip/Solum-Flasher), [imagotag-g1-4.4-fw](https://github.com/BeatSkip/imagotag-g1-4.4-fw) — the READMEs and scaffolds
- [ESL-Modding](https://github.com/BeatSkip/ESL-Modding/tree/main/docs) — the chronicles docs
