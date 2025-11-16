import Link from "next/link";

export default function Home() {
  return (
    <main className="hero">
      <div className="content fade-in">
        <h1 className="title">Laura & Matthieu</h1>
        <p className="lead">Vous êtes invités à célébrer notre mariage</p>

        {/* Bouton RSVP */}
        <Link 
          href="/rsvp" 
          className="cta" 
          aria-label="Répondre à l'invitation"
        >
          Répondre à l’invitation
        </Link>

        {/* Bouton Galerie Photos */}
        <Link
          href="/galerie"
          className="cta"  // ← même classe que les autres pour uniformité
          style={{
            marginTop: "1rem", // espace entre les boutons
          }}
        >
          Galerie photos
        </Link>

      </div>
    </main>
  );
}
