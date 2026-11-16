# Roadmap & gaps

Where this is going — and, just as useful, what i am deliberately not building. Plans change; the [gaps & roadmap reference](/reference/apps-gaps) imported verbatim from the repo has the full table with chunk-by-chunk status.

## Roadmap

**More apps.** The [InkServices idea list](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Documentation/InkServices.md) has been the wishlist from day one: waste collection, commute, calendar, chores, a message board — on top of the pill tracker, weather/moon phase and hello-world that already ship. Small Python apps that own a tag's screen, update on a timer and react to an NFC tap.

**Install apps from git.** Clone a GitHub repo straight into `inkapps/`, each app running in its own process (JSON lines over stdin/stdout), installed disabled, with an **advisory AI review** of the source before you enable it. Today an app exists because a folder exists — there is no install, update or delete.

**Firmware.** Keep the NFC link and fill in the tag's own ID (right now the firmware rewrites the NFC chip at boot and the server writes the link over the radio instead), poll faster for a minute after a tap, partial refresh, and more panel sizes than 152×296.

**Integrations.** Home Assistant over MQTT, webhooks, and a persistent job queue — the in-memory queue means a server restart currently forgets pending pushes.

## Deliberately out of scope

Multi-user accounts, a drag-and-drop editor, and a native mobile app.

> The web pages are the app. A phone already has a browser; i am not writing a second one.

## Current gaps

Honest list, because a project without one is just marketing:

- **No app install/update/delete** — an app is a folder in `inkapps/`; disable/enable exists, nothing else. No metadata beyond title and description: no version, author, source URL, permissions or changelog.
- **No fleet-level app views** — which app runs on which tag is only visible per app, and you can't bind one app to several tags at once.
- **Typeless settings form** — every config field is a text input; "HH:MM" and latitude/longitude are free text with no validation.
- **Opaque timers** — no last run / next run / last error per timer; "Refresh now" runs all of them.
- **Thin delivery feedback** — "last sent" is an age; nothing shows whether the tag received the push or when it next checks in.
- **In-memory log and queue** — 200 log lines, gone on restart; pending pushes forgotten on restart.
- **Read-only stored data** — per-tag app data is viewable JSON, not editable or exportable.
- **Firmware** — no partial refresh yet; the tag doesn't put its own ID into the NFC link yet; the tag application nearly fills its 43,006 B OTA window, so features have to earn their bytes.
- **Server** — no auth (keep the admin page on localhost), apps run in the server process rather than isolated, requests from a foreign `Origin` are refused but that is the whole security model.
- **Power figures are datasheet models, not measurements** — the CR2450 drain estimate still needs metering on a real tag. See [power deep-dive](/wireless/power-deepdive) and [the findings](/wireless/power-findings).

## Open questions i haven't answered yet

- Per-app versions as git repos in the app folder, or in the main repo?
- Allow third-party apps before subprocess isolation exists?
- Which AI provider and model for the advisory safety review, and where does the key live? (Today: your own key, under Settings › AI services.)
- Phone-friendly admin UI, or desktop only?

## Sources

- [ShelfKit-Vusion/README.md — Where this is going](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/README.md)
- [.agents/skills/shelfkit-apps/references/gaps-and-roadmap.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/.agents/skills/shelfkit-apps/references/gaps-and-roadmap.md) — chunk-by-chunk plan status and observed gaps
- [Documentation/InkServices.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Documentation/InkServices.md) — the original app idea list
- [Documentation/plans/2026-11-11-inkservices.md](https://github.com/BeatSkip/ShelfKit-Vusion/blob/main/Documentation/plans/2026-11-11-inkservices.md) — the implementation plan
