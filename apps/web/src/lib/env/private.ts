import { z } from "zod";

const privateEnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
  EMAIL_ACCOUNT: z.string().email(),
  EMAIL_PASSWORD: z.string(),
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  POSTGRES_URL: process.env.POSTGRES_URL!,
  EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT!,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!,
};

privateEnvSchema.parse(privateEnv);
