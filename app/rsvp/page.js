"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../lib/supabaseClient";

export default function RSVP() {
  const router = useRouter();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    presence: "oui",
    adultes: 1,
    enfants: 0,
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("reponses_mariage").insert([
      {
        nom: form.nom,
        prenom: form.prenom,
        presence: form.presence,
        adultes: form.adultes,
        enfants: form.enfants,
        message: form.message,
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.log("SUPABASE ERROR:", JSON.stringify(error, null, 2));
      setErrorMsg("Une erreur est survenue. Merci de réessayer.");
      return;
    }

    // ✅ REDIRECTION AVEC LE PARAMÈTRE presence
    router.push(`/confirmation?presence=${form.presence}`);
  }

  /*** FORMULAIRE ***/
  return (
    <div className="hero py-20 flex justify-center relative">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-3xl relative animate-fadein border border-amber-100">

        <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800 tracking-tight">
          Réponse à l’invitation
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Merci de confirmer ta présence 🤎
        </p>

        {errorMsg && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div>
            <label className="label">Nom</label>
            <input
              className="input"
              required
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Prénom</label>
            <input
              className="input"
              required
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Nombre d’adultes</label>
            <input
              className="input"
              type="number"
              min="0"
              value={form.adultes}
              onChange={(e) =>
                setForm({ ...form, adultes: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="label">Nombre d’enfants</label>
            <input
              className="input"
              type="number"
              min="0"
              value={form.enfants}
              onChange={(e) =>
                setForm({ ...form, enfants: Number(e.target.value) })
              }
            />
          </div>

          <div className="col-span-2">
            <label className="label">Présence</label>
            <select
              className="input"
              value={form.presence}
              onChange={(e) => setForm({ ...form, presence: e.target.value })}
            >
              <option value="oui">Je serai présent(e)</option>
              <option value="non">Je ne pourrai pas venir</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="label">Message (facultatif)</label>
            <textarea
              className="input h-28"
              placeholder="Un mot pour les mariés…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-amber-600 text-white text-lg rounded-full shadow-lg hover:bg-amber-700 hover:scale-[1.03] transition-all"
              disabled={loading}
            >
              {loading ? "Envoi…" : "Envoyer ma réponse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
