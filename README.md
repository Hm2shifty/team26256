# SWERVO FTC Team 26256 — Official Website

The open source codebase for [swervo26256.vercel.app](https://swervo26256.vercel.app), the official website of SWERVO FTC Team 26256 from St. Francis Xavier CSS, Mississauga.

---

## What's on the Site

- **Team profiles** — roster with member modals
- **Engineering notebook** — JSON-controlled entries with markdown rendering, file tree sidebar, and inline hyperlinks
- **Robot** — drivetrain specs, mechanism documentation, and build progress
- **Stats** — live FTC API telemetry updated after each competition event
- **Sponsors** — sponsorship tiers and confirmed partners
- **Gallery** — season photos
- **Portfolio** — digital version of our printed competition portfolio
- **Contact / Join** — team registration and contact form

---

## Tech Stack

- **React** (migrated from vanilla JS)
- **React Router** for client-side routing
- **react-markdown** for notebook entry rendering
- **FTC API** for live competition telemetry
- **Vercel** for deployment

---

## Project Structure

```
/public
  /assets          Static assets, images, logos
/src
  /components      Reusable components (Header, Footer, etc.)
  /pages           One file per route
  /data            JSON files controlling notebook entries and team data
```

---

## Running Locally

```bash
git clone https://github.com/SWERVO-26256/website
cd website
npm install
npm start
```

The site will be available at `http://localhost:3000`.

---

## Notebook Content

Notebook entries are controlled by JSON files in `/src/data`. Each entry supports markdown and a custom inline hyperlink syntax. To add or edit an entry, update the relevant JSON file — no code changes required.

---

## Open Source

This repository is fully open source. Other FTC teams are welcome to reference or adapt the codebase. If you do, a credit or shoutout is appreciated but not required.


[Instagram](https://www.instagram.com/ftc26256/) · [GitHub](https://github.com/SWERVO-26256) · [Website](https://swervo26256.vercel.app)
