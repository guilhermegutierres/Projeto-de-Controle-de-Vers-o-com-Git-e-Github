const armazenamentoAPI = (() => {
    const chave_receitas = 'receitas';

    function seed() {
        if(localStorage.getItem(chave_receitas)) return;
        const receitasIniciais = [

            { id:"1", titulo:"Torta de Frango", categoria:"Frango", tempo:60},
            { id:"2", titulo:"Carne assada", categoria:"Carne", tempo:50},
            { id:"3", titulo:"Bolo de Morango", categoria:"Bolos", tempo:60},
            { id:"4", titulo:"Macarrão alho e óleo", categoria:"Massas", tempo:60},
            { id:"5", titulo:"Pão francês", categoria:"pães", tempo:60},
            { id:"6", titulo:"Mousse de limão", categoria:"Doces", tempo:60}
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

    return {
        getAll, setAll, addReceita, getReceita
    };

}) ();