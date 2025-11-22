import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
