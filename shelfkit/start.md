# Quickstart — from blank tag to first image

Everything below is tested on my own fleet of 80 tags, so if it doesn't work for you, the tag is probably the weird one. Clone the repo and follow the steps in order; the whole path takes an evening if the soldering cooperates.

## 1. What you need

- One or more **Vusion 2.6" UU340 tags** (the BWR ones), plus **one more tag to use as the hub** — the hub is just a second board wired to USB.
- A **USB-serial adapter with DTR and RTS broken out**, wired to the tag's debug pads:

  | adapter | tag |
  |---|---|
  | DTR | BOOT (PB3) |
  | RTS | RESET |
  | TX / RX | UART RX / TX |
  | GND | GND |

- **SDCC** on `PATH` (verified with 3.6.0). VS Code with the [SDCC-MDF extension](https://marketplace.visualstudio.com/items?itemName=dzantemir.sdcc-mdf) is optional and handy for single-target builds — open `ShelfKit-Firmware/Vusion` or `Vusion-Hub` itself, not the repo root.
- Python 3 with `pyserial` and `pillow`.

Two baud rates matter and they are not the same: the **application** runs its UART at **115200 8N1** (that is what the server opens), the **bootloader** on the same wire still runs at **38400 8N1** (that is what the flasher talks to).

## 2. Get the code

```bash
git clone https://github.com/BeatSkip/ShelfKit-Vusion.git
cd ShelfKit-Vusion
```

## 3. Build the firmware

```bash
python ShelfKit-Firmware/Tooling/build-all.py
```

This writes four ready-to-flash Intel HEX files to `Release/`:

| file | what it is |
|---|---|
| `vusion-latest.hex` | the tag application |
| `vusion-hub-latest.hex` | the hub application |
| `bootloader-latest.hex` | the serial bootloader |
| `vusion-full-latest.hex` | bootloader + tag application in one file — **use this for a tag's first flash** |

Useful variants: `--version 1.0.0` names the files `-1.0.0`, `--targets vusion,bootloader` builds a subset, `--clean` wipes first. The tag application nearly fills its 43,006 B OTA window, so new firmware features have to earn their bytes.

## 4. Flash the hub and the tags

Hold the tag in bootloader mode by wiring DTR to BOOT — or let the flasher do it, since it drives DTR/RTS itself:

```bash
python ShelfKit-Firmware/Tooling/axsem-flasher.py Release/vusion-hub-latest.hex -p COM7
python ShelfKit-Firmware/Tooling/axsem-flasher.py Release/vusion-full-latest.hex -p COM7
```

The flasher talks the mask-ROM bootloader protocol at 38400: `?` banner → `K` erase → hex lines → `R` run. Flash the hub with the hub hex (after the bootloader, if it doesn't have one yet), and each tag with `vusion-full-latest.hex` — the full bundle installs the bootloader too, which is what makes later OTA possible. The same flash is available from the server's **Flash** screen, via the AXSDB debugger or the serial bootloader.

Plug the hub into the PC over USB-serial and note its COM port.

## 5. Run the server

```bash
pip install -r ShelfKit-Server/requirements.txt     # pyserial, pillow
python ShelfKit-Server/shelfkit-server.py hub=COM4 tag=COM3
```

`tag=COM3` is the optional second serial pane (a tag's debug port); leave it off and the pane stays free:

```bash
python ShelfKit-Server/shelfkit-server.py hub=COM4
```

It prints the URL and opens the page in your browser:

```
ShelfKit server on http://127.0.0.1:8765/
  hub    COM4         open @ 115200 8N1
  tag    COM3         open @ 115200 8N1
Ctrl+C to stop
```

State lives in `ShelfKit-Server/data/shelfkit.db` — `--db PATH` puts it elsewhere, `--port 9000 --no-browser` runs it headless, `--list` shows the detected serial ports. The page listens on every interface by default (so a phone on the LAN can reach it); pass `--host 127.0.0.1` if you only want this machine. **Fleet** shows tags as they check in; **Apps** puts an app on a tag.

## 6. Give tags their wireless IDs

Fresh tags poll with a default ID. In **Fleet**, click a tag, and under **Wireless ID** type a hex id (or leave it empty for the lowest free one) and press **Assign ID**. From the shell, the same thing is:

```bash
python ShelfKit-Firmware/Tooling/set-id.py 3F2A 0100     # current_id new_id, over the radio
```

The tag stores the ID in SPI flash and keeps it across updates.

## 7. Push the first image

In **Fleet**, open a tag, pick a picture, choose fit (`cover` / `contain` / `stretch`) and dither (`threshold` / `floyd-steinberg` / `bayer4`), watch the preview — it is exactly what the glass will show — and press **Push**. Nothing is sent immediately: the command waits for the tag's next check-in (30 s while busy, 5 min idle), the hub streams the chunks, and the Queue screen shows live progress. Chain-code (ECO) compression usually brings a typical label down to about 30 radio frames instead of 404.

## 8. Update firmware over the air

Once a tag has the bootloader, updates go over the radio. In the tag's inspector, the **Reflash** button sends a new build; from the shell:

```bash
python ShelfKit-Firmware/Tooling/ota-send.py Release/vusion-latest.hex --addr 0100 -p COM4
```

The tag erases its SPI flash, takes ~1,500 CRC-checked chunks, verifies, resets, and the bootloader programs the new application. It comes back with the same ID and its aliases intact. `--dry-run` checks the image first.

## Gotchas

- **Bootloader vs application baud.** The bootloader's boot lines arrive at 38400 and look like noise in a 115200 console. Reopen the pane at 38400 to read them.
- **NFC link.** Today's tag firmware rewrites the NFC chip at boot. Build with `SHELF_NFC_NDEF_SYNC 0` until it learns to keep your link and fill in its own ID; until then the server writes the `/tag/<ID>` link over the radio instead (Fleet inspector → **Write NFC link**).
- **The admin page can flash chips and drive serial ports.** There is no auth — keep the server on localhost or a trusted LAN.
- **The command queue is in memory.** A restart forgets pending pushes.

## Sources

- [ShelfKit-Vusion/README.md — Getting started](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/README.md)
- [ShelfKit-Server/README.md — Install and run](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Server/README.md)
- [ShelfKit-Firmware/Tooling/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Firmware/Tooling/README.md) — build-all, axsem-flasher, ota-send, set-id, flash-read
- [ShelfKit-Firmware/Bootloader/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Firmware/Bootloader/README.md) — the serial bootloader protocol
