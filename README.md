# Akin Automotive — Website

A website for **Akin Automotive** in Baldwinville, MA featuring a home page, our work gallery, customer reviews, and a contact form that emails the business owner.

---

## How to Test Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later installed
- A Gmail account to send emails from (can be any Gmail — it just needs to be the "sender")

---

### Step 1 — Install Dependencies

Open a terminal in the `akin-site` folder and run:

```bash
npm install
```

---

### Step 2 — Set Up Your Email Credentials

The contact form sends email via Gmail using an **App Password**. You need to generate one:

#### Generate a Gmail App Password

1. Go to your Google Account → **Security**: https://myaccount.google.com/security
2. Make sure **2-Step Verification** is enabled (required for App Passwords)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select app: **Mail** | Select device: **Other (custom name)** → type `Akin Automotive Site`
5. Click **Generate** — copy the 16-character password shown

#### Create Your `.env` File

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:

```
MAIL_USER=your-gmail-address@gmail.com
MAIL_PASS=xxxx xxxx xxxx xxxx
```

> **Note:** The `MAIL_USER` is the Gmail address that *sends* the email. The contact form messages always go *to* `rob.bouch901@gmail.com` regardless of which Gmail you use to send.

---

### Step 3 — Start the Server

```bash
npm start
```

You should see:

```
✓ Akin Automotive site running at http://localhost:3000
```

---

### Step 4 — Open the Site

Open your browser and go to:

```
http://localhost:3000
```

You'll see the full site with the sidebar navigation. To test the contact form:

1. Click **Contact Us** in the left sidebar
2. Fill in the form fields (Name, Email, and Message are required)
3. Click **Send Message**
4. Check `rob.bouch901@gmail.com` for the email

---

### Optional: Auto-Restart on File Changes (Development Mode)

Instead of `npm start`, run:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server whenever you edit `server.js`.

---

## Project Structure

```
akin-site/
├── index.html          # Main HTML — all pages are in here
├── styles.css          # All styles
├── script.js           # Navigation + contact form (frontend)
├── server.js           # Express server + email handler (backend)
├── package.json        # Node.js project config
├── .env.example        # Template for your credentials
├── .env                # Your actual credentials (never commit this)
├── .gitignore          # Ignores node_modules and .env
└── README.md           # This file
```

## Pages

| Page | Description |
|------|-------------|
| **Home** | Welcome hero, about blurb, 8 service cards |
| **Our Work** | 6 example job cards with descriptions |
| **Reviews** | Star rating summary + 6 customer reviews |
| **Contact Us** | Business info, map, and email contact form |

## Troubleshooting

**"Email send error: Invalid login"**
→ Double-check your `MAIL_USER` and `MAIL_PASS` in `.env`. Make sure you're using an App Password, not your regular Gmail password.

**"Something went wrong" on the form**
→ The server may not be running. Check your terminal for errors and make sure `npm start` is active.

**Map doesn't show**
→ The embedded Google Map works best when the site is served over HTTP/HTTPS (not opened as a local file). It will work correctly when running through `npm start`.
