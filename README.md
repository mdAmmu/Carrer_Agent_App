<p align="center">
  <img src="./public/logo.svg" alt="Career Agent Logo" width="120"/>
</p>

<h1 align="center">🤖 Career Agent App</h1>

<p align="center">
  An AI-powered career coaching platform with interactive chat and intelligent resume analysis — powered by Google Gemini and Inngest Agent Kit.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Gemini_AI-2.0-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk"/>
</p>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Database Schema](#-database-schema)
- [License](#-license)

---

## ✨ Features

- 💬 **AI Career Chat Agent** — Interactive chatbot powered by Gemini 2.0 Flash for job search, interview prep, skill development, and career transitions
- 📄 **AI Resume Analyzer** — Upload a PDF resume and receive a detailed report with overall score, section breakdowns, strengths, weaknesses, and improvement tips
- 🔐 **Secure Authentication** — Sign-in/sign-up via Clerk with route-level protection
- 📊 **Dashboard** — Central hub to access AI tools and view analysis history
- 📜 **History Tracking** — All AI interactions and resume reports saved for future reference
- 📁 **PDF Upload & Storage** — Resumes parsed client-side, stored via ImageKit
- ⚡ **Background Processing** — AI tasks run asynchronously via Inngest

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI |
| **Authentication** | Clerk |
| **Database** | Neon (Serverless PostgreSQL) |
| **ORM** | Drizzle ORM |
| **AI Engine** | Google Gemini 2.0 Flash via Inngest Agent Kit |
| **Background Jobs** | Inngest |
| **File Storage** | ImageKit |
| **PDF Parsing** | pdf-parse |
| **Icons** | Lucide React, React Icons |

---

## 📁 Folder Structure

```
carrer_agent_app/
├── app/
│   ├── (auth)/                    # 🔐 Clerk sign-in / sign-up pages
│   ├── (routes)/
│   │   ├── dashboard/             # 📊 Dashboard & AI tool cards
│   │   │   └── _components/       # AiToolCard, ResumeUploadDialog, History
│   │   ├── ai-tools/ai-chat/      # 💬 Career chat interface
│   │   └── profile/               # 👤 User profile
│   ├── _components/               # AppHeader, AppSidebar
│   └── api/
│       ├── user/                  # User creation/lookup
│       ├── ai-career-chat-agent/  # Career chat endpoint
│       ├── ai-resume-agent/       # Resume analyzer endpoint
│       ├── history/               # History retrieval
│       └── inngest/               # Inngest webhook handler
├── components/ui/                 # shadcn/ui components
├── configs/
│   ├── db.tsx                     # Drizzle database client
│   └── schema.ts                  # Database schema
├── inngest/
│   ├── client.ts                  # Inngest client setup
│   └── functions.ts               # AI agent definitions
├── hooks/                         # Custom React hooks
├── lib/                           # Utility functions
└── public/                        # Static assets & logos
```

---

## 🔑 Environment Variables

Create a `.env` file in the root. See [`.env.example`](.env.example) for all values.

| Variable | Description | Required |
|----------|-------------|:--------:|
| `NEXT_PUBLIC_NEON_DB_CONNECTION_STRING` | Neon PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `INNGEST_SIGNING_KEY` | Inngest signing key | ✅ |
| `INNGEST_EVENT_KEY` | Inngest event key | ✅ |
| `INNGEST_SERVER_HOST` | Inngest server URL | ✅ |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | ✅ |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | ✅ |
| `IMAGEKIT_ENDPOINT_URL` | ImageKit URL endpoint | ✅ |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, or **pnpm**
- [Neon](https://neon.tech) PostgreSQL database
- [Clerk](https://clerk.com) account
- [Google AI Studio](https://aistudio.google.com) API key (Gemini)
- [Inngest](https://inngest.com) account
- [ImageKit](https://imagekit.io) account

### Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone <repository-url>
cd carrer_agent_app

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
cp .env.example .env
# ✏️ Fill in your actual credentials in .env

# 4️⃣ Push database schema to Neon
npx drizzle-kit push

# 5️⃣ Start the Inngest dev server (separate terminal)
npx inngest-cli@latest dev

# 6️⃣ Start the development server
npm run dev
```

🌐 The app will be available at **http://localhost:3000**

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| **users** | Registered user info — `id`, `name`, `email` |
| **history** | AI interaction records — resume reports & chat logs linked by `userEmail` |

---

## 📄 License

MIT
