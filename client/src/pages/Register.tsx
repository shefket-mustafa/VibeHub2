import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    const result = await res.json();

    if (!res.ok) {
      setError("root", {
        type: "server",
        message: result.error || "Registration failed! Try again!",
      });
      return;
    }

    navigate("/auth/login");
  };

  return (
    <section className="w-full max-w-sm mx-auto z-10">
      <h1 className="text-3xl font-bold text-center mb-6 brand">
        {t("auth.register.title")}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
        {errors.root && <p className="text-red-400">{errors.root.message}</p>}

        <div className="space-y-1">
          <label htmlFor="username" className="text-sm muted">
            {t("auth.register.username")}
          </label>
          <input
            id="username"
            type="text"
            placeholder={t("auth.register.usernamePlaceholder")}
            {...register("username")}
            className="form-input"
          />
          {errors.username && (
            <p className="text-xs text-red-400">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm muted">
            {t("auth.register.email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="form-input"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm muted">
            {t("auth.register.password")}
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="form-input"
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm muted">
            {t("auth.register.confirmPassword")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="form-input"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary"
        >
          {isSubmitting
            ? t("auth.register.button2")
            : t("auth.register.button1")}
        </button>
      </form>

      <p className="text-sm muted text-center mt-4">
        {t("auth.register.haveAccount")}
        {"  "}
        <Link to="/auth/login" className="brand cursor-pointer hover:underline">
          {t("auth.register.signIn")}
        </Link>
      </p>
    </section>
  );
}
