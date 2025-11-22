"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RSVP() {
  const router = useRouter();

  useEffect(() => {
    const authorized = sessionStorage.getItem("authorized");
    if (!authorized) router.push("/login");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("reponses_mariage").insert([
      {
        ...form,
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      setErrorMsg("Une erreur est survenue. Merci de réessayer.");
      return;
    }

    router.push(`/confirm?presence=${form.presence}`);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: "24px",
          padding: "3rem",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          border: "1px solid rgba(200,170,120,0.4)",
          display: "grid",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Réponse à l’invitation
        </h1>

        {errorMsg && (
          <div style={{ color: "red", textAlign: "center" }}>{errorMsg}</div>
        )}

        <input
          placeholder="Nom"
          required
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input
          placeholder="Prénom"
          required
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <input
          type="number"
          min="0"
          value={form.adultes}
          onChange={(e) => setForm({ ...form, adultes: Number(e.target.value) })}
          placeholder="Nombre d’adultes"
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <input
          type="number"
          min="0"
          value={form.enfants}
          onChange={(e) => setForm({ ...form, enfants: Number(e.target.value) })}
          placeholder="Nombre d’enfants"
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <select
          value={form.presence}
          onChange={(e) => setForm({ ...form, presence: e.target.value })}
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value="oui">Je serai présent(e)</option>
          <option value="non">Je ne pourrai pas venir</option>
        </select>

        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Message (facultatif)"
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc", minHeight: "100px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.9rem 2.2rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "background 0.2s ease",
          }}
        >
          {loading ? "Envoi…" : "Envoyer ma réponse"}
        </button>
      </form>
    </main>
  );
}
