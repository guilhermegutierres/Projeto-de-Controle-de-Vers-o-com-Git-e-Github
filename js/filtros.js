const input    = document.getElementById("search");
const results  = document.getElementById("results");
const receitas = armazenamentoAPI.getAll();

const norm = s => (s || '')
  .toString()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase();


    function clearList(){
    results.innerHTML = '';
    results.style.display = 'none';
    }


    function render(lista){
    results.innerHTML = lista.map(r => 
        `<li>${r.titulo} — ${r.categoria} (${r.tempo} min)</li>`
    ).join('');
     results.style.display = lista.length ? 'block' : 'none';
    }


    function filtrar(){
    const q = norm(input.value);


    if (!q) { 
        clearList();
        return;
  }


    const filtradas = receitas.filter(r =>
        norm(r.titulo).includes(q) || norm(r.categoria).includes(q)
  );


    if (!filtradas.length) {
        results.innerHTML = '<li>Nenhuma receita encontrada.</li>';
        results.style.display = 'block';
     return;
  }


  render(filtradas);
}


let t;
    input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(filtrar, 200);
});


clearList();