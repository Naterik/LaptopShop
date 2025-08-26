import { isExistEmail } from "services/client/auth.services";
import * as z from "zod";

const passwordSchema = z
    .string()
    .min(3, { message: "Password  tối thiểu 3 ký tự" })
    .max(20, { message: "Password  tối đa 20 ký tự" })
//   .refine((password) => /[A-Z]/.test(password), {
//     message: "uppercaseErrorMessage",
//   })
//   .refine((password) => /[a-z]/.test(password), {
//     message: "lowercaseErrorMessage",
//   })
//   .refine((password) => /[0-9]/.test(password), { message: "numberErrorMessage" })
//   .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: "specialCharacterErrorMessage",
//   });

const emailSchema = z.string().email("Email không đúng định dạng").trim()
    .min(1, { message: "Email không được để trống" })
    .refine(async (email) => {
        const existUser = await isExistEmail(email);
        return !existUser
    }, {
        message: "Email đã tồn tại",
        path: ["exit-email"]
    })

export const UserSchema = z
    .object({
        username: emailSchema,
        fullName: z
            .string()
            .trim()
            .min(1, { message: "Họ và tên không được để trống" }),
        confirmPassword: z
            .string()
            .trim()
            .min(1, { message: "Vui lòng xác nhận mật khẩu" }),
        password: passwordSchema
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });


export type TUserSchema = z.infer<typeof UserSchema>;