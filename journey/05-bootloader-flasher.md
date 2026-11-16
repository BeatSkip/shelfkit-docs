# 5. Bootloader & flasher

## The serial bootloader

In order to quickly flash the Axsem MCU with new firmware — and to rely as little as possible on the very janky debug flashing setup — i wanted a serial bootloader, so i could just use a serial connection to flash firmware.

By chance i found a demo bootloader in one of the Axsem application notes somewhere on the internet: **AND9331**, the `ax8052_serialbootloader_v1.1` reference project (a Code::Blocks + SDCC project). Data is very sparse on this MCU, so i cannot remember exactly where i sourced it, but the PDF is parked right next to the code in the repo.

All i had to do to get it working on the Vusion board was to change the bootloader selection pin to one that is available on the board: **PB3** (in the source that is the `PINB & 0x08` check). After that it worked like a charm.

- Bootloader source: [SES-Imagotag-UU340 → bootloader/](https://github.com/BeatSkip/SES-Imagotag-UU340/tree/main/bootloader) (Code::Blocks project `bootloader.cbp`, `main.c`, plus [AND9331-D.PDF](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/bootloader/AND9331-D.PDF))
- The [Vusion-Bootloader](https://github.com/BeatSkip/Vusion-Bootloader) repo exists as a placeholder but stayed empty — everything lives in SES-Imagotag-UU340 and later in ShelfKit-Vusion.

The bootloader sits at the top of the 64 KB flash (in the final ShelfKit layout at `0xD800`, with the application jump vector in the two bytes just below it) and speaks the AX8052 bootloader protocol on UART0 at **38400 8N1**:

| Command | Effect |
|---------|--------|
| `?` | print the banner again (`AX8052 Bootloader V1.1 Checksum 0x…`) |
| `K` | erase the application area, re-install the jump vector and verify it |
| `Z` | check that the application area is erased |
| `:` … | parse one Intel HEX record and program it |
| `R` | run the application |
| `V` | measure and print VDD |

Enter it by holding the boot pin (PB3) high while pulsing reset — with a USB-serial adapter that is DTR high + RTS pulse, see [chapter 3](/journey/03-programmer).

## The flasher

In order to flash the MCU using this bootloader, i initially went overboard and created a full-blown flasher application in **C# + WPF**. i wanted to replicate the experience of using a Teensy board. It worked, but it was a bit overkill for the task at hand.

Later, through the absolute laziness of AI, i just copied my C# logic into Claude and asked it to generate a simple python script that does the same thing. This was a lot more lightweight and easier to use, so i ended up including that in the repositories of the Axsem-based firmware:

- [`ImagoTag-Vusion-custom-firmware → tools/axsem-flasher.py`](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware/blob/main/tools/axsem-flasher.py)
- in ShelfKit-Vusion it lives at [`ShelfKit-Firmware/Tooling/axsem-flasher.py`](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Firmware/Tooling/axsem-flasher.py) and is wired as the SDCC-MDF `upload` command, so "SDCC: Flash" in VS Code just works.

The protocol it drives is exactly the bootloader's, at the bootloader rate **38400 8N1**:

```
reset into bootloader (DTR = BOOT high, RTS = reset pulse)
'?'  -> banner "AX8052 Bootloader V1.1 Checksum 0x…"
'K'  -> erase application area ("OK-FLASH Erase")
send Intel HEX lines one by one (':' records)
'R'  -> run the application
```

## Gotchas

- The bootloader rate is fixed at 38400 8N1 — it cannot be changed on an already-flashed board, so everything that talks to the bootloader uses 38400. The application itself can run its UART at a different rate (115200 in the later firmware).
- The bootloader cannot erase its own flash region, so bootloader updates need the debug link (or OTA, later — see [wireless → OTA](/wireless/ota)).

## Sources

- [ESL-Modding docs — Axsem bootloader](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/tooling-development/01-tooling/axsem/bootloader.md)
- [ESL-Modding docs — Axsem flasher](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/tooling-development/01-tooling/axsem/flasher.md)
- [SES-Imagotag-UU340 → bootloader/main.c](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/bootloader/main.c) (boot-select check on PB3, command loop, banner)
- [AND9331-D.PDF](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/bootloader/AND9331-D.PDF) (Axsem serial bootloader application note)
- [ImagoTag-Vusion-custom-firmware → tools/axsem-flasher.py](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware/blob/main/tools/axsem-flasher.py)
- [ShelfKit-Vusion → ShelfKit-Firmware/Bootloader/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Firmware/Bootloader/README.md) and [Tooling/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Firmware/Tooling/README.md)
