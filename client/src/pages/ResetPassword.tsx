import { useForm } from "react-hook-form";
import { resetSchema, type resetPasswordType } from "../zod/resetSchema";

import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPassword() {
  const { token } = useParams<string>();
  const navigate = useNavigate();
  const resetToken = token;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordType>({ resolver: zodResolver(resetSchema) });

  const onSubmit = async (data: resetPasswordType) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgotten-password/${resetToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        },
      );
      const result = await res.json();

      if (!res.ok) {
        setError("root", {
          type: "server",
          message: result.error || "Reset password failed!",
        });
        return;
      }

      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full flex items-center justify-center py-20 px-4 z-10 min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t("resetPass.title")}
          </h2>
          <p className="text-neutral-400">
            Create a new password for your account
          </p>
        </div>

        <form className="vh-card space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}

          <div className="space-y-1">
            <label className="text-sm text-neutral-400">
              {t("resetPass.pass")}
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="vh-input"
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-400">
              {t("resetPass.confirmPass")}
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="vh-input"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="vh-btn w-full text-base py-2.5"
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
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
