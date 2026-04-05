# Ajinkya Bhosale — Cybersecurity Portfolio

A clean, minimal, and professional cybersecurity portfolio website for entry-level SOC Analyst / Security Engineer roles.

---

## 📁 Folder Structure

```
ajinkya-portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles (CSS variables, layout, components)
├── js/
│   └── main.js             # Typing effect, scroll animations, nav behavior
├── ajinkya-resume.docx     # Your resume (place here for download button)
└── README.md               # This file
```

---

## 🚀 Running Locally

### Option 1: Open directly
Just double-click `index.html` — it opens in any browser. No build step required.

### Option 2: Local dev server (recommended)

**Using VS Code Live Server:**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Opens at `http://127.0.0.1:5500`

**Using Python:**
```bash
# Python 3
cd ajinkya-portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

**Using Node.js (npx):**
```bash
cd ajinkya-portfolio
npx serve .
# Opens at http://localhost:3000
```

---

## 📤 Deployment

### GitHub Pages (Free)

1. Create a new GitHub repository (e.g. `ajinkya-portfolio` or `ajinkyainfosec.github.io`)
2. Push all files to the `main` branch:
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/ajinkyainfosec/ajinkya-portfolio.git
git push -u origin main
```
3. Go to your repo → **Settings → Pages**
4. Set **Source** to `Deploy from branch` → `main` → `/ (root)`
5. Click **Save** — your site will be live at `https://ajinkyainfosec.github.io/ajinkya-portfolio/`

> **Tip:** If you name the repo `ajinkyainfosec.github.io`, it deploys to `https://ajinkyainfosec.github.io/` directly.

---

### Netlify (Recommended — Faster + Custom Domain)

**Method 1: Drag & Drop**
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Go to **Sites** → drag your entire `ajinkya-portfolio/` folder onto the deploy zone
3. Done! You get a live URL like `https://ajinkya-portfolio-abc123.netlify.app`

**Method 2: Connect Git**
1. Push your code to GitHub
2. Go to Netlify → **Add new site → Import an existing project**
3. Connect GitHub, select your repo
4. Build settings: leave blank (static HTML, no build step)
5. Click **Deploy site**

**Custom domain (optional):**
- Go to Site settings → Domain management → Add custom domain
- Or use a free `.netlify.app` subdomain

---

## ✏️ Customization Guide

| What to change | Where |
|---|---|
| Name, role, bio | `index.html` — hero and about sections |
| TryHackMe profile link | `index.html` — update all `https://tryhackme.com` hrefs |
| Resume download | Replace `ajinkya-resume.docx` with your actual file |
| Projects / GitHub links | `index.html` — projects section `<a href="...">` |
| LinkedIn URL | `index.html` — hero links and contact section |
| Colors / fonts | `css/style.css` — `:root` CSS variables |
| Typing roles | `js/main.js` — `const roles = [...]` array |

---

## 🎨 Design Details

- **Theme:** Dark (charcoal background `#0d0f14`)
- **Fonts:** IBM Plex Mono (code/labels) + Sora (body)
- **Accent:** `#4d9fff` (blue)
- **No frameworks, no build tools** — pure HTML/CSS/JS
- **Fully responsive** — tested on mobile, tablet, desktop
- **Accessible** — semantic HTML, aria-labels, proper contrast

---

## 📧 Contact

Ajinkya Bhosale — bhosaleajinkya2205@gmail.com
