# Early IAR/CMake project scaffolds

::: info
Synthesised from the READMEs of [`ImagoTag-Vusion-project-scaffold`](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold), [`ImagoTag-Vusion-custom-firmware`](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware) and [`ImagoTagESL`](https://github.com/BeatSkip/ImagoTagESL) — the three READMEs are near-identical, so they are collected here once. These projects were the IAR8051 + CMake stepping stones between the first pinout work and the SDCC toolchain that ShelfKit-Vusion uses today.
:::

# AX8052 IAR project (scaffold)

These projects demonstrate programming for the Axsem AX8052 microcontroller using SDCC
(Small Device C Compiler) within Visual Studio Code with EIDE (Embedded IDE), driven by
CMake + IAR8051 toolchain files (`tools/iar-toolchain.cmake`, `tools/iar-cspy-8051.cmake`).

## Prerequisites

- Visual Studio Code
- CMake
- IAR8051 compiler
- AX8052 SDK

## Hardware configuration

- MCU: AX8052
- Clock: 26 MHz crystal
- Power: 3.3 V

## What each repo added

| Repo | Delta over the scaffold |
|---|---|
| `ImagoTag-Vusion-project-scaffold` | Bare CMake + IAR8051 scaffold: `src/main.c`, `board.h`, `hal.h` |
| `ImagoTag-Vusion-custom-firmware` | Adds `board.c`, `tools/axsem-flasher.py` (the serial-bootloader flasher) and a prebuilt `imagotagScaffold.hex` |
| `ImagoTagESL` | Same flasher, scope expanded to the TI CC2510 based ImagoTag G1 4.4 hardware (changelog 10-Jul-2025) |

## Changelog notes from the repos

- 10-Jul-2025: project picked back up, scope expanded to the Ti CC2510 based ImagoTag G1 4.4 hardware.
- 03-May-2025: "not yet stale, just had a busy personal time. project will be picked up again soon."
- 6-Oct-2026 (on the UU340 repo): the scaffold was re-done to work with SDCC, display working —
  the current working project is [`BeatSkip/ShelfKit-Vusion`](https://github.com/BeatSkip/ShelfKit-Vusion).

## Status today

Superseded by [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion), which builds with
SDCC via the SDCC-MDF VS Code extension instead of IAR8051. The flasher script lives on as
`ShelfKit-Firmware/Tooling/axsem-flasher.py` — see [Tooling](/shelfkit/tooling).

## Sources

- [ImagoTag-Vusion-project-scaffold/Readme.md](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold/blob/main/Readme.md)
- [ImagoTag-Vusion-custom-firmware/Readme.md](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware/blob/main/Readme.md)
- [ImagoTagESL/Readme.md](https://github.com/BeatSkip/ImagoTagESL/blob/main/Readme.md)
- [SES-Imagotag-UU340/README.md](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/README.md)
