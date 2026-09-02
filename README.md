# 🛡️ Nivaran — Credit Resolution & Recovery Assistant

**Nivaran** is a B2C credit-resolution and recovery assistant designed for financially distressed and delinquent borrowers in India. 

It is **NOT** a lending app, loan marketplace, credit card platform, or BNPL product. Instead, it serves as a calm, trustworthy, and actionable guide to help borrowers understand their debt obligations, diagnose financial stress, select repayment resolution options, track lender requests, and rebuild their credit score step by step.

---

## 📱 Product Journey

Nivaran follows a 5-step guided recovery journey:

```
[ UNDERSTAND ] ──> [ DIAGNOSE ] ──> [ DECIDE ] ──> [ RESOLVE ] ──> [ RECOVER ]
```

1. **UNDERSTAND** — Connect credit report and view unified debt profile (Total Outstanding, Monthly EMIs, Overdue amounts, Active Loans).
2. **DIAGNOSE** — Analyze debt stress factors (EMI-to-income ratio, overdue accounts).
3. **DECIDE** — Evaluate tailored resolution options (*Restructure*, *Settle*, *Foreclose*, *Continue Repayment*).
4. **RESOLVE** — Submit restructuring/settlement requests and track live status with lenders.
5. **RECOVER** — Follow an interactive recovery roadmap and monitor credit score rebuild over time.

---

## ✨ Key Features & Screens

| Screen | Route | Description |
|---|---|---|
| **Splash / Landing** | `/` | Brand introduction, score illustration, quick value proposition |
| **Login** | `/login` | Mobile number entry with `+91` prefix validation |
| **OTP Verification** | `/otp` | 6-digit auto-advancing verification code inputs |
| **Trust & Privacy** | `/trust` | Privacy reassurance ("We never lend money", RBI guidelines) |
| **Data Connection** | `/input` | Connect credit report or enter debt data manually |
| **Credit Dashboard** | `/home` | SVG score gauge (612), debt summary metrics, active loan cards |
| **Debt Diagnosis** | `/diagnosis` | Stress breakdown, EMI ratio bar, recommended resolution cards |
| **Resolution Pathway** | `/pathway` | Side-by-side EMI comparison, step-by-step process & credit impacts |
| **Request Tracker** | `/tracker` | Interactive status stepper, status advance control, timeline notes |
| **Recovery Roadmap** | `/roadmap` | Tappable recovery checklist, real-time completion progress bar |
| **Credit Journey** | `/score` | Custom SVG score trend chart (May-Sep), 650 milestone tracker |
| **Profile** | `/profile` | User snapshot (Arjun Sharma), credit summary, security settings |

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (Custom Nivaran tokens: `#2D6A4F` green, `#F5F2EE` warm neutral, `#FEF3C7` amber)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Context API + `localStorage` persistence

---

## 🎨 Design Language

- **Mobile-First App Shell**: Centered 390px mobile viewport representation.
- **Calm & Trustworthy Palette**: Soft off-white backgrounds (`#F5F2EE`), dark charcoal typography (`#1A1A1A`), warm amber for overdue warnings (avoiding aggressive red states).
- **Custom Visuals**: Pure SVG score gauges and trend lines with zero external charting bloat.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/credresolve.git
cd credresolve

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### GitHub Pages Deployment
```bash
npm run deploy
```

---

## 📁 Repository Structure

```
CredResolve/
├── public/                # Static assets & icons
├── src/
│   ├── components/        # Reusable UI (BottomNav, ScoreGauge, ScoreChart, LoanCard)
│   ├── context/           # AppContext state management & localStorage persistence
│   ├── data/              # Mock debt, user, and resolution pathway data
│   ├── pages/             # 12 application screen components
│   ├── App.tsx            # React Router route configuration
│   ├── index.css          # Global CSS & Tailwind design tokens
│   └── main.tsx           # Application entry point
├── tailwind.config.js     # Nivaran design system configuration
├── vite.config.ts         # Vite build settings & base path setup
└── package.json           # Scripts & dependencies
```

---

## 🔒 Security & Privacy

Nivaran is built with privacy-first principles:
- No lending or loan issuance.
- No sell or transfer of borrower credit report data.
- User data and tracker state persist locally on device.
