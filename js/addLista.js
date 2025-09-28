let shoplist = JSON.parse(localStorage.getItem("shoplist")) || [];

// Renderiza a lista no modal
function renderShoplist() {
  const ul = document.getElementById("shoplist");
  ul.innerHTML = "";

  shoplist.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.bought ? "bought" : "";

    const span = document.createElement("span");
    span.textContent = item.name;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = item.bought ? "❌ Desmarcar" : "✅ Comprar";
    toggleBtn.onclick = () => toggleBought(index);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑 Remover";
    removeBtn.onclick = () => removeItem(index);

    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(removeBtn);

    ul.appendChild(li);
  });

  localStorage.setItem("shoplist", JSON.stringify(shoplist));
}

function addItem(name) {
  shoplist.push({ name, bought: false });
  renderShoplist();
}

function toggleBought(index) {
  shoplist[index].bought = !shoplist[index].bought;
  renderShoplist();
}

function removeItem(index) {
  shoplist.splice(index, 1);
  renderShoplist();
}

// Copiar lista
function copyList() {
  const text = shoplist.map(i => `- ${i.name} ${i.bought ? "(comprado)" : ""}`).join("\n");
  navigator.clipboard.writeText(text);
  alert("Lista copiada!");
}

// Baixar lista em .txt
function downloadList() {
  const text = shoplist.map(i => `- ${i.name} ${i.bought ? "(comprado)" : ""}`).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "shoplist.txt";
  link.click();
}

// Eventos do modal
document.getElementById("openShoplistBtn").onclick = () => {
  document.getElementById("shoplistModal").classList.remove("hidden");
  renderShoplist();
};
document.getElementById("closeModal").onclick = () => {
  document.getElementById("shoplistModal").classList.add("hidden");
};

document.getElementById("copyListBtn").onclick = copyList;
document.getElementById("downloadListBtn").onclick = downloadList;

// Exporta função para ser usada no app.js
window.addItemToShoplist = addItem;
