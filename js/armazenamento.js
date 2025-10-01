const armazenamentoAPI = (() => {
  const chave_receitas = 'receitas';
  const CHAVE_FAVORITOS = 'favoritos';

  function seed() {
    if (localStorage.getItem(chave_receitas)) return;
    const receitasIniciais = [
      {
        id: "1",
        titulo: "Torta de Frango",
        categoria: "Frango",
        tempo: 60,
        dificuldade: "Fácil",
        ingredientes: [
          "500g de frango desfiado",
          "2 xícaras de farinha de trigo",
          "3 ovos",
          "1 cebola média",
          "1 xícara de leite",
          "1 colher de fermento"
        ],
        modo: [
          "Cozinhe o frango com temperos",
          "Bata todos os ingredientes no liquidificador",
          "Despeje em forma untada",
          "Asse por 40 minutos em forno médio"
        ],
        tags: ["prático", "família", "almoço"],
        imagem: "assets/images/tortadefrango.jpg",
        descricao:
          "A torta de frango de liquidificador é a representação perfeita de uma receita prática, deliciosa e que conquista pelo sabor.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      },
      {
        id: "2",
        titulo: "Carne Assada",
        categoria: "Carne",
        tempo: 50,
        dificuldade: "Médio",
        ingredientes: [
          "1kg de carne de panela",
          "4 batatas médias",
          "2 cenouras",
          "2 dentes de alho",
          "1 cebola",
          "temperos a gosto"
        ],
        modo: [
          "Tempere a carne com alho e sal",
          "Coloque na panela de pressão com água",
          "Cozinhe por 30 minutos",
          "Adicione os legumes e cozinhe por mais 20 minutos"
        ],
        tags: ["tradicional", "almoço", "família"],
        imagem: "assets/images/carneassada.jpg",
        descricao:
          "Uma carne assada suculenta e saborosa, perfeita para almoços em família nos finais de semana.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      },
      {
        id: "3",
        titulo: "Mousse de Limão",
        categoria: "Doces",
        tempo: 30,
        dificuldade: "Fácil",
        ingredientes: [
          "1 lata de leite condensado",
          "1 lata de creme de leite",
          "suco de 4 limões",
          "raspas de 1 limão"
        ],
        modo: [
          "Bata o leite condensado com o creme de leite",
          "Adicione o suco de limão aos poucos",
          "Coloque nas taças e leve à geladeira por 2 horas"
        ],
        tags: ["sobremesa", "fácil", "gelado"],
        imagem: "assets/images/moussedelimao.jpg",
        descricao:
          "Um mousse de limão refrescante e cremoso, perfeito para os dias quentes.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      },
      {
        id: "4",
        titulo: "Bolo de Morango",
        categoria: "Bolos",
        tempo: 60,
        dificuldade: "Médio",
        ingredientes: [
          "3 xícaras de farinha",
          "2 xícaras de açúcar",
          "4 ovos",
          "1 xícara de óleo",
          "1 xícara de leite",
          "1 colher de fermento",
          "300g de morangos"
        ],
        modo: [
          "Bata os ingredientes na batedeira",
          "Adicione os morangos picados",
          "Asse por 40 minutos em forno médio",
          "Decore com morangos frescos"
        ],
        tags: ["doce", "frutas", "festa"],
        imagem: "assets/images/bolodemorango.jpg",
        descricao:
          "Bolo fofinho e úmido com pedaços de morango, uma delícia para qualquer ocasião.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      },
      {
        id: "5",
        titulo: "Pão Francês",
        categoria: "Pães",
        tempo: 120,
        dificuldade: "Difícil",
        ingredientes: [
          "500g de farinha de trigo",
          "10g de fermento biológico",
          "1 colher de chá de açúcar",
          "1 colher de chá de sal",
          "300ml de água morna"
        ],
        modo: [
          "Misture os ingredientes e sove por 10 minutos",
          "Deixe descansar por 1 hora",
          "Modele os pães e deixe crescer",
          "Asse em forno alto por 20 minutos"
        ],
        tags: ["tradicional", "café da manhã", "caseiro"],
        imagem: "assets/images/paofrances.jpg",
        descricao:
          "Pão francês caseiro, crocante por fora e macio por dentro.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      },
      {
        id: "6",
        titulo: "Macarrão Alho e Óleo",
        categoria: "Massas",
        tempo: 20,
        dificuldade: "Fácil",
        ingredientes: [
          "500g de macarrão",
          "6 dentes de alho",
          "1/2 xícara de azeite",
          "salsinha picada",
          "sal a gosto"
        ],
        modo: [
          "Cozinhe o macarrão al dente",
          "Refogue o alho no azeite",
          "Misture o macarrão ao alho",
          "Finalize com salsinha"
        ],
        tags: ["rápido", "prático", "vegetariano"],
        imagem: "assets/images/macarrao.jpg",
        descricao:
          "Macarrão alho e óleo, um clássico da culinária brasileira, rápido e saboroso.",
        dataCriacao: new Date().toISOString(),
        favorito: false
      }
    ];

    localStorage.setItem(chave_receitas, JSON.stringify(receitasIniciais));
  }

  function getAll() {
    seed();
    return JSON.parse(localStorage.getItem(chave_receitas) || "[]");
  }

  function setAll(arr) {
    localStorage.setItem(chave_receitas, JSON.stringify(arr));
  }

  function addReceita(receita) {
    const all = getAll();
    const novaReceita = {
      id: receita.id || Date.now().toString(),
      titulo: receita.titulo,
      categoria: receita.categoria,
      tempo: receita.tempo,
      dificuldade: receita.dificuldade || "Fácil",
      ingredientes: receita.ingredientes || [],
      modo: receita.modo || [],
      tags: receita.tags || [],
      imagem: receita.imagem || null,
      descricao:
        receita.descricao || `${receita.titulo} - uma deliciosa receita caseira.`,
      dataCriacao: receita.dataCriacao || new Date().toISOString(),
      favorito: Boolean(receita.favorito)
    };
    all.push(novaReceita);
    setAll(all);
    return novaReceita;
  }

  function getReceita(id) {
    return getAll().find(r => r.id === id);
  }

  // (main) filtro por categoria
  function getByCategoria(categoria) {
    return getAll().filter(r => r.categoria === categoria);
  }

  // -------- Favoritos (mantidos) --------
  function getFavoritos() {
    return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) || "[]");
  }

  function setFavoritos(ids) {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(ids));
  }

  function toggleFavorito(id) {
    const favs = getFavoritos();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1);
    else favs.push(id);
    setFavoritos(favs);
    return favs.includes(id);
  }

  function isFavorito(id) {
    return getFavoritos().includes(id);
  }

  return {
    // dados
    getAll,
    setAll,
    addReceita,
    getReceita,
    getByCategoria,
    // favoritos
    getFavoritos,
    setFavoritos,
    toggleFavorito,
    isFavorito
  };
})();
