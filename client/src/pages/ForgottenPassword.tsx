import { useState } from "react"

export default function ForgottenPassword() {

    const [email, setEmail] = useState<string>("");

    return(

        <div className="z-10 max-w-sm w-full rounded-2xl max-auto my-12 bg-neutral-900/80 p-6 shadow-2xl backdrop:-blur">

            <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Forgot Password</h2>

            <div className="flex flex-col gap-4">
            <input type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 rounded-md bg-neutral-100 text-black placeholder-gray-500 border-neutral-700 focus: outline-none focus: ring-2 focus:ring-orange-500"
            />

            <button className="w-full py-2 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition">Send a reset link</button>

            </div>


        </div>
    )
}