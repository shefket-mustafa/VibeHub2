import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { forgotSchema, type ForgotPasswordType } from "../zod/forgotSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {useTranslation} from "react-i18next";

export default function ForgottenPassword() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({ resolver: zodResolver(forgotSchema) });

  const forgotHandler = async () => {
    if (!email) {
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      setError("root", {
        type: "server",
        message: result.error || "Invalid email. Try again!",
      });
    }
    const token = result.token;

    if(!token) return;

    const resetLink = `https://vibe-hub2.vercel.app/auth/reset-password/${token}`;

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { to_email: email, link: resetLink },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    alert("Check your inbox for the reset link!");
    navigate(`/auth/login`);
  };

  return (
    <div className="z-10 max-w-sm w-full rounded-2xl max-auto my-12 bg-neutral-900/80 p-4 shadow-2xl backdrop:-blur">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
      {t("auth.forgot.title")}
      </h2>

      <div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(forgotHandler)}
        >
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder={t("auth.forgot.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 rounded-md bg-neutral-100 text-black placeholder-gray-500 border-neutral-700 focus: outline-none focus: ring-2 focus:ring-orange-500"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full py-2 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition"
          >
            {isSubmitting ? t("auth.forgot.button2") : t("auth.forgot.button1")}
          </button>
        </form>
      </div>
    </div>
  );
}
