"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const nom = searchParams.get("nom");

  return (
    <div>
      <h1>Merci {nom} !</h1>
      <p>Votre réponse a bien été enregistrée.</p>
    </div>
  );
}
