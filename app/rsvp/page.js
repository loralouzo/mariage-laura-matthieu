"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../lib/supabaseClient";

export default function RSVP() {
  const router = useRouter();

  // 🔒 Vérification du code secret validé
  useEffect(() => {
    const authorized = sessionStorage.getItem("authorized");
    if (!authorized) {
      router.push("/login");
    }
  }, [router]);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    presence: "oui",
    adultes: 1,
    enfants: 0,
    message: "",
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

    router.push(`/confirmation?presence=${form.presence}`);
  }

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

          {/* ⭐ Bouton uniforme style “Retour à l’accueil” */}
          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.9rem 2.2rem",
                background: "#c89a4a",
                color: "#fff",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.5px",
                fontSize: "1.15rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "background 0.2s ease-in-out, transform 0.15s ease",
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.background = "#b38940";
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.background = "#c89a4a";
              }}
            >
              {loading ? "Envoi…" : "Envoyer ma réponse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
