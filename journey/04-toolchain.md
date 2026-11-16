# 4. The toolchain saga

Getting the toolchain working for the Axsem MCU was an absolute pain. My perfectionism would not allow me to keep writing code in Visual Studio Code with broken intellisense. So i spent literal weeks just fiddling with everything to get simple intellisense working.

## Picking a compiler

There are a couple of options to compile C code for 8051-based MCUs:

| Compiler | Notes |
|----------|-------|
| **SDCC** | The straightforward open-source choice. Free and open source, in theory should work fine. i had read however that it has odd bugs, can be very version dependent and does not generate very optimized output. |
| **Keil** | The most popular commercial compiler for 8051. Not sure why, but i didn't necessarily look into this one too much. |
| **IAR8051** | Recommended from multiple sources, a solid choice. Commercial, but i found references to it on both the Axsem and the TI CC resources — which would allow me to use a single toolchain for both the Axsem and the TI CC2510-based devices. |

i ended up going with IAR8051 at first. But over the course i flipped back and forth between SDCC and IAR8051 a couple of times. In the end the project moved fully to **SDCC** (see [chapter 6](/journey/06-sdcc-flashdump)) — free, scriptable, and good enough once the scaffold was right.

## Picking a build system

To set up the project i went through multiple iterations:

1. A simple **makefile** — for the life of me i could not get it working with the IAR8051.
2. **QBS** — this worked surprisingly well, but i saw the whole QBS project was killed off by Qt. Not a foundation i wanted to build on.
3. **CMake + EIDE** (Embedded IDE extension for VS Code) — managed to get IAR8051 working with CMake, and this became the setup for a while.

The IAR/CMake scaffolds live in these repos:

- [ImagoTag-Vusion-project-scaffold](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold) — the AX8052 IAR project scaffold (CMake + IAR toolchain files)
- [ImagoTag-Vusion-custom-firmware](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware) — the "hello world" sample (`src/main.c`, `board.c`) with `tools/iar-toolchain.cmake` / `iar-cspy-8051.cmake`
- [ImagoTagESL](https://github.com/BeatSkip/ImagoTagESL) — the umbrella scaffold, expanded on 10-Jul-2025 to also cover the TI CC2510-based ImagoTag G1 4.4

## The SDCC era

Later i moved the whole thing to SDCC with the **SDCC-MDF** VS Code extension, which gives build tasks, flashing and intellisense from a single `sdcc-project.json` per project. To make the SDCC environment reproducible (and to stop "works on my machine"), i also maintain the [axsem-sdcc-template](https://github.com/BeatSkip/axsem-sdcc-template) repo with a **Docker image + VS Code dev container** — open the folder in a dev container and SDCC is just there.

### Gotcha: SDCC-MDF vs PowerShell

The SDCC-MDF extension (≤ 0.29.11) emits single-quoted tool paths without the `&` call operator, so with a PowerShell terminal every build fails with `Unexpected token '-mmcs' …`. The workaround is a workspace-scoped setting in `.vscode/settings.json`:

```json
"sdcc.shellPath": "cmd.exe"
```

After changing it, reload the VS Code window — the extension reuses its existing build terminal. Also note the extension caches board definitions; after editing a board JSON, reload the window for the change to take effect.

## Status

- Working setup: **SDCC 3.6.0 + SDCC-MDF extension in VS Code**, one `sdcc-project.json` per board target, shared Axsem SDK reached by relative path (this is the layout [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion) uses for tag, hub and bootloader).
- Memory model: `--model-small`, 256 B IRAM, 8 KB XRAM, `--code-size 59389` (the top of the 64 KB flash is reserved for the bootloader).

## Sources

- [ESL-Modding docs — Axsem toolchain](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/tooling-development/01-tooling/axsem/toolchain.md)
- [Axsem-sdcc-helloworld README](https://github.com/BeatSkip/Axsem-sdcc-helloworld) (SDCC-MDF setup, PowerShell workaround, memory model)
- [ImagoTag-Vusion-project-scaffold](https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold), [ImagoTag-Vusion-custom-firmware](https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware), [ImagoTagESL](https://github.com/BeatSkip/ImagoTagESL)
- [axsem-sdcc-template](https://github.com/BeatSkip/axsem-sdcc-template) (Docker + dev container)
- [ShelfKit-Vusion — ShelfKit-Firmware README](https://github.com/BeatSkip/ShelfKit-Vusion/tree/main/ShelfKit-Firmware) (the one-project-per-board SDCC-MDF layout)
