To Test Locally

  cd /Users/robbouchard/projects/akin-site
  npm install
  cp .env.example .env

  Then open .env and fill in:
  - MAIL_USER — a Gmail address to send from
  - MAIL_PASS — a Gmail App Password (not your regular password — see README for how to generate one in 2 minutes)

  npm start
  # → http://localhost:3000

  The contact form will send emails to rob.bouch901@gmail.com. The full step-by-step App Password setup is in the README.md.