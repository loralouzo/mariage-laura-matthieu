"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const nom = searchParams.get("nom");
  const presence = searchParams.get("presence");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-10 bg-gradient-to-b from-[#f7f3ee] to-white">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-[#d4b28c]/40 p-8 text-center">
        
        {/* Ligne or décorative */}
        <div className="w-20 h-1 bg-[#d4b28c] mx-auto mb-6 rounded-full"></div>

        <h1 className="text-3xl font-serif text-[#9fb9a8] mb-4 tracking-wide">
          Merci {nom} ✨
        </h1>

        {presence === "oui" ? (
          <p className="text-lg leading-relaxed text-gray-700 font-light">
            Merci pour ta réponse ! <br />
            Nous sommes ravis et impatients de célébrer cette journée 
            <span className="text-[#d4b28c] font-medium"> avec toi</span>. <br />
            Le grand jour approche… et on a tellement hâte d’y être ensemble 
            <span className="text-[#9fb9a8]"> ✨</span>
          </p>
        ) : (
          <p className="text-lg leading-relaxed text-gray-700 font-light">
            Merci pour ta réponse ! <br />
            Tu vas beaucoup nous manquer le jour J, mais nous savons que tu 
            seras avec nous par la pensée. <br />
            Nous t’enverrons quelques beaux souvenirs 
            <span className="text-[#d4b28c]"> 💛</span>
          </p>
        )}

        {/* Petite déco florale / sauge */}
        <div className="mt-8 opacity-80">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mx-auto">
            <path
              d="M12 2C10 5 8 7 4 8c0 5 3 9 8 12 5-3 8-7 8-12-4-1-6-3-8-6z"
              stroke="#9fb9a8"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
