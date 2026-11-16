# 1. The haul: from Solum to 80 Vusion tags

This journey began when i read some blog posts by [Dmitry Grinberg](https://dmitry.gr/?r=05.Projects&proj=29.+eInk+Price+Tags) and Aaron Christopher detailing their experiences with reverse engineering electronic shelf tags with e-ink displays.

It took me about 6.5 minutes before i had ordered a couple of Solum ST-GR29000 ESL tags from ebay. These tags cost me around €9 each. This wasn't a bad price at all and i was excited to get started.

After installing [OpenEPaperLink](https://github.com/OpenEPaperLink/OpenEPaperLink) on these tags i was happy with the results. i instantly foresaw myself using these on each and every box of parts in my office. However this would be quite expensive.

So, having zero impulse control or apparently no ability to do the quick math that would have told me that this would be a bad idea, i ordered 80 more tags. This time substantially cheaper tags: the **SES-ImagoTag VUSION 2.6 BWR UU340**.

## The caveat

The only difference between the two tags was that the cheaper tags had a different microcontroller on board: an **Axsem AX8052** instead of the **TI CC2510** the Solum (and most other hackable tags) use.

The main caveat is that Aaron Christopher, the maker of the OpenEPaperLink firmware, just so happens to be working for SES-imagotag, the company that makes the cheaper tags, and has no intention of making them compatible. Ever. It seems he and i disagree whether an open source firmware would benefit or harm a company. i think it would benefit them, but nonetheless i respect his decision. However this leaves me having to reinvent the wheel and make my own firmware.

> With 5 years of experience in Research & Development of embedded systems, this sounds like a fun challenge that will definitely not take up all of my free time for the foreseeable future.

## The plan

The overall plan should have been:

1. Reverse engineer the layout and connections of the PCB
2. Find the appropriate datasheets and toolchain to write my own firmware
3. Write my own firmware

Writing this halfway through the process, it definitely wasn't as straightforward as i had hoped. The latest revision of the plan is as follows:

1. Reverse engineer the layout and connections of the PCB — see [2. cracking open](/journey/02-cracking-open)
2. Find the appropriate datasheets and toolchain to write my own firmware — see [4. the toolchain saga](/journey/04-toolchain)
3. Realize that the MCU on board is EOL, documentation is scarce, debugging hardware is non-standard and hard to acquire, and the toolchain is not what i had hoped
4. Fix up the toolchain
5. Get a basic serial bootloader working, where i had to write my own flashing tool just to develop — see [5. bootloader & flasher](/journey/05-bootloader-flasher)
6. Only now "start" writing my own firmware — see [6. SDCC hello world & the flash dump](/journey/06-sdcc-flashdump)

Steps 3 and 4 turned out to be the real meal. The Axsem AX8052 line went end-of-life in December 2022, so there is no vendor support, very sparse data, and the debug hardware is Axsem's own proprietary programmer. More on that in the next pages.

## Sources

- [ESL-Modding blog — Reverse Engineering Vusion 2.6 BWR, part 1 (Introduction)](https://github.com/BeatSkip/ESL-Modding/blob/main/blog/2025-01-20-reverse-vusion-part-1/index.md)
- [OpenEPaperLink](https://github.com/OpenEPaperLink/OpenEPaperLink) (Aaron Christopher)
- [SES-Imagotag-UU340 README](https://github.com/BeatSkip/SES-Imagotag-UU340)
