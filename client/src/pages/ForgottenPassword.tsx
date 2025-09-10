import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function ForgottenPassword() {

    const [email, setEmail] = useState<string>("");

    const forgotHandler = async () => {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email})
        });

        const result = await res.json();
        if(!res.ok){
            alert("Failed to reset ")
            return
        }
        
        const resetLink = `https://vibe-hub2.vercel.app/reset-password/${result.token}`;

        await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            { to_email: email, link: resetLink},
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        
        alert("Check your inbox for the reset link!")
    }

    return(

        <div className="z-10 max-w-sm w-full rounded-2xl max-auto my-12 bg-neutral-900/80 p-6 shadow-2xl backdrop:-blur">

            <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Forgot Password</h2>

            <div className="flex flex-col gap-4">
            <input  type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 rounded-md bg-neutral-100 text-black placeholder-gray-500 border-neutral-700 focus: outline-none focus: ring-2 focus:ring-orange-500"
            />

            <button onClick={forgotHandler} className="w-full py-2 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition">Send a reset link</button>

            </div>


        </div>
    )
}