import Link from "next/link";

export default function Home() {
  return (
    <main className="hero">
      <div className="content fade-in">
        <h1 className="title">Laura & Matthieu</h1>
        <p className="lead">Vous êtes invités à célébrer notre mariage</p>

        <Link href="/rsvp" className="cta" aria-label="Répondre à l'invitation">
          Répondre à l’invitation
        </Link>

        <Link
          href="/galerie"
          className="cta"
          aria-label="Galerie photos"
          style={{ marginTop: "1rem" }}
        >
          Galerie photos
        </Link>
      </div>
    </main>
  );
}
