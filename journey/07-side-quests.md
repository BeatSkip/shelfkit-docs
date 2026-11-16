# 7. Side quests: back on the project, the G1 4.4 and a Solum flasher

## Back on the project (Jul 2025)

After a long hiatus, i was finally back on the project. Personal life had been quite hectic, but i was ready to dive back into cracking the nuts of the ImagoTags. Looking back, it had already been about half a year since i last worked on the project, so i needed to get back into the groove of things.

**Status at that point:**

- **Vusion 2.6**: working bootloader, toolchain and flasher with basic "hello world" functionality — see [chapter 5](/journey/05-bootloader-flasher) and [chapter 6](/journey/06-sdcc-flashdump).
- **G1 4.4**: pinout reverse engineering in progress, CC Debugger working on the debug header, toolchain being set up.

If at all possible i would like to create a **shared source with minimal differences between the two firmwares**. At some point i would like to get full OpenEPaperLink working on these too, but that is quite a bit off — first getting some wireless functionality and showing some images on the displays would be a good start.

## Side quest: the ImagoTag G1 4.4 (TI CC2510)

While the Vusion tags were parked, i started on the other ImagoTag variant in the stash: the **G1 4.4**, which is based on the TI **CC2510** — the same MCU family OpenEPaperLink already supports, so this one is much less of a reinvention.

- Repo: [imagotag-g1-4.4-fw](https://github.com/BeatSkip/imagotag-g1-4.4-fw) — source taken from [andrei-tatar/imagotag-hack](https://github.com/andrei-tatar/imagotag-hack/tree/master/firmware/src)
- Build with **PlatformIO** (Generic8051 target), then `objcopy -I ihex -O binary firmware.hex firmware.bin`
- Flash the resulting `.bin` with [ESP_CC_Flasher](https://github.com/section77/ESP_CC_Flasher) over the CC Debugger connected to the tag's debug header.

## Side quest: Solum-Flasher on a RP2040

For the original Solum tags (ZBS-based) i ported ATC1441's [ZBS_Flasher](https://github.com/atc1441/ZBS_Flasher) to the **RP2040** (a Raspberry Pi Pico) in the [Solum-Flasher](https://github.com/BeatSkip/Solum-Flasher) repo. With that you can flash ZBS-based ESL tags with new firmware straight from a Pico, and it stays completely compatible with ATC1441's host tools.

<figure class="panel"><img src="/assets/img/solum-debug-pinout.jpg" alt="Solum debug connector pinout"><figcaption>The Solum debug connector.</figcaption></figure>

| Solum debug pin | Name | RP2040 pin |
|-----------------|------|------------|
| 1 | VCC (3.3 V) | 7 (note 1) |
| 2 | SPI MOSI | 11 |
| 3 | SPI CS | 13 |
| 4 | UART TXD | 8 |
| 5 | SPI SCLK | 10 |
| 6 | SPI MISO | 12 |
| 7 | GND | GND |
| 8 | Reset | 15 |
| 9 | UART RXD | 9 |
| 10 | Test P1.0 | 14 |

**Note 1:** i used the enable pin of a voltage regulator connected to IO7 of the RP2040 to control power to the ESL.

<figure class="panel"><img src="/assets/img/solum-power-controller.jpg" alt="Power controller wiring: voltage regulator enable on IO7 of the RP2040"><figcaption>The power-controller wiring: the regulator's enable pin on IO7 switches the tag's power.</figcaption></figure>

## Where this all leads

The goal all along: one shared firmware source that covers both the Axsem-based Vusion and the TI-based tags with minimal board-specific differences, and eventually full OpenEPaperLink compatibility. The Vusion side of that became [ShelfKit-Vusion](/shelfkit/) — custom firmware, hub, web app, OTA and apps, as of Nov 2026.

## Sources

- [ESL-Modding blog — Back on the project (2025-07-11)](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-07-11-back-on-the-project/index.md)
- [ESL-Modding docs — G1 4.4 intro](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/g1-44/intro.md)
- [imagotag-g1-4.4-fw README](https://github.com/BeatSkip/imagotag-g1-4.4-fw) (PlatformIO build, ESP_CC_Flasher upload, source from andrei-tatar/imagotag-hack)
- [Solum-Flasher README](https://github.com/BeatSkip/Solum-Flasher) (+ [doc/solum-debug-pinout.png](https://github.com/BeatSkip/Solum-Flasher/blob/main/doc/solum-debug-pinout.png), [doc/power-controller-connection.png](https://github.com/BeatSkip/Solum-Flasher/blob/main/doc/power-controller-connection.png))
- [ATC1441/ZBS_Flasher](https://github.com/atc1441/ZBS_Flasher), [section77/ESP_CC_Flasher](https://github.com/section77/ESP_CC_Flasher), [andrei-tatar/imagotag-hack](https://github.com/andrei-tatar/imagotag-hack)
- [ImagoTagESL README changelog](https://github.com/BeatSkip/ImagoTagESL) (10-Jul-2025: scope expanded to the CC2510-based G1 4.4)
