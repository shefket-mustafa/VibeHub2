import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../zod/loginSchema";
import { useUser } from "../hooks/user";
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const { setUser } = useUser();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError("root", {
          type: "server",
          message: result.error || "Login failed. Try again.",
        });
        return;
      }
      setUser(result.user);
      localStorage.setItem("token", result.token);
      navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center max-w-sm mx-auto z-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {t("auth.login.title")} <span className="text-orange-500">VibeHub</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
        {errors.root && (
          <p className="text-sm text-red-400">{errors.root.message}</p>
        )}{" "}
        {/* errors caught by setError on api response */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm muted">
            {t("auth.login.email")}{" "}
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm muted">
              {t("auth.login.password")}{" "}
            </label>
            <Link
              to="/auth/forgot"
              className="text-sm text-orange-500 hover:underline"
            >
              {t("auth.login.forgot")}
            </Link>
          </div>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary"
        >
          {isSubmitting ? t("auth.login.button2") : t("auth.login.button1")}
        </button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-800" />
          </div>
        </div>
      </form>

      <div className="flex gap-3 justify-center">
        <span className="text-sm muted text-center mt-4">
          {t("auth.login.noAccount")}
          {"  "}
          <Link to="/auth/register" className="brand hover:underline">
            {t("auth.login.createProfile")}
          </Link>
        </span>
      </div>
    </section>
  );
}
