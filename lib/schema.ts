import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.email("Please enter a valid email address"),
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  phone: z
    .string()
    .regex(
      /^\+?[0-9\s\-\(\)]+$/,
      "Phone number can only contain numbers, spaces, hyphens, and parentheses"
    )
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

const personalDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(
      /^\+?[0-9\s\-\(\)]+$/,
      "Phone number can only contain numbers, spaces, hyphens, and parentheses"
    ),
  email: z.email("Please enter a valid email address"),
});

const scheduleDetailsSchema = z.object({
  date: z.date(),
  time: z.string().min(1, "Please select a time"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type PersonalDetails = z.infer<typeof personalDetailsSchema>;
type ScheduleDetails = z.infer<typeof scheduleDetailsSchema>;

export {
  contactFormSchema,
  type ContactFormData,
  personalDetailsSchema,
  type PersonalDetails,
  scheduleDetailsSchema,
  type ScheduleDetails,
};
