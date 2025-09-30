const armazenamentoAPI = (() => {
    const chave_receitas = 'receitas';

    function seed() {
  if(localStorage.getItem(chave_receitas)) return;

  const receitasIniciais = [
    {
      id: "1",
      titulo: "Torta de Frango",
      categoria: "Frango",
      tempo: 60,
      modo: "A torta de frango de liquidificador é a representação perfeita de uma receita prática, deliciosa e que conquista pelo sabor. Com a facilidade proporcionada pelo liquidificador, esta torta se torna uma opção rápida e irresistível para qualquer refeição."
    },
    {
      id: "2",
      titulo: "Carne assada",
      categoria: "Carne",
      tempo: 50,
      modo: "A carne assada é uma opção saborosa, suculenta e que agrada pelo aroma irresistível. Com um preparo simples, ela se torna uma escolha prática e deliciosa para qualquer refeição."
    },
    {
      id: "3",
      titulo: "Bolo de Morango",
      categoria: "Bolos",
      tempo: 60,
      modo: "O bolo de morango é macio, doce e encanta pelo frescor da fruta. Com uma receita fácil de seguir, ele se torna uma opção deliciosa e perfeita para qualquer ocasião especial."
    },
    {
      id: "4",
      titulo: "Macarrão alho e óleo",
      categoria: "Massas",
      tempo: 60,
      modo: "O macarrão alho e óleo é uma receita simples e saborosa, perfeita para uma refeição rápida e apreciada por todos."
    },
    {
      id: "5",
      titulo: "Pão francês",
      categoria: "pães",
      tempo: 60,
      modo: "O pão francês é crocante, quentinho e conquista pelo aroma que enche a cozinha. Com um preparo simples, ele é uma escolha prática e deliciosa para qualquer refeição."
    },
    {
      id: "6",
      titulo: "Mousse de limão",
      categoria: "Doces",
      tempo: 60,
      modo: "O mousse de limão é leve, cremoso e conquista pelo sabor refrescante. Com poucos ingredientes e preparo rápido, ele se torna uma sobremesa prática e irresistível para qualquer momento."
    }
  ];

  localStorage.setItem(chave_receitas, JSON.stringify(receitasIniciais));
}

    function getAll(){
        seed();
        return JSON.parse(localStorage.getItem(chave_receitas) || "[]");

    }

    function setAll(arr) {
        localStorage.setItem(chave_receitas, JSON.stringify(arr));

    }

    function addReceita(receita) {
        const all = getAll();
        all.push(receita);
        setAll(all);
    }

    function getReceita(id){
        return getAll().find(r => r.id === id);
    }

    const chave_favoritos = 'favoritos';

function getFavoritos() {
  return JSON.parse(localStorage.getItem(chave_favoritos) || "[]");
}

function addFavorito(receita) {
  const favoritos = getFavoritos();
  if (!favoritos.some(f => f.id === receita.id)) {
    favoritos.push(receita);
    localStorage.setItem(chave_favoritos, JSON.stringify(favoritos));
  }
}

function removeFavorito(id) {
  let favoritos = getFavoritos();
  favoritos = favoritos.filter(f => f.id !== id);
  localStorage.setItem(chave_favoritos, JSON.stringify(favoritos));
}

    return {
        getAll, setAll, addReceita, getReceita,
  getFavoritos, addFavorito, removeFavorito
    };

}) ();