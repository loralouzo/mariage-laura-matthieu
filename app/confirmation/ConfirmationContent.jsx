"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const nom = searchParams.get("nom");
  const present = searchParams.get("present");

  const isPresent = present === "oui";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12 bg-[linear-gradient(135deg,#f9f7f3,#e6dfd2)]">
      <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl p-8 max-w-xl w-full border border-[#d8c9b1]">

        <h1 className="text-center text-3xl mb-6 font-serif text-[#5c6b57]">
          Merci {nom} !
        </h1>

        {isPresent ? (
          <p className="text-center text-lg leading-relaxed text-[#5c6b57] font-light">
            Nous sommes impatients de célébrer cette journée avec toi. <br />
            Le grand jour approche… et on a hâte d’y être ensemble ✨
          </p>
        ) : (
          <p className="text-center text-lg leading-relaxed text-[#5c6b57] font-light">
            Tu vas nous manquer le jour J, mais nous savons que tu seras avec
            nous par la pensée. <br />
            On t’enverra de beaux souvenirs 💛
          </p>
        )}
      </div>
    </div>
  );
}
