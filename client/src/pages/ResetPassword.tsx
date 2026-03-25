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
    <div className="z-10 max-w-sm w-full mx-auto my-12 card">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
        {t("resetPass.title")}
      </h2>

      <div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder={t("resetPass.pass")}
            className="form-input"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder={t("resetPass.confirmPass")}
            className="form-input"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <button className="w-full btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
