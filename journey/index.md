# The journey: hacking the SES-Imagotag Vusion 2.6" BWR

This chapter is the chronological story of how a shelf full of electronic price tags turned into [ShelfKit](/shelfkit/) — custom firmware, a USB hub and a web app i run myself. It is the "blog" part of this site: less formal than the reference chapters, more personal, and written as it happened.

The short version: i started with Solum tags and OpenEPaperLink, got greedy, ordered 80 cheaper SES-Imagotag Vusion 2.6" BWR tags that nobody had hacked yet, and spent the next two years slowly teaching myself the Axsem AX8052 inside them. The long version is below, one page per step.

If you are here for hard facts instead of the story, the [hardware chapter](/hardware/) has the pin maps and component tables, and the [wireless chapter](/wireless/) has what eventually ran on the tags.

## The timeline

<ul class="timeline">
  <li><span class="when">Jan 2025</span> — read Dmitry Grinberg's and Aaron Christopher's shelf-label hacking posts; 6.5 minutes later i had ordered Solum ST-GR29000 tags (~€9 each) and OpenEPaperLink was running on them — <a href="/journey/01-the-haul">1. the haul</a></li>
  <li><span class="when">Jan 2025</span> — ordered 80 substantially cheaper SES-Imagotag Vusion 2.6" BWR UU340 tags — with a different MCU (Axsem AX8052 instead of TI CC2510) — <a href="/journey/01-the-haul">1. the haul</a></li>
  <li><span class="when">Jan 2025</span> — PCB reverse engineering: component ID under a Zeiss microscope, photo + iPad tracing, x-ray overlay — <a href="/journey/02-cracking-open">2. cracking open</a></li>
  <li><span class="when">Jan 2025</span> — testing setup on a piece of wood, and a homemade Axsem programmer rigged from an FT2232H and a tri-state buffer — <a href="/journey/03-programmer">3. the programmer</a></li>
  <li><span class="when">Jan–May 2025</span> — the toolchain saga: SDCC ↔ IAR8051, makefile → QBS → CMake + EIDE, weeks of intellisense fiddling — <a href="/journey/04-toolchain">4. the toolchain</a></li>
  <li><span class="when">May 2025</span> — serial bootloader from Axsem application note AND9331 (boot pin moved to PB3) plus a python flasher — <a href="/journey/05-bootloader-flasher">5. bootloader &amp; flasher</a></li>
  <li><span class="when">Jun 2025</span> — SDCC hello world builds clean (~18 KB of ~58 KB flash) and streams the whole SPI flash over UART — <a href="/journey/06-sdcc-flashdump">6. SDCC hello world &amp; the flash dump</a></li>
  <li><span class="when">Jul 2025</span> — hiatus over, "back on the project"; side quests: G1 4.4 pinout RE with a CC Debugger, and a Solum flasher on a Pico — <a href="/journey/07-side-quests">7. side quests</a></li>
  <li><span class="when">Oct 2026</span> — SDCC scaffold fully working, display actually driven on the tag — <a href="/journey/06-sdcc-flashdump">6. SDCC hello world &amp; the flash dump</a></li>
  <li><span class="when">Nov 2026</span> — ShelfKit-Vusion: custom tag firmware, USB hub, web app, OTA updates, NFC and apps — <a href="/shelfkit/">ShelfKit</a></li>
</ul>

## How to read this

Each page follows one step of the process and links to the repos it is based on in its Sources section. The pages are deliberately in the order things happened, not the order they were documented — so some of them read like a diary entry with open questions at the bottom. Those open questions usually got answered later; i point that out where it happens.

## Where things stand

As of Nov 2026 the Vusion 2.6" BWR UU340 runs fully custom firmware: a serial bootloader at the top of flash, an SDCC-built application that polls a hub over 868 MHz, draws images on the tri-color panel, takes OTA updates and runs small Python-defined apps. The roadmap and remaining gaps live in [ShelfKit → Roadmap & gaps](/shelfkit/roadmap).

## Sources

- [ESL-Modding blog — Welcome](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-19-welcome/index.md)
- [ESL-Modding blog — Reverse Engineering Vusion 2.6 BWR, part 1](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/index.md)
- [ESL-Modding blog — Reverse Engineering Vusion 2.6 BWR, part 2](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-21-reverse-vusion-part-2/index.md)
- [ESL-Modding blog — Back on the project (Jul 2025)](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-07-11-back-on-the-project/index.md)
- [SES-Imagotag-UU340 README](https://github.com/BeatSkip/SES-Imagotag-UU340) (incl. the 6-Oct-2026 update)
- [ShelfKit-Vusion README](https://github.com/BeatSkip/ShelfKit-Vusion)
