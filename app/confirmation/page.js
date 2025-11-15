"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Confirmation() {
  const searchParams = useSearchParams();
  const presence = searchParams.get("presence");

  const isPresent = presence === "oui";

  return (
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'4rem 1rem'}}>
      <div style={{maxWidth:800, textAlign:'center'}}>

        {isPresent ? (
          <>
            <h2 style={{fontFamily:"Playfair Display, serif", fontSize:'2.2rem'}}>
              Merci 🎉 Ta réponse est bien enregistrée !
            </h2>
            <p style={{color:'#6b665f'}}>
              On est super heureux que vous soyez des nôtres ❤️  
              On a vraiment hâte d’être au jour J et de partager ce moment avec vous !
            </p>
          </>
        ) : (
          <>
            <h2 style={{fontFamily:"Playfair Display, serif", fontSize:'2.2rem'}}>
              Merci d’avoir répondu 💛
            </h2>
            <p style={{color:'#6b665f'}}>
              Tu vas nous manquer le jour J, mais on sait que tu seras avec nous par la pensée.
                On t’enverra des nouvelles et quelques beaux souvenirs 💛 ✨
            </p>
          </>
        )}

        <Link 
          href="/" 
          style={{
            display:'inline-block',
            marginTop:20,
            padding:'0.7rem 1.2rem',
            background:'#c89a4a',
            color:'#fff',
            borderRadius:999,
            textDecoration:'none',
            fontWeight:700
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
