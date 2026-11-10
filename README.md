# 0.1% Community ⚡ (Elite Digital Guild & VIP WhatsApp Network)

A high-performance web platform engineered for **0.1% Community** — where ambitious digital creators, video editors, high-ticket freelancers, and software builders learn, earn, and master high-income skills in closed VIP WhatsApp circles.

---

## 🌟 Production Features & Architecture

1. **Pure White Design System**:
   - 100% clean white canvas (`#ffffff`), solid dark text (`#091540`), solid dark pill capsule buttons (`rounded-full`), and zero gradients or blurs.
   - Built on **Next.js 14 App Router** + **Tailwind CSS**.
   - First Load JS (~87 kB) with instant page transitions.

2. **Direct Business UPI Checkout (₹999 Lifetime)**:
   - Zero gateway commission cut. Payments go 100% direct to the business account:
     - **Official UPI VPA**: `9839024329@ptyes`
     - **Payee Name**: `Pinki Pandey`
     - **Course Fee**: `₹999` (Lifetime Access)
   - Dynamic deep-link intent for Google Pay, PhonePe, Paytm, BHIM, and Cred.
   - 12-digit UPI UTR receipt verification & mandatory payment proof screenshot upload.

3. **Supabase PostgreSQL Realtime Backend**:
   - Connected to project `isuuiivblrjlvwuoewzh` (Mumbai `ap-south-1`).
   - Production tables:
     - `profiles`: Student registry, bio, handles, Pro status.
     - `enrollments`: Realtime transaction triage, phone numbers, UTR codes, receipt screenshots.
     - `results`: Wall of Fame milestones with student Gmail direct email confirmation.
     - `tracks`: The 4 core masterclasses.

4. **Wall of Fame (Zero Fake Reviews)**:
   - Milestones showcase real student earnings, platform, and client country.
   - Every published review prominently features the student's Gmail with a direct `(Ask & Confirm)` email link.

5. **Executive Admin Command Center (`/admin`)**:
   - Secure server-side passcode authentication (`/api/admin/auth`).
   - Manual WhatsApp VIP Onboarding Bridge: 1-click WhatsApp Web launch with pre-filled welcome message.
   - UTR copy buttons, receipt image preview modal, and instant status updates.

---

## 🚀 Environment Variables (for Vercel & Local)

Add these in your **Vercel Project Settings ➔ Environment Variables**:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (`https://isuuiivblrjlvwuoewzh.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Publishable / Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Secret / Service Role Key |
| `ADMIN_PASSCODE` | Admin access passcode (default: `admin01`) |

---

## 📦 Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```
