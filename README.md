# AI Resume Builder

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />
</div>

<br />

AI Resume Builder is a modern, high-performance web application designed to help job seekers create professional, ATS-friendly resumes in minutes. By leveraging the power of AI, users can auto-generate impactful summaries, tailor their work experiences, and visualize their resume in a pristine, live-preview environment.

## ✨ Features

- 🤖 **AI-Powered Content Generation:** Leverage OpenAI to auto-write or improve resume summaries, work experiences, and skills.
- 👀 **Real-time Live Preview:** Instantly see how your resume looks as you build it with dynamic scaling and modern UI components.
- 🎨 **Extensive Customization:** Choose from various color palettes, border styles, and structures to match your personal brand.
- 🔒 **Secure Authentication:** Integrated with Clerk for seamless, robust, and secure user logic.
- 💳 **Premium Subscriptions:** Stripe integration to offer premium features such as advanced AI generation or premium layouts.
- ☁️ **Cloud Storage:** Vercel Blob is used to effortlessly store user profile photos and related assets.
- 🏗️ **Drag and Drop Workflow:** Integrated with `@dnd-kit/core` for intuitive content ordering.

## 🛠️ Tech Stack

This project is built using a modern, scalable stack:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) & React Hook Form
- **Form Validation:** [Zod](https://zod.dev/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Payments & Pricing:** [Stripe](https://stripe.com/)
- **AI Integration:** [OpenAI API](https://openai.com/)
- **File Storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

## 🔐 Authentication

User authentication and session management are powered by **Clerk**. Clerk provides a drop-in UI and secure APIs for signing up, logging in, and managing user profiles. The app protects private routes (like the resume editor and billing pages) ensuring that user data remains strictly confidential and tied to their authenticated account.

## 💰 Pricing & Monetization

This platform includes premium capabilities monetized via **Stripe**. 
- **Free Tier:** Users can build and start structuring a standard resume.
- **Premium Tier (Pro Status):** Users can subscribe or pay-per-use to unlock advanced AI generation capabilities, bypass restrictions, and access premium stylization features. Stripe webhooks keep the Prisma database in perfect sync with users' subscription status.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm/yarn/pnpm installed. You also need to set up environment variables for Clerk, Prisma (Database URL), Stripe, OpenAI, and Vercel Blob.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the necessary secret keys (Clerk, Stripe, Prisma DB, OpenAI, Vercel Blob).

4. Apply Database Migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.
