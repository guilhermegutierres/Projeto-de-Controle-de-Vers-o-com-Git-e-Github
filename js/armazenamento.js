const armazenamentoAPI = (() => {
    const chave_receitas = 'receitas';
   const CHAVE_FAVORITOS = 'favoritos';

    function seed() {
        if(localStorage.getItem(chave_receitas)) return;
        const receitasIniciais = [

 {
    id:"1",
    titulo:"Torta de Frango",
    categoria:"Frango",
    tempo:60,
    descricao:"A torta de frango de liquidificador é prática, deliciosa e conquista pelo sabor. Uma opção rápida para qualquer refeição.",
    imagem:"assets/images/tortadefrango.jpg"
  },
  {
    id:"2",
    titulo:"Carne assada",
    categoria:"Carne",
    tempo:50,
    descricao:"Carne assada suculenta, temperada na medida certa e perfeita para o almoço de domingo em família.",
    imagem:"assets/images/carneassada.jpg"
  },
  {
    id:"4",
    titulo:"Bolo de Morango",
    categoria:"Bolos",
    tempo:60,
    descricao:"Bolo macio e fofinho com cobertura de morango fresco. Ideal para sobremesas e comemorações.",
    imagem:"assets/images/bolodemorango.jpg"
  },
  {
    id:"6",
    titulo:"Macarrão alho e óleo",
    categoria:"Massas",
    tempo:60,
    descricao:"Receita simples e rápida de macarrão alho e óleo, com sabor marcante e aquele toque caseiro.",
    imagem:"assets/images/macarrao.jpg"
  },
  {
    id:"5",
    titulo:"Pão francês",
    categoria:"Pães",
    tempo:60,
    descricao:"Clássico pão francês: casquinha crocante por fora, miolo macio por dentro. Perfeito para o café da manhã.",
    imagem:"assets/images/paofrances.jpg"
  },
  {
    id:"3",
    titulo:"Mousse de limão",
    categoria:"Doces",
    tempo:60,
    descricao:"Sobremesa leve e refrescante, mousse de limão com equilíbrio perfeito entre o doce e o ácido.",
    imagem:"assets/images/moussedelimao.jpg"
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

    function getFavoritos() {
  return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) || "[]");
}

function setFavoritos(ids) {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(ids));
}

function toggleFavorito(id) {

  const favs = getFavoritos();
  const i = favs.indexOf(id);
  if (i >= 0) favs.splice(i, 1); else favs.push(id);
  setFavoritos(favs);
  return favs.includes(id);
}

function isFavorito(id) {
  return getFavoritos().includes(id);
}

return {
  getAll, setAll, addReceita, getReceita,
  getFavoritos, setFavoritos, toggleFavorito, isFavorito // << exporta
  };
  
}) ();