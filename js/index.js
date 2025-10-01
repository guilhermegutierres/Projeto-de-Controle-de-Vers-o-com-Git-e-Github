// js/index.js
function mostrarPopup() {
  const el = document.getElementById("popup-favorito");
  if (!el) return;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1600);
}

function atualizarRotulo(favBtn, estado) {
  // mantém o SVG; só troca o texto antes dele
  const txt = estado ? "★ Favorito" : "☆ Favoritar";
  // se houver SVG dentro, preferimos ajustar o primeiro nó de texto
  if (favBtn.firstChild && favBtn.firstChild.nodeType === Node.TEXT_NODE) {
    favBtn.firstChild.textContent = txt + " ";
  } else {
    favBtn.textContent = txt;
  }
}

function initFavoritosUI() {
  // Inicializa o rótulo conforme localStorage
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const btn = card.querySelector(".btn-fav");
    if (!id || !btn) return;
    const ativo = armazenamentoAPI.isFavorito(id);
    atualizarRotulo(btn, ativo);
  });

  // Clique para favoritar
  const container = document.querySelector(".cards");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".btn-fav");
    if (!favBtn) return;

    const card = favBtn.closest(".card");
    const id = card?.dataset?.id;
    if (!id) {
      console.warn("Card sem data-id; não dá pra favoritar.");
      return;
    }

    const virouFavorito = armazenamentoAPI.toggleFavorito(id);
    atualizarRotulo(favBtn, virouFavorito);
    if (virouFavorito) mostrarPopup();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFavoritosUI);
} else {
  initFavoritosUI();
}
