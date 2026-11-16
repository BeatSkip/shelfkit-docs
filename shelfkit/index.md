# ShelfKit — supermarket shelf labels, repurposed

**Supermarket shelf labels, repurposed into little e-paper screens you own.** ShelfKit turns SES-Imagotag / Vusion 2.6" price tags (AX8052F143 radio MCU, 152×296 black/white/red panel, one CR2450 coin cell) into a fleet you drive from your own computer: custom firmware for the tags and a USB hub, and a local web app that pushes images and runs small apps on them.

No vendor cloud, no gateway subscription, nothing phoning home. Everything is built from source with SDCC and Python's standard library. The whole thing lives in one repo: [ShelfKit-Vusion](https://github.com/BeatSkip/ShelfKit-Vusion).

<figure class="panel"><img src="/assets/img/shot-fleet.png" alt="The ShelfKit fleet view"><figcaption>The Fleet screen: every tag that checked in, at true panel size on its shelf, with its state, battery and the exact frame it is showing.</figcaption></figure>

## What it can do

- **Push any image to any tag.** Pick a picture, choose fit and dither, see exactly what the glass will show, and send it. The image goes out at the tag's next check-in, chain-code compressed when that helps, so a typical label takes about 30 radio frames instead of 404.
- **Run apps on tags.** Small Python apps (*InkServices*) own a tag's screen: they draw it, update it on a timer and react when someone taps the tag with a phone. A pill tracker, weather with the moon phase, and a hello-world counter come with it.
- **Tap a tag, get its page.** Each tag's NFC chip holds a link to `/tag/<ID>` on your server. A phone tap opens that tag's app page with its buttons, and the tag shows the result.
- **Design screens as text.** *InkLayout* is a small XML layout language made for this panel: rows, grids, text that fits, icons, the three colours, and a renderer that tells you what overflowed. It is simple enough that a cheap AI model can write layouts from a skill file.
- **Build apps in the browser, with an AI agent.** The Develop screen has a code editor, a virtual tag and the phone page side by side. Describe a change and the agent (Claude, OpenAI, DeepSeek or Mistral, with your own key) proposes files you can diff, try on the virtual tag, then accept or reject. Every save keeps a checkpoint to go back to.
- **Look after the fleet.** Over-the-air firmware updates, wireless ID assignment, flash read-back, factory reset, service labels for finding a tag in hand, and per-tag battery history with a drain estimate.
- **Sip power.** Between polls the radio, the MCU and the panel rail are all asleep. The check-in interval adapts (30 s while busy, 5 min idle, up to a day with no hub in range), so a lost tag can't drain itself.

## Apps on your tags

<figure class="panel"><img src="/assets/img/shot-tag-apps.png" alt="Pill tracker and weather screens as the tag shows them"><figcaption>Real renders at 2×, exactly the pixels the tags get: the pill tracker after the reminder time and after a tap, and the weather app.</figcaption></figure>

An app is a folder in `ShelfKit-Server/inkapps/` with an `app.py` and, usually, a `layout.xml`. This is the whole hello app:

```python
from shelfkit.inkservices import InkApp

app = InkApp("hello", title="Hello", description="A counter and a message, set from your phone",
             layout="layout.xml")
app.config_field("greeting", label="Greeting", default="Hello!")

@app.data
def data(tag):
    return {"greeting": tag.config.get("greeting", ""), "n": tag.data.get("n", 0)}

@app.button("Press me")
def press(tag):
    tag.data["n"] = tag.data.get("n", 0) + 1
```

```xml
<screen padding="6" gap="6">
  <row bg="black" padding="4 6"><text color="white" bold="true" size="16">{{ tag.alias }}</text></row>
  <text size="14" bold="true" fit="shrink">{{ data.greeting }}</text>
  <text size="64" bold="true" color="red" fit="shrink">{{ data.n }}</text>
</screen>
```

The host takes care of the rest:

- Each app gets its own SQLite file with per-tag settings and data.
- `@app.every(minutes=30)` runs on a scheduler.
- `@app.on_open` fires on an NFC tap.
- A screen identical to the last one is never sent, which saves the battery.
- An app that crashes logs its error and leaves every other tag alone.

## How it works, in one picture

```
 tag (battery)                                    hub (USB serial)              host
 ┌────────────────┐   POLL  ───────────────────►  ┌──────────────┐   hex lines  ┌──────────────┐
 │ AX8052F143     │   ◄─────── POLL_RSP (ACK)      │ AX8052F143   │  ◄────────── │ ShelfKit-    │
 │ + GDEW026Z39   │   ◄─────── DATA: CHUNKs ─────  │ + serial UART│  ──────────► │ Server       │
 └────────────────┘   ───────► ACK                 └──────────────┘   SENT …     └──────────────┘
```

Tags poll; the hub answers. A tag wakes, sends a tiny `POLL`, and listens for a moment. If something is queued for it, the hub streams the image and the tag writes the chunks straight into the panel controller, since there is no RAM for a frame buffer. So everything is queued — nothing is fired at a tag when you click. The link itself is reliable: sequence numbers, jittered retries, duplicate filtering and a 3-byte on-air address (details on [the wireless page](/wireless/)). The server is plain Python — `pyserial` and `pillow` are the only dependencies.

## Where to go next

- [Quickstart](/shelfkit/start) — from a blank tag to a first pushed image in numbered steps
- [The web app (ShelfKit-Server)](/shelfkit/server) — every screen, the image pipeline, the JSON API
- [InkServices apps](/shelfkit/inkservices) and [InkLayout](/shelfkit/inklayout) — write your own apps and screens
- [Firmware layout & building](/shelfkit/firmware), [the bootloader](/shelfkit/bootloader), [tag firmware](/shelfkit/tag-firmware), [hub firmware](/shelfkit/hub-firmware)
- [Host tooling](/shelfkit/tooling) — build-all, axsem-flasher, OTA send, set-id, flash read-back
- [Roadmap & gaps](/shelfkit/roadmap) — where this is going, and what honestly doesn't work yet

## Sources

- [ShelfKit-Vusion/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/README.md) — the source this page condenses
- [ShelfKit-Server/README.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/ShelfKit-Server/README.md) — the web app in depth
- [Documentation/InkServices.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Documentation/InkServices.md) and [Documentation/InkLayout.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Documentation/InkLayout.md)
