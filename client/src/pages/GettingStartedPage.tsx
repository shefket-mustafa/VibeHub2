import { Link } from "react-router"

export default function GettingStarted() {
  return (
    <section className=" mx-auto  text-center px-4 z-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Welcome to <span className="text-orange-500">VibeHub</span>
      </h1>
    <p className="text-neutral-300 mb-8 max-w-md">
    Your space to share vibes, connect with friends, and discover new
        stories. Let’s kick things off and get you started.
      </p>
    <Link to='/auth/login' className="rounded-xl px-6 py-3 bg-orange-500 text-black font-semibold hover:bg-orange-600 transition">
    Get Started </Link>
  </section>
  );
}
