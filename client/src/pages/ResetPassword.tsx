import { useForm } from "react-hook-form";
import { resetSchema, type resetPasswordType } from "../zod/resetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";



export default function ResetPassword() {
  const { token } = useParams<string>();
  const navigate = useNavigate();
    const resetToken = token


  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isSubmitting}} = 
    useForm<resetPasswordType>({resolver: zodResolver(resetSchema)});

  const onSubmit = async (data: resetPasswordType) => {

    
   
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgotten-password/${resetToken}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({password: data.password})
        })
        const result = await res.json();

        if(!res.ok){
            setError("root", {
                type: "server",
                message: result.error || "Reset password failed!"
            })
            return
        }

        navigate("/auth/login")

    }catch(err){

        console.error(err)
    }
  };

  return (
    <div className="z-10 max-w-sm w-full rounded-2xl max-auto my-12 bg-neutral-900/80 p-6 shadow-2xl backdrop:-blur">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
        Reset Password
      </h2>

      <div >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (<p className="text-sm text-red-500">{errors.root.message}</p>)}

          <input
            {...register("password")}
            type="password"
            placeholder="******"
            className="w-full py-2 px-3 rounded-md bg-neutral-100 text-black placeholder-gray-500 border-neutral-700 focus: outline-none focus: ring-2 focus:ring-orange-500"
          />
          {errors.password && (<p className="text-sm text-red-500" >{errors.password.message}</p>)}
          <input
          {...register("confirmPassword")}
            type="password"
            placeholder="******"
            className="w-full py-2 px-3 rounded-md bg-neutral-100 text-black placeholder-gray-500 border-neutral-700 focus: outline-none focus: ring-2 focus:ring-orange-500"
          />
           {errors.confirmPassword && (<p className="text-sm text-red-500" >{errors.confirmPassword.message}</p>)}

          <button className="w-full py-2 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition"
          disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
