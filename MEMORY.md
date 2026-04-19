# Akin Automotive Site — Project Memory

## Project Overview
Website for **Akin Automotive**, a mechanic shop in Baldwinville, MA.
Working directory: `/Users/robbouchard/projects/akin-site`

## Business Info
- **Name:** Akin Automotive
- **Address:** 522 Baldwinville Rd, Baldwinville, MA 01436
- **Phone:** (978) 939-2300
- **Hours:** Mon–Fri 8AM–5PM, Sat–Sun Closed
- **Payment:** Visa, Mastercard, Discover, Check
- **Contact email recipient:** rob.bouch901@gmail.com

## File Structure
```
akin-site/
├── index.html       # Single-page app; all 4 sections (home/work/reviews/contact)
├── styles.css       # All styles, CSS variables for color theme
├── script.js        # SPA nav, mobile sidebar, contact form fetch to /send-message
├── server.js        # Express + nodemailer; POST /send-message → rob.bouch901@gmail.com
├── package.json     # express, nodemailer, dotenv, nodemon
├── .env.example     # Template: MAIL_USER, MAIL_PASS, PORT
├── .gitignore       # node_modules/, .env
└── README.md        # Full local testing instructions
```

## Stack
- Frontend: Vanilla HTML/CSS/JS (no build step, no framework)
- Backend: Node.js + Express + Nodemailer (Gmail SMTP via App Password)
- Email: Contact form POSTs JSON to `/send-message` on the Express server

## Color Theme (CSS vars in styles.css)
- Sidebar bg: `#0f1923` (dark navy)
- Accent/red: `#e63c2f`
- Content bg: `#f4f6f8`

## Local Testing
```bash
npm install
cp .env.example .env  # fill in Gmail + App Password
npm start             # → http://localhost:3000
```
