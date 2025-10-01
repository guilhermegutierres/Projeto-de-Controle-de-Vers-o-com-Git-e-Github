const containerFav = document.querySelector(".cards");

function cardTemplate(r) {
  return `
    <div class="card" data-id="${r.id}">
      <img src="${r.imagem}" alt="${r.titulo}">
      <div class="card_info">
        <h1>${r.titulo}</h1>
        <h3>${r.descricao}</h3>
        <div class="btn_card">
          <button class="btn_esquerda" type="button">Ingredientes</button>
          <button class="btn_direita btn-remove" type="button">Remover dos Favoritos</button>
        </div>
      </div>
    </div>
  `;
}

function renderFavoritos() {
  const ids = armazenamentoAPI.getFavoritos();
  const cards = ids.map(id => armazenamentoAPI.getReceita(id)).filter(Boolean);

  containerFav.innerHTML = cards.length
    ? cards.map(cardTemplate).join("")
    : "<p style='padding:16px'>Nenhum favorito ainda.</p>";
}

containerFav.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-remove");
  if (!btn) return;
  const id = btn.closest(".card")?.dataset?.id;
  if (!id) return;
  armazenamentoAPI.toggleFavorito(id);
  renderFavoritos();
});

renderFavoritos();
