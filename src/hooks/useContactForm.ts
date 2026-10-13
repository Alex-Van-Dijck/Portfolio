import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

type Status = "idle" | "loading" | "success" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const schema = yup.object({
  name: yup.string().trim().required("Please enter your name").max(80),
  email: yup
    .string()
    .trim()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  message: yup
    .string()
    .trim()
    .required("Please enter a message")
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message should be at most 2000 characters"),
});

export const useContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setStatus("loading");
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: values.name.trim(),
            reply_to: values.email.trim(),
            message: values.message.trim(),
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
        setStatus("success");
      } catch (err) {
        console.error("EmailJS send failed:", err);
        setStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const honeypot = new FormData(e.currentTarget).get("website");
    if (honeypot) {
      e.preventDefault();
      setStatus("success");
      return;
    }
    formik.handleSubmit(e);
  };

  return { formik, status, handleSubmit };
};
