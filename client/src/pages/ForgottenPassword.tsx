import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { forgotSchema, type ForgotPasswordType } from "../zod/forgotSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function ForgottenPassword() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      },
    );

    const result = await res.json();
    if (!res.ok) {
      setError("root", {
        type: "server",
        message: result.error || "Invalid email. Try again!",
      });
    }
    const token = result.token;

    if (!token) return;

    const resetLink = `https://vibe-hub2.vercel.app/auth/reset-password/${token}`;

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { to_email: email, link: resetLink },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    alert("Check your inbox for the reset link!");
    navigate(`/auth/login`);
  };

  return (
    <section className="w-full flex justify-center py-20 px-4 z-10 min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t("auth.forgot.title")}
          </h2>
          <p className="text-neutral-400">
            Enter your email to receive a reset link
          </p>
        </div>

        <form
          className="vh-card space-y-4"
          onSubmit={handleSubmit(forgotHandler)}
        >
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}

          <div className="space-y-1">
            <label className="text-sm text-neutral-400">
              {t("auth.forgot.email")}
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="vh-input"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="vh-btn w-full text-base py-2.5"
          >
            {isSubmitting ? t("auth.forgot.button2") : t("auth.forgot.button1")}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Remember your password?{" "}
          <a
            href="/auth/login"
            className="text-orange-400 hover:underline font-semibold"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
}
