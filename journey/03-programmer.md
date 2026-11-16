# 3. The programmer (and the testing setup)

## Testing setup

To hack and reverse engineer hardware i prefer to make a setup somewhere in between permanent and temporary. Usually i just 3D print some standoffs and lay everything out on a piece of wood. This allows me to tweak, experiment and poke around while still having a stable setup.

<figure class="panel"><img src="/assets/img/testing-setup.jpg" alt="The testing setup: tag on 3D printed standoffs on a piece of wood, MOSFET board between PSU and tag"><figcaption>The testing setup: tag on 3D-printed standoffs on a piece of wood, with a MOSFET board between the PSU and the tag.</figcaption></figure>

i did add a MOSFET board in between the power supply and the ESL tag to possibly start doing some glitching attacks. However i didn't get to that yet — i might do that at some later stage.

## The programmer

Some searching led to the discovery that the proprietary programmer from Axsem is just an **FT2232H with a tri-state buffer**. This meant that i could rig up my own programmer with parts laying around.

<figure class="panel"><img src="/assets/img/axdbg-schematic.jpg" alt="Schematic of the Axsem debug adapter: FT2232H plus tri-state buffer"><figcaption>Axsem's "proprietary" debug adapter, redrawn: an FT2232H and a tri-state buffer. Nothing stops you from building one yourself.</figcaption></figure>

So that is exactly what i did: an FT2232H board from the spares box, a tri-state buffer, and some wire. It speaks Axsem's debug protocol to the AX8052 over the tag's debug connector.

## Boot pin and reset wiring

One detail that matters a lot later (for the serial bootloader and both python tools): the tag's boot-select line is **PB3** (the same pin the NFC chip uses for field detection), and reset is just the MCU reset line. With a plain USB-serial adapter you can drive both over the modem-control lines:

- **DTR drives BOOT** (PB3)
- **RTS drives RESET**

So the reset-into-mode sequence is:

```
boot pin released (DTR low)  + reset pulse  ->  application (default)
boot pin held     (DTR high) + reset pulse  ->  AX8052 serial bootloader
```

This is exactly what `reset_into()` in the flasher and in [`Data/flashdump.py`](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump.py) does — hold DTR high, pulse RTS, release DTR. No extra hardware needed beyond the serial adapter.

## Gotchas

- The debug link is the only way to initially program a blank/locked chip; after the serial bootloader is in, you never need it again for day-to-day flashing (see [chapter 5](/journey/05-bootloader-flasher)).
- The AX8052 debug protocol is non-standard (Axsem's own), so generic 8051 tools do not speak it — the FT2232H-based adapter plus Axsem's tools is the path of least resistance.

## Sources

- [ESL-Modding blog — Reverse Engineering Vusion 2.6 BWR, part 1 (testing setup, programmer)](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/index.md) (schematic: [axdbg-schematic.png](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/assets/axdbg-schematic.png))
- [ShelfKit-Vusion — Data/flashdump.py](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Data/flashdump.py) (DTR = BOOT, RTS = RESET docstring)
- [SES-Imagotag-UU340 — signal list](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/archive/signal-list.md) (PB3 = bootloader & NFC field detect)
