# Hardware: the SES-Imagotag Vusion 2.6" BWR (UU340)

This chapter collects the reverse-engineered facts about the **VUSION 2.6 BWR** tag in the **UU340** variant — the board all the [journey](/journey/) pages and all of [ShelfKit](/shelfkit/) run on.

## The tag

The VUSION 2.6 BWR is a 2.6" e-ink electronic shelf label with a resolution of **296×152 pixels**. It is a **tri-color display**, capable of black, white and red.

| Feature | Value |
|---------|-------|
| Display | 2.6" e-ink, 296×152, tri-color BWR (Good Display GDEW026Z39, IL0373 controller) |
| Radio | 868/915 MHz sub-GHz transceiver, integrated in the MCU |
| NFC | NFC Forum Type 2 tag IC (FM11NT081DS) |
| LEDs | two status LEDs: one white, one RGB |
| MCU | Axsem **AX8052F143** — 8051 core + radio, 26 MHz crystal |
| Debug | proprietary Axsem debug connector (FT2232H + tri-state buffer adapter) |

## The MCU story

While most known SES-Imagotags use a **TI CC1110 or CC2510**, the VUSION series uses the **Axsem AX8052**. The AX8052 is similar in that it is a wireless MCU with an integrated 8051 core, but a bit more powerful: higher clock speed and more RAM. The catch: this product line is **completely EOL as of December 2022** — no vendor support, scarce documentation, non-standard debug hardware. That is what makes this tag the interesting one to hack.

## Components

<figure class="panel"><img src="/assets/img/tag-frontback.jpg" alt="Front and back of the Vusion 2.6 BWR UU340 PCB"><figcaption>Front and back of the UU340 board.</figcaption></figure>

| ID | Part | Function | Description | Link |
|----|------|----------|-------------|------|
| U1 | AX8052F143 | MCU | 8-bit 8051 MCU with integrated radio | [Datasheet](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/axsem-ax8052-datasheet.PDF) |
| U2 | FM11NT081DS | NFC | NFC Forum Type 2 tag IC | [Datasheet](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/FM11NT0X1D_ps_eng.pdf) |
| U3 | T.B.D | Flash | ~1 Mbit serial flash, shares the SPI bus with the display (JEDEC ID `1F 42 00` read back in the flash dump) | — |
| CN1 | GDEW026Z39 (or GDEW0213Z16) | Display | 2.6" (or 2.13") e-ink module — **both use the IL0373 driver** | [GDEW026Z39](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/GDEW026Z39.pdf) / [GDEW0213Z16](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/GDEW0213Z16.pdf) / [IL0373](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/IL0373.pdf) |

<figure class="panel"><img src="/assets/img/vusion-xray.jpg" alt="X-ray overlay of the front and back of the Vusion PCB"><figcaption>"X-ray" overlay of front and back — the trick for following traces on this 2-layer board.</figcaption></figure>

<figure class="panel"><img src="/assets/img/board-overview.jpg" alt="Annotated board overview of the Vusion 2.6 UU340"><figcaption>Annotated board overview with the traced signals.</figcaption></figure>

<figure class="panel"><img src="/assets/img/uu340-board-overview.jpg" alt="Board overview photo from the SES-Imagotag-UU340 repo"><figcaption>The board overview as kept in the SES-Imagotag-UU340 repo.</figcaption></figure>

## In this chapter

- [Pin map](/hardware/pinout) — every AX8052 pin and where it goes (SPI, e-ink, NFC, LEDs, UART, boot pin)
- [E-paper panel](/hardware/display) — GDEW026Z39 / IL0373 init sequence, BUSY polarity, frame format
- [PA2 / PA5 transistor lines](/hardware/transistors) — the two unidentified transistor-driven pins
- [NFC field detect](/hardware/nfc) — PB3 doubles as boot pin and NFC field detection
- [Gotchas & context sheet](/hardware/gotchas) — the things that bit me, collected
- [AX8052 silicon errata (applied)](/hardware/errata) — errata notes that matter for this firmware

## Sources

- [SES-Imagotag-UU340 README](https://github.com/BeatSkip/SES-Imagotag-UU340) (chips used, AX8052F143 connections table)
- [ESL-Modding docs — Vusion 2.6 overview](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/vusion-26/overview.md)
- [ESL-Modding docs — Vusion 2.6 components & pinouts](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/vusion-26/pinouts.md)
- [ESL-Modding docs — Vusion 2.6 PCB overview](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/vusion-26/pcb-layout.mdx)
- [Axsem-sdcc-helloworld → documentation/signal-list.md](https://github.com/BeatSkip/Axsem-sdcc-helloworld/blob/main/documentation/signal-list.md)
- [ShelfKit-Vusion → Data/flashdump_20260923_160424.txt](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump_20260923_160424.txt) (JEDEC ID of U3)
- Tag datasheet: [vusion-26-datasheet.pdf](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/assets/vusion-26-datasheet.pdf)
