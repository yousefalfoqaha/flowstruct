import { z } from 'zod/v4';

export const LoginSchema = z.object({
  username: z.string().trim().nonempty().min(1),
  password: z.string().trim().nonempty().min(1),
});

export const userDetailsSchema = z.object({
  username: z.string().trim().nonempty().min(3).max(20),
  email: z.email().nonempty().trim(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Please provide the current password.' }),

    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      }),

    confirmPassword: z.string().min(1, { message: 'Please confirm your new password.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New and confirmed passwords must be the same.',
    path: ['confirmPassword'],
  });
