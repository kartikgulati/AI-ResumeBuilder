import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
    POSTGRES_URL_NO_SSL: z.string().min(1),
    POSTGRES_PRISMA_URL: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISH_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).url(),
    // NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"), // Added default
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISH_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO_MONTHLY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  skipValidation: process.env.NODE_ENV === "development",  // Skip validation in development
});