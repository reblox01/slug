<div align="center">
  <a href="https://slu9.vercel.app">
    <img
      src="https://raw.githubusercontent.com/reblox01/slug/refs/heads/main/public/images/logo_svg.svg"
      alt="Slug Logo"
      height="64"
    />
  </a>
  <p></p>
  <p>
    <b>
      An open-source URL shortener built with T3 Stack.
    </b>
  </p>

<a href="https://slu9.vercel.app/dashboard">Dashboard</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="#-roadmap">Roadmap</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="#-getting-started">Contribute</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://github.com/reblox01/slug/issues/new/choose">Create issue</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://twitter.com/arosck1">X/Twitter</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://sohailkoutari.com">Website</a>

<div align="center">
<a href="https://slu9.vercel.app">
<img src="public/images/screenshot_png.png">
</a>
<p></p>
</div>

![Next.js Badge](https://img.shields.io/badge/Next.js&nbsp;14-000?logo=nextdotjs&logoColor=fff&style=flat)
![Turso Badge](https://img.shields.io/badge/Turso-4FF8D2?logo=turso&logoColor=000&style=flat)
![Check workflow](https://github.com/pheralb/slug/actions/workflows/ci.yml/badge.svg)
![GitHub stars](https://img.shields.io/github/stars/pheralb/slug)
![GitHub releases](https://img.shields.io/github/release/pheralb/slug)
![GitHub issues](https://img.shields.io/github/issues/pheralb/slug)
![GitHub license](https://img.shields.io/github/license/pheralb/slug)

</div>

## 👨‍🚀 Introduction

[**Slug**](slu9.vercel.app) is a service that offers to shorten urls in a simple, fast and secure way. It's built with [**T3 Stack**](https://create.t3.gg/), a web development stack made by [**Theo**](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack **typesafety**.

> Inspired by and based on work from [pheralb/slug](https://github.com/pheralb/slug.git). Thanks to Pheralb for the original project and ideas.

This project uses the following technologies:

- [**create-t3-app**](https://create.t3.gg) - The best way to start a full-stack, typesafe Next.js app.
- [**Next.js 14 App Router**](https://nextjs.org/) - The React Framework for the Web.
- [**Auth.js v5**](https://authjs.dev/) - Authentication for the Web (OAuth & Credentials).
- [**Prisma 7**](https://prisma.io) - A next-generation Node.js and TypeScript ORM.
- [**Turso**](https://turso.tech/) (SQLite) + [**libSQL**](https://github.com/tursodatabase/libsql) - SQLite for Production.
- [**Next.js Server Actions**](https://nextjs.org/docs/api-reference/server-actions) - Asynchronous functions that are executed on the server.
- [**TailwindCSS**](https://tailwindcss.com) + [**shadcn/ui**](https://ui.shadcn.com) & [**Radix Primitives**](https://www.radix-ui.com) - Design System.
- [**Lucide Icons**](https://lucide.dev) + [**svgl**](https://svgl.app) - Beautiful SVG icons & logos for the web.

### ✨ Features

- **Quick Shortening**: Create short URLs in seconds.
- **2FA Security**: Protect your account with Two-Factor Authentication.
- **Password Protected Links**: Secure your short URLs with a password.
- **QR Code Support**: Generate QR codes for easy sharing.
- **Command Palette (Cmd+K)**: Fast navigation and search across the app.
- **Link Analytics**: Track clicks and usage for your links.
- **Tags Management**: Organize your links with custom tags.
- **Modern Landing Page**: Redesigned Hero, Stats, and Testimonials sections.
- **Link Limits**: Managed link limits based on user settings.
- **Account Management**: Change name, email, or delete your account.

> ⚠️ This is a community project, not associated with [Vercel](https://vercel.com/).

## 🚀 Getting Started

**Requirements:**

- [x] [Node.js](https://nodejs.org) (+v18.x) installed.
- [x] [pnpm](https://pnpm.io) (v8+) installed.
- [x] [Turso CLI](https://docs.turso.tech/cli/install) installed (for Windows users, it's necessary to [activate WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install)).
- [x] [Visual Studio Code](https://code.visualstudio.com) with the recommended extensions installed (ESLint, Prettier, Tailwind CSS IntelliSense).

**Steps:**

1. Fork this project:

- [Click here](https://github.com/reblox01/slug/fork).

2. Clone the repository:

```bash
git clone git@github.com:reblox01/slug.git
```
or
```bash
git clone https://github.com/reblox01/slug.git
```

3. Install dependencies:

```bash
# Install pnpm globally if you don't have it:
npm install -g pnpm

# and install dependencies:
pnpm install
```

4. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following [schema](https://github.com/reblox01/slug/blob/main/src/env/schema.mjs#L8).

```bash
# Database:
DATABASE_URL= # "file:./prisma/dev.db"
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

# Auth.js =>
AUTH_SECRET=

# Github Provider =>
GITHUB_ID=
GITHUB_CLIENT_SECRET=

# Google Provider =>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Database:**

- [**Create** a new database with Turso](https://docs.turso.tech/cli/db/create).
- [Get Turso **Auth Token**](https://docs.turso.tech/cli/auth/token).
- [Get Turso **Database URL**](https://docs.turso.tech/cli/db/show).

**Auth.js:**

- [Get Auth.js **Secret**](https://authjs.dev/getting-started/installation#setup-environment).
- ``AUTH_URL`` is the URL of your Auth.js API, for example, ``/api/auth``. You can change it in the [**``auth.ts`` file**](https://github.com/reblox01/slug/blob/next/src/auth.ts#L20).

**Github Credentials:**

- [Create a new OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

**Google Credentials:**

- [Create a new OAuth 2.0 App from Google API Console](https://developers.google.com/identity/protocols/oauth2#1.-obtain-oauth-2.0-credentials-from-the-dynamic_data.setvar.console_name-.).

5. Generate a new migration file with Prisma:

```bash
pnpm db:migrate
```

6. Insert the migration data into the Turso database. To do this, go to ``package.json``, modify the ``db:push`` command with the name of the migration folder (2024***xxxxxxxxxx***_init) and run it in your terminal:

```bash
pnpm db:push
```

7. Run:

- Development server:

```bash
pnpm dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser 🚀

- Prisma Studio:

```bash
pnpm db:studio
```

and  open [http://localhost:5555](http://localhost:5555) with your browser ✨

## 🔭 Roadmap

This is the roadmap I will be following for the complete migration to v3:

> - *✅* = Stable, completed.
> - *🔔* = Stable, but unexpected errors may appear.
> - *⚙️* = In progress.

⬆️ **Known issues:**

- ✅ Fix issue when logging in with different provider but with the same email. Redirect to an existing route in the app ([authjs error](https://authjs.dev/reference/core/errors#accountnotlinked)).

⬆️ **Dependencies:**

- ✅ Update `@prisma/adapter-libsql`, `@prisma/client` & `prisma` to Prisma 7.
- ✅ Update `authjs` to v5.

⬆️ **Auth:**

- ✅ Sign In with Github.
- ✅ Sign In with Google.
- ✅ Sign In with Email/Password.
- ✅ Two-Factor Authentication (2FA).

⬆️ **Middleware:**

- ✅ Redirect with `/*` and `/s/*`.
- ✅ Separate public, protected & authentication routes.

⬆️ **Dashboard (main):**

- ✅ Create a new short URL.
- ✅ List all shorted URLs.
- ✅ Delete a shorted URL.
- ✅ Update a shorted URL.
- ✅ Expiration date for links.
- ✅ Password protect a link.
- ✅ QR Code generation.
- ✅ Command Palette (Cmd+K).

⬆️ **Dashboard (tags):**

- ✅ Add search links by tags in the dashboard.
- ✅ Create a new tag.
- ✅ Delete a tag.
- ✅ Update the tags of a link.

⬆️ **Dashboard (settings):**

- ✅ Change name.
- ✅ Change email.
- ✅ Delete account.
- ✅ Download all links data.
- ✅ Manage link limits and status.

## ✌️ Contributing

<a href="https://github.com/pheralb/slug/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pheralb/slug" />
</a>

<p></p>

## Support

**If you appreciate my work and want to support my open-source contributions:**

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/arosck1)
[![Sponsor](https://img.shields.io/badge/GitHub%20Sponsors-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/reblox01)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/sohailkoutari)

## ☁️ Deploy on Vercel

- ✅ [slu9.vercel.app](https://slu9.vercel.app/).

## 🔑 License

- [GPL-3.0 license](https://github.com/reblox01/slug/blob/main/LICENSE).
