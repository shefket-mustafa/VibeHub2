import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../zod/loginSchema";
import { useUser } from "../hooks/user";

export default function AuthPage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const { setUser } = useUser();
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
        Sign in to <span className="text-orange-500">VibeHub</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-neutral-800 p-5 space-y-4 bg-neutral-900/30"
      >
        {errors.root && (
          <p className="text-sm text-red-400">{errors.root.message}</p>
        )}{" "}
        {/* errors caught by setError on api response */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-neutral-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full rounded-lg bg-neutral-200 border border-neutral-800 px-3 py-2 outline-none focus:border-orange-500"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm text-neutral-300">
              Password
            </label>
            <Link
              to="/auth/forgot"
              className="text-sm text-orange-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full rounded-lg bg-neutral-200 border border-neutral-800 px-3 py-2 outline-none focus:border-orange-500"
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl px-4 py-2 cursor-pointer bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-800" />
          </div>
         
        </div>
      </form>

      <p className="text-sm text-neutral-400 text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-orange-400 hover:underline">
          Create a profile
        </Link>
      </p>
    </section>
  );
}
