# 6. SDCC hello world & the flash dump

The [Axsem-sdcc-helloworld](https://github.com/BeatSkip/Axsem-sdcc-helloworld) repo is where the SDCC scaffold finally came together — thanks to deepseek, finally some progress. The original firmware was built with IAR EW8051; this repo builds with **SDCC** and the SDCC-MDF extension instead.

## Status

- The project **builds cleanly with SDCC** (tested 3.6.0, extension 0.29.11); roughly **18 KB of the ~58 KB usable flash** is used (`--code-size 59389`, top of the 64 KB reserved — same boundary the original IAR linker file used).
- `main.c` is a **flash dump tool**: it boots, powers the transistor lines (PA2/PA5 via `pwr_on()`), brings up UART0 at **38400 8N1** (the AX8052 bootloader rate) and the SPI unit, then streams the whole SPI flash over UART as a hexdump — **JEDEC ID first** — and finally blinks the blue LED. Reset the tag to dump again.
- `tools/flashdump.py` automates the reset: **DTR drives the BOOT pin (PB3), RTS drives RESET**, same wiring as `axsem-flasher.py` (see [chapter 3](/journey/03-programmer)). The ShelfKit-Vusion copy, [`Data/flashdump.py`](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump.py), runs at **115200** to match the application and saves the dump to a file; captures live in [`Data/flashdump_20260923_*.txt`](https://github.com/BeatSkip/ShelfKit-Vusion/tree/main/Data) (JEDEC ID `1F 42 00`, then the hexdump, ending with `*** end of dump ***`).
- **SPI and e-paper drivers are written but were not yet verified on hardware** at this stage. The e-paper init sequence was transcribed from three independent drivers for this exact panel and they agree byte-for-byte (see below), but `main.c` no longer calls it.
- **Flashing over the debug link is not driven by any tool in the repo** — the `upload` section of `sdcc-project.json` was a placeholder. Flashing went through the serial bootloader instead (see [chapter 5](/journey/05-bootloader-flasher)).

## The display init bytes, cross-checked

The GDEW026Z39 (296×152 BWR, IL0373) init sequence was verified against three independent GDEW026Z39-specific implementations that agree byte-for-byte:

1. [andrei-tatar/imagotag-hack](https://github.com/andrei-tatar/imagotag-hack/blob/master/firmware/src/display/epd.c) — working 8051 (CC2510) driver for this exact tag/panel
2. [angrymew/firmware-cc2510](https://github.com/angrymew/firmware-cc2510/blob/master/src/display/epd.c) — identical sequence, same hardware family
3. [michaelkamprath/ePaperDriverLib](https://github.com/michaelkamprath/ePaperDriverLib) — Arduino lib with GDEW026Z39-specific config

Notable verified values: PSR = `0x0F` (**LUT from OTP**, no LUT upload), TRES = `0x98 0x01 0x28` (HRES 152, VRES 296 — the panel is driven rotated), and no PWR/PLL/VCM_DC/TCON commands (those belong to other IL0373 panels, not the Z39). Full byte-level notes in [`GDEW026Z39-init-reference.md`](https://github.com/BeatSkip/Axsem-sdcc-helloworld/blob/main/GDEW026Z39-init-reference.md). More in [hardware → display](/hardware/display).

## Open questions (at the time)

- **BUSY polarity** — every driver found for this panel on this tag polls BUSY *low* while busy; the tag board inverts the line, although the bare Good Display module is active-high. Resolved later: the tag is **active low**, and `epd.c` defaults to that.
- **UART0 vs panel reset conflict** — PB5 is shared between UART RX and the e-paper reset line. With UART0 enabled the pin belongs to the UART and the reset pulse never reaches the panel; the boot demo therefore leaves UART0 off, and the dump tool uses the bootloader rate on the same pin once the panel is idle.
- **PA2/PA5 transistor lines** (U5/U4) — driven by `pwr.c`, loads still unidentified at this point; the boot demo just drives them on, on the assumption one of them gates the display supply.

## Later that year

The 6-Oct-2026 update on the [SES-Imagotag-UU340 README](https://github.com/BeatSkip/SES-Imagotag-UU340): finally some proper time — re-did the project scaffold to work with SDCC, sprinkled in some deepseek, and got **the display and everything working**. That scaffold became the tag firmware of [ShelfKit-Vusion](/shelfkit/).

## Sources

- [Axsem-sdcc-helloworld README](https://github.com/BeatSkip/Axsem-sdcc-helloworld) (status, build, pin map, known issues)
- [Axsem-sdcc-helloworld → GDEW026Z39-init-reference.md](https://github.com/BeatSkip/Axsem-sdcc-helloworld/blob/main/GDEW026Z39-init-reference.md) (init bytes + the three reference drivers)
- [Axsem-sdcc-helloworld → documentation/signal-list.md](https://github.com/BeatSkip/Axsem-sdcc-helloworld/blob/main/documentation/signal-list.md)
- [ShelfKit-Vusion → Data/flashdump.py](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump.py) (DTR=BOOT / RTS=RESET docstring, 115200 app rate) and [Data/flashdump_20260923_160424.txt](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump_20260923_160424.txt) (captured dump, JEDEC ID `1F 42 00`)
- [SES-Imagotag-UU340 README](https://github.com/BeatSkip/SES-Imagotag-UU340) (6-Oct-2026 update: SDCC scaffold + display working)
