import * as z from "zod";

export const PasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,}$/,
      {
        message:
          "Password must contain at least 8 characters, one uppercase, one number and one special character.",
      },
    ),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, {
      message: "Email must be at least 3 characters long",
    })
    .max(65, {
      message: "Email must be at most 65 characters long",
    }),
});

export const NameSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be at most 50 characters long",
    }),
});

export const SignInSchema = EmailSchema.merge(PasswordSchema);

export const SignUpSchema = EmailSchema.merge(PasswordSchema).merge(NameSchema);

export type SignInSchema = z.infer<typeof SignInSchema>;
export type SignUpSchema = z.infer<typeof SignUpSchema>;
