/**
 * Flashcards interativos - Cegueira Noturna (Nictalopia)
 * Vanilla JS simples e acessível
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  // Alterna o estado de flip
  function toggleFlip(card) {
    card.classList.toggle("flipped");
  }

  cards.forEach((card) => {
    // Clique com mouse / toque
    card.addEventListener("click", () => {
      toggleFlip(card);
    });

    // Teclado (Enter ou Espaço)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip(card);
      }
    });
  });
});
