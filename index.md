---
layout: home
hero:
  name: ShelfKit
  text: ESL tags, reverse engineered
  tagline: From 80 supermarket shelf tags to your own e-paper fleet. No vendor cloud, no gateway subscription — custom SDCC firmware, a USB hub and a local web app, all from source.
  image: /assets/img/polyform-eink.png
  actions:
    - theme: brand
      text: Read the reverse engineering journey
      link: /journey/
    - theme: alt
      text: Explore ShelfKit
      link: /shelfkit/
    - theme: alt
      text: Repo map
      link: /repos
features:
  - title: The journey
    details: How a locked-down shelf tag got opened up, pin by pin
    link: /journey/
  - title: Hardware
    details: Vusion 2.6" UU340 — components, pin map, panel, gotchas
    link: /hardware/
  - title: Wireless & firmware
    details: The 868 MHz protocol, OTA, identity, power
    link: /wireless/
  - title: ShelfKit web app
    details: Fleet view, image push, flashing from the browser
    link: /shelfkit/server
  - title: Apps & InkLayout
    details: Python apps on tags, XML screen layouts, AI-assisted develop screen
    link: /shelfkit/inkservices
  - title: Tooling
    details: build-all, axsem-flasher, OTA send, set-id, flash read-back
    link: /shelfkit/tooling
---

## The short version

This site is the write-up of a hobby project that got slightly out of hand. i bought a crate of surplus electronic shelf labels, opened one up, and — instead of stopping at "neat" — reverse engineered the whole thing: pin by pin, bootloader command by command, radio frame by frame. Then i built my own firmware, a USB hub and a local web app on top of the remains.

ShelfKit is the result: 80 supermarket SES-Imagotag Vusion 2.6" tags turned into an e-paper fleet i actually own. No vendor cloud, no gateway subscription, nothing phoning home. Everything on this site is open source and built from scratch with SDCC and Python's standard library.

> The tags were never mine to begin with in any official sense. That is rather the point.

## The story at a glance

<ul class="timeline">
  <li><span class="when">ch. 1</span> <strong>The haul</strong> — from a box of Solum tags to 80 Vusion 2.6" tags. <a href="/journey/01-the-haul">read it</a></li>
  <li><span class="when">ch. 2</span> <strong>Cracking the tag open</strong> — the AX8052, the NFC chip, the e-paper panel. <a href="/journey/02-cracking-open">read it</a></li>
  <li><span class="when">ch. 3–4</span> <strong>The programmer and the toolchain saga</strong> — IAR, SDCC, and the long road to "hello world" that actually blinks. <a href="/journey/03-programmer">part 1</a> · <a href="/journey/04-toolchain">part 2</a></li>
  <li><span class="when">ch. 5</span> <strong>Bootloader & flasher</strong> — the mask-ROM serial bootloader and the script that talks to it. <a href="/journey/05-bootloader-flasher">read it</a></li>
  <li><span class="when">ch. 6</span> <strong>SDCC hello world & the flash dump</strong> — first own code on the chip, and the stock firmware's full flash dumped over UART. <a href="/journey/06-sdcc-flashdump">read it</a></li>
  <li><span class="when">today</span> <strong>ShelfKit</strong> — custom firmware, USB hub and web app running my own fleet. <a href="/shelfkit/">explore it</a> (side quests in <a href="/journey/07-side-quests">ch. 7</a>)</li>
</ul>

## Where things live

All the code lives in the eleven repos mapped on the [repo map](/repos) — the main one being [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion). The verbatim documentation, datasheets notes and READMEs pulled straight from those repos are collected under [Reference](/reference/), so you can read them without leaving this site. If you only want the legal and affiliation note, that is on [About](/about).

## Sources

- [ShelfKit-Vusion README](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/README.md) — what the landing page summarises
- [ESL-Modding docs](https://github.com/BeatSkip/ESL-Modding/tree/main/docs) — the original chronicles this site grows out of
