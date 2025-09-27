
    (function(){
      const form = document.getElementById('formAdd');
      const imagem = document.getElementById('imagem');
      const imgPreview = document.getElementById('imgPreview');
      const errorBox = document.getElementById('errorBox');
      const successBox = document.getElementById('success');

      let imagemDataUrl = null;

      imagem.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if(!file) { imgPreview.style.display = 'none'; imagemDataUrl = null; return; }
        if(!file.type.startsWith('image/')) { alert('Por favor escolha um arquivo de imagem.'); imagem.value = ''; return; }
        const reader = new FileReader();
        reader.onload = () => {
          imagemDataUrl = reader.result;
          imgPreview.src = imagemDataUrl;
          imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      });

      function validarCampos(dados) {
        const erros = [];
        if(!dados.titulo || !dados.titulo.trim()) erros.push('Título é obrigatório.');
        if(!dados.categoria || !dados.categoria.trim()) erros.push('Categoria é obrigatória.');
        if(!dados.tempo || isNaN(dados.tempo) || dados.tempo <= 0) erros.push('Tempo deve ser um número maior que 0.');
        if(!dados.ingredientes || !dados.ingredientes.length) erros.push('Adicione ao menos um ingrediente.');
        if(!dados.modo || !dados.modo.trim()) erros.push('Modo de preparo é obrigatório.');
        return erros;
      }

      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        errorBox.style.display = 'none';
        errorBox.innerHTML = '';
        successBox.style.display = 'none';

        const titulo = document.getElementById('titulo').value;
        const categoria = document.getElementById('categoria').value;
        const dificuldade = document.getElementById('dificuldade').value;
        const tempo = parseInt(document.getElementById('tempo').value, 10);
        const ingredientesRaw = document.getElementById('ingredientes').value;
        const modo = document.getElementById('modo').value;
        const tagsRaw = document.getElementById('tags').value;

        const ingredientes = ingredientesRaw
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);

        const tags = tagsRaw
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);

        const receita = {
          id: Date.now().toString(),
          titulo: titulo.trim(),
          categoria: categoria.trim(),
          dificuldade: (dificuldade || '').trim(),
          tempo: Number.isNaN(tempo) ? null : tempo,
          ingredientes,
          modo,
          tags,
          imagem: imagemDataUrl || null,
          createdAt: new Date().toISOString()
        };

        const erros = validarCampos(receita);
        if(erros.length){
          errorBox.style.display = 'block';
          errorBox.innerHTML = '<ul>' + erros.map(e => '<li>'+e+'</li>').join('') + '</ul>';
          window.scrollTo({top:0,behavior:'smooth'});
          return;
        }

        try {
          if(typeof armazenamentoAPI === 'undefined' || !armazenamentoAPI.addReceita) {
            throw new Error('armazenamentoAPI não encontrado. Certifique-se de incluir js/armazenamento.js antes deste script.');
          }

          armazenamentoAPI.addReceita(receita);
          successBox.style.display = 'block';

          form.reset();
          imgPreview.style.display = 'none';
          imagemDataUrl = null;

          setTimeout(()=> location.href = 'index.html', 700);

        } catch(err){
          errorBox.style.display = 'block';
          errorBox.textContent = 'Erro ao salvar: ' + err.message;
        }

      });

    })();

