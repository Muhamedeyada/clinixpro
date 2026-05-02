# ClinixPro 🏥

**A bilingual (Arabic/English) healthcare patient management system built with Next.js and Appwrite.**

ClinixPro helps small clinics replace paper-based appointment booking with a modern digital flow. Patients register online, upload their medical information, and request appointments. Clinic admins review everything from a single dashboard and confirm or cancel with one click — automatically sending the patient an SMS.

---

## ✨ Features

- 🌍 **Bilingual (Arabic/English)** — Full RTL support for Arabic with instant language switching
- 🌙 **Dark & Light Mode** — Premium theme system with CSS variable palette
- 📋 **Patient Registration** — Multi-step form with medical history, ID upload, and consent
- 📅 **Appointment Booking** — Select a doctor, pick a date/time, enter a reason
- 🔐 **Admin Dashboard** — Passkey-protected panel to manage all appointments
- 📱 **SMS Notifications** — Automatic confirmation/cancellation texts via Appwrite Messaging
- 👨‍⚕️ **Egyptian Localization** — Egyptian doctor portraits, Egypt phone prefix (+20), Arabic translations

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Full-stack framework, routing, Server Actions |
| React 19 + TypeScript | UI and type safety |
| Appwrite Cloud | Database, Auth, Storage, SMS |
| Zod + React Hook Form | Form validation |
| TanStack Table | Admin appointments table |
| Tailwind CSS 4 + shadcn/ui | Styling and UI components |
| next-intl | Arabic/English i18n |
| next-themes | Dark/light mode |
| Sentry | Error monitoring |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- An [Appwrite Cloud](https://cloud.appwrite.io) account (free tier works)

### 1. Clone and install
```bash
git clone <your-repo-url>
cd clinixpro
npm install
```

### 2. Set up Appwrite
1. Create a new Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a **Database** with two collections:
   - `patients` — fields matching the `Patient` type in `types/appwrite.types.ts`
   - `appointments` — fields matching the `Appointment` type
3. Create a **Storage bucket** for patient ID documents
4. Configure an **SMS provider** (e.g. Twilio) under Messaging → Providers
5. Generate a **Server API Key** under Settings → API Keys

### 3. Configure environment variables
Create `.env.local` in the project root:

```env
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=your_appwrite_project_id
API_KEY=your_appwrite_api_key
DATABASE_ID=your_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
DOCTOR_COLLECTION_ID=your_doctor_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
NEXT_PUBLIC_BUCKET_ID=your_storage_bucket_id
NEXT_PUBLIC_ADMIN_PASSKEY=123456
```

> ⚠️ **Never commit `.env.local`** — it contains your secret API key.

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📱 How It Works

### Patient Journey
1. **Home page** — Enter name, email, and phone number
2. **Registration** — Fill in medical history, upload ID document, give consent
3. **Book appointment** — Choose a doctor, date/time, and reason
4. **Success** — Receive confirmation; admin is notified

### Admin Journey
1. Go to `/?admin=true` and enter the 6-digit passkey
2. View all appointments in the dashboard table
3. Click **Schedule** or **Cancel** on any appointment
4. Patient automatically receives an SMS notification

---

## 🌍 Language & RTL

Click the language toggle in the top-right corner to switch between **English (LTR)** and **Arabic (RTL)**. The entire layout — forms, tables, navigation, and stat cards — flips direction automatically. Your preference is saved and restored on next visit.

---

## 📖 Full Documentation

For a complete technical reference including architecture decisions, key function explanations, Appwrite setup details, testing guide, and notes for the next developer, see:

👉 **[FULL_DOCUMENTATION.md](./FULL_DOCUMENTATION.md)**

---

## ⚠️ Security Note

The admin passkey is stored in `localStorage` using base64 encoding — this is obfuscation, not encryption. For production use, replace with a proper server-side session mechanism.

---

## 📄 License

MIT
