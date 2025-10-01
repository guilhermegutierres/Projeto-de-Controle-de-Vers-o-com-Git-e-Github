// Sistema de cards dinâmicos para receitas
document.addEventListener('DOMContentLoaded', function () {
    console.log('Carregando cards dinâmicos...');
    carregarCardsReceitas();
});

function carregarCardsReceitas() {
    const container = document.querySelector('.cards');
    if (!container) {
        console.log('Container de cards não encontrado');
        return;
    }

    if (typeof armazenamentoAPI === 'undefined') {
        console.error('armazenamentoAPI não está disponível');
        return;
    }

    const receitas = armazenamentoAPI.getAll();
    console.log('Receitas carregadas:', receitas);

    container.innerHTML = '';

    if (receitas.length === 0) {
        container.innerHTML = `
            <div class="sem-receitas">
                <h2>Nenhuma receita cadastrada ainda</h2>
                <p>Clique no botão "+" para adicionar sua primeira receita!</p>
            </div>
        `;
        return;
    }

    receitas.forEach(receita => {
        console.log(`Criando card para: ${receita.titulo}`, `Imagem: ${receita.imagem}`);
        const card = criarCardReceita(receita);
        container.appendChild(card);
    });
}

function criarCardReceita(receita) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = receita.id;

    // Verificar se a imagem existe e é válida
    const imagemSrc = receita.imagem || '';
    console.log(`Processando imagem para ${receita.titulo}:`, imagemSrc);

    let imagemHTML = '';

    if (imagemSrc && imagemSrc !== 'null' && imagemSrc !== 'undefined' && imagemSrc !== '') {
        imagemHTML = `
            <img src="${imagemSrc}" alt="${receita.titulo}" 
                 onerror="console.log('Erro ao carregar imagem:', this.src); this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="sem-imagem" style="display:none">📷</div>
        `;
    } else {
        imagemHTML = `<div class="sem-imagem" style="display:flex">📷</div>`;
    }

    // Verificar se a receita é favorita usando o sistema novo
    const isFavorito = armazenamentoAPI.isFavorito(receita.id);
    const coracaoFill = isFavorito ? 'rgba(253,1,1,1)' : 'rgba(200,200,200,1)';

    // Descrição da receita
    const descricao = receita.descricao || `Uma deliciosa receita de ${receita.titulo.toLowerCase()}.`;

    card.innerHTML = `
        <div class="card-image">
            ${imagemHTML}
        </div>
        <div class="card_info">
            <h1>${receita.titulo}</h1>
            <h3>${descricao}</h3>
            <div class="btn_card">
                <button class="btn_esquerda">Ingredientes</button>
                <button class="btn_direita">
                    ${isFavorito ? 'Desfavoritar' : 'Favoritar'}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" 
                         fill="${coracaoFill}">
                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // Adicionar eventos aos botões
    const btnIngredientes = card.querySelector('.btn_esquerda');
    const btnFavoritar = card.querySelector('.btn_direita');

    if (btnIngredientes) {
        btnIngredientes.addEventListener('click', () => mostrarIngredientes(receita.id));
    }

    if (btnFavoritar) {
        btnFavoritar.addEventListener('click', () => toggleFavorito(receita.id, card));
    }

    return card;
}

function mostrarIngredientes(receitaId) {
    const receita = armazenamentoAPI.getReceita(receitaId);
    if (receita && receita.ingredientes && receita.ingredientes.length > 0) {
        const ingredientes = receita.ingredientes.join('\n• ');
        alert(`Ingredientes de ${receita.titulo}:\n\n• ${ingredientes}`);
    } else {
        alert(`Nenhum ingrediente cadastrado para ${receita.titulo}`);
    }
}

function toggleFavorito(receitaId, cardElement) {
    // Usar o sistema novo de favoritos
    const isAgoraFavorito = armazenamentoAPI.toggleFavorito(receitaId);

    // Atualizar o texto do botão
    const btnFavoritar = cardElement.querySelector('.btn_direita');
    const svg = btnFavoritar.querySelector('svg');
    const texto = btnFavoritar.querySelector(':not(svg)') || btnFavoritar;

    if (isAgoraFavorito) {
        svg.setAttribute('fill', 'rgba(253,1,1,1)');
        if (texto.textContent.includes('Favoritar')) {
            texto.textContent = texto.textContent.replace('Favoritar', 'Desfavoritar');
        }
    } else {
        svg.setAttribute('fill', 'rgba(200,200,200,1)');
        if (texto.textContent.includes('Desfavoritar')) {
            texto.textContent = texto.textContent.replace('Desfavoritar', 'Favoritar');
        }
    }

    // Feedback visual
    btnFavoritar.style.transform = 'scale(1.1)';
    setTimeout(() => {
        btnFavoritar.style.transform = 'scale(1)';
    }, 200);

    // Mostrar popup de confirmação
    mostrarPopupFavorito(isAgoraFavorito);
}

function mostrarPopupFavorito(adicionado) {
    const popup = document.getElementById('popup-favorito');
    if (popup) {
        popup.textContent = adicionado ? '❤️ Receita favoritada!' : '💔 Receita removida dos favoritos';
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000);
    }
}

// Função global para adicionar novo card
window.adicionarNovoCard = function (receita) {
    const container = document.querySelector('.cards');
    if (container) {
        const semReceitas = container.querySelector('.sem-receitas');
        if (semReceitas) {
            semReceitas.remove();
        }
        const card = criarCardReceita(receita);
        container.appendChild(card);
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};