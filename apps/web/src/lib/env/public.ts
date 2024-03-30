import { z } from "zod";

const publicEnvSchema = z.object({
  WALLETCONNECT_PROJECT_ID: z.string(),
  BASE_URL: z.string().optional(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "c8f5568be13e77fcd2aec2a714b52208",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
};

publicEnvSchema.parse(publicEnv);
