export default function About() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center text-neutral-200">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">About VibeHub</h1>
  
        <p className="text-lg text-neutral-300 leading-relaxed mb-8">
          VibeHub is a social platform where authenticity meets community. 
          Built with <span className="text-orange-400 font-semibold">React, Express, and MongoDB</span>, 
          it’s designed to connect people through meaningful posts, discussions, 
          and shared vibes. Whether you’re here to share your story, engage with others, 
          or simply explore, VibeHub provides a space for everyone.
        </p>
  
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">✨ Mission</h2>
            <p className="text-sm text-neutral-400">
              Our mission is to empower creators and everyday users with a platform 
              that prioritizes community, freedom, and good vibes.
            </p>
          </div>
  
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">⚡ Technology</h2>
            <p className="text-sm text-neutral-400">
              VibeHub is powered by modern technologies: 
              <span className="text-neutral-200"> React + TypeScript</span> for the frontend, 
              <span className="text-neutral-200"> Express + MongoDB</span> for the backend, 
              and styled with <span className="text-neutral-200">TailwindCSS</span>.
            </p>
          </div>
  
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">🌍 Vision</h2>
            <p className="text-sm text-neutral-400">
              We believe in creating a safe and engaging space where ideas, 
              creativity, and conversations thrive — shaping the social platforms of tomorrow.
            </p>
          </div>
        </div>
  
        <p className="mt-12 text-neutral-400 text-sm">
          Built with ❤️ by the VibeHub team
        </p>
      </section>
    );
  }
  