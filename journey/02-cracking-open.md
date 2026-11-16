# 2. Cracking the tag open

## First observations

The tags i received are **SES-ImagoTag VUSION 2.6 BWR UU340** tags. These are wireless ESL tags with an 868 MHz radio, a 2.6" e-ink display and two LEDs in the front.

<figure class="panel"><img src="/assets/img/tag-frontback.jpg" alt="Front and back of the Vusion 2.6 BWR UU340 tag PCB"><figcaption>Front and back of the UU340 board. The display connector (CN1) takes up most of the front; the MCU, NFC chip and flash sit on the back.</figcaption></figure>

## Components

To find the components and do preliminary tracing i just take my trusty Zeiss Opmi-1 microscope and start looking around. This is a great way to find the components and get a feel for the layout of the PCB.

This resulted in the following list of components:

| Part | Function | Description | Link |
|------|----------|-------------|------|
| AX8052F143 | MCU | 8-bit 8051 MCU with integrated radio | [Datasheet](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/axsem-ax8052-datasheet.PDF) |
| FM11NT081DS | NFC | NFC Forum Type 2 Tag IC | [Datasheet](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/FM11NT0X1D_ps_eng.pdf) |
| GDEW026Z39 | Display | 2.6" e-ink display module | [Datasheet](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/GDEW026Z39.pdf) |
| T.B.D | Flash | 1 Mb serial flash memory | — |

i am quite sure the last component on the list is a flash memory, but i haven't been able to reference the markings to any specific part yet. However when looking at similar products, the logical choice would be a 1 Mb serial flash memory that shares the SPI bus with the e-ink display. Later testing probably confirmed this — the flash dump in [chapter 6](/journey/06-sdcc-flashdump) reads a real JEDEC ID off exactly that chip.

Finding the NFC chip was actually quite tricky, since the markings of the chip mostly lead to a 4-pin NFC chip that is completely different. It just so happens that i'm pretty good at chinesium.

> **chi·ne·si·um** /ˌtʃaɪˈniːziəm/ *n.* informal, humorous
>
> 1. The cryptic yet technically accurate language commonly found in product descriptions, instruction manuals, and specifications from Chinese manufacturers, characterized by:
>    a. Specifications that require contextual interpretation
>    b. Technical values that exist within a flexible range of possibility
>    c. Product features described through carefully worded, albeit ambiguous phrasing
>
> *Example:* "According to the chinesium in this datasheet, the LED driver is 'compatible with standard voltages' and has a 'recommended operating current of about 350mA ±20% typical.'"
>
> *Origin:* 2010s, blend of "Chinese" + "-ium" (linguistic suffix), popularized in online commerce communities
>
> *Related:* chinesium interpretation (n.): the art of accurately determining a product's actual specifications from deliberately flexible descriptions

Back on topic: it turned out that the exact part numbering referred to a completely different product, but the **FM11NT0X1D**, where the X had to be replaced with the value on the part, was the correct part (same manufacturer, completely different product and product range — go figure). On my board the marking reads FM11NT081DS, i.e. X = 8.

## Finding connections

To find the connections of the PCB i followed my usual method of taking pictures and tracing the signals out on my iPad. This might not be the best or most efficient way, but i like it and it works for me.

<figure class="panel"><img src="/assets/img/tracing.jpg" alt="Tracing signals on an iPad over a photo of the PCB"><figcaption>Tracing signals on the iPad over a photo of the back side.</figcaption></figure>

A trick that helps a lot on a 2-layer board: take a photo of the front and a photo of the back, overlay them in a photo editor and make the front layer a bit transparent. Suddenly you can see where the front traces go and where they connect on the back layer.

<figure class="panel"><img src="/assets/img/vusion-xray.jpg" alt="X-ray style overlay of front and back of the Vusion PCB"><figcaption>The "x-ray" overlay: front photo over a semi-transparent back photo.</figcaption></figure>

Further analysis resulted in the annotated board overview — signals determined mostly by checking the datasheets of the different components and tracing from the MCU outward. Some signals were still left over; as soon as the toolchain and custom bootloader were up (see [chapter 5](/journey/05-bootloader-flasher)), uploading a simple blinky and checking the signals with a scope was enough to identify those too.

<figure class="panel"><img src="/assets/img/board-overview.jpg" alt="Annotated board overview of the Vusion 2.6 UU340 PCB"><figcaption>The annotated board overview. The resulting pin map lives in [hardware → pin map](/hardware/pinout).</figcaption></figure>

## Gotchas

- The display can be either a **GDEW026Z39** (2.6") or a **GDEW0213Z16** (2.13") depending on the tag variant — both use the same IL0373 controller, so the driver work transfers. Details in [hardware → display](/hardware/display).
- PA2 and PA5 go to transistors (U5 / U4) whose loads were not obvious from tracing alone — see [hardware → transistor lines](/hardware/transistors).

## Sources

- [ESL-Modding blog — Reverse Engineering Vusion 2.6 BWR, part 1 (components, tracing)](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/index.md)
- [ESL-Modding docs — Vusion 2.6 PCB overview](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/vusion-26/pcb-layout.mdx)
- [ESL-Modding docs — Vusion 2.6 components & pinouts](https://github.com/BeatSkip/ESL-Modding/blob/main/docs/reverse-engineering/vusion-26/pinouts.md)
- [SES-Imagotag-UU340 README + signal list](https://github.com/BeatSkip/SES-Imagotag-UU340) ([archive/signal-list.md](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/archive/signal-list.md))
- Datasheets: [AX8052](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/axsem-ax8052-datasheet.PDF), [FM11NT0X1D](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/FM11NT0X1D_ps_eng.pdf), [GDEW026Z39](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/GDEW026Z39.pdf), [GDEW0213Z16](https://github.com/BeatSkip/SES-Imagotag-UU340/blob/main/docs/GDEW0213Z16.pdf), [Vusion 2.6 tag datasheet](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/assets/vusion-26-datasheet.pdf)
