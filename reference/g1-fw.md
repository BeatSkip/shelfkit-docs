::: info
Imported verbatim from [`imagotag-g1-4.4-fw/README.md`](https://github.com/BeatSkip/imagotag-g1-4.4-fw/blob/main/README.md) — links rewritten for this site.
:::

Source from <https://github.com/andrei-tatar/imagotag-hack/tree/master/firmware/src>

To run it on the cc2510 board:

- Compile it using PlatformIO
- cd to `<project_dir>`/.pio/build/Generic8051
- Run objcopy -I ihex -O binary firmware.hex firmware.bin (names may vary)
- Upload .bin file to the board using [ESP CC Flasher](https://github.com/section77/ESP_CC_Flasher)
