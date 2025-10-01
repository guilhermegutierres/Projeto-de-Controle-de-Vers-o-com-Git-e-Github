// Configurações da página de adicionar receita
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do formulário
    const form = document.getElementById('formAdd');
    const errorBox = document.getElementById('errorBox');
    const successMsg = document.getElementById('success');
    const imageUpload = document.getElementById('imageUpload');
    const imgPreview = document.getElementById('imgPreview');
    const fileName = document.getElementById('fileName');

    // Configuração do preview de imagem
    if (imageUpload) {
        imageUpload.addEventListener('change', function (e) {
            if (this.files && this.files[0]) {
                const file = this.files[0];

                // Validação do tipo de arquivo
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    showError('Por favor, selecione uma imagem válida (JPEG, PNG, GIF ou WebP).');
                    this.value = '';
                    return;
                }

                // Validação do tamanho do arquivo (máximo 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB em bytes
                if (file.size > maxSize) {
                    showError('A imagem deve ter no máximo 5MB.');
                    this.value = '';
                    return;
                }

                // Atualizar nome do arquivo
                fileName.textContent = file.name;
                fileName.style.color = '#2E7D32';
                fileName.style.fontWeight = '500';

                // Mostrar preview
                const reader = new FileReader();
                reader.onload = function (e) {
                    imgPreview.src = e.target.result;
                    imgPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);

                // Limpar erro se existir
                hideError();
            } else {
                fileName.textContent = 'Nenhum arquivo escolhido';
                fileName.style.color = '#666';
                fileName.style.fontWeight = 'normal';
                imgPreview.style.display = 'none';
            }
        });
    }

    // Validação do formulário
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                saveRecipe();
            }
        });
    }

    // Validação em tempo real
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Função de validação do formulário
    function validateForm() {
        let isValid = true;
        const errors = [];

        // Validar campos obrigatórios
        const requiredFields = [
            { element: document.getElementById('titulo'), name: 'Nome da receita' },
            { element: document.getElementById('categoria'), name: 'Categoria' },
            { element: document.getElementById('tempo'), name: 'Tempo de preparo' },
            { element: document.getElementById('ingredientes'), name: 'Ingredientes' },
            { element: document.getElementById('modo'), name: 'Modo de preparo' }
        ];

        requiredFields.forEach(field => {
            if (!field.element.value.trim()) {
                isValid = false;
                errors.push(`${field.name} é obrigatório`);
                field.element.classList.add('error');
            } else {
                field.element.classList.remove('error');
            }
        });

        // Validação específica do tempo
        const tempo = document.getElementById('tempo');
        if (tempo.value && tempo.value < 1) {
            isValid = false;
            errors.push('O tempo deve ser maior que 0');
            tempo.classList.add('error');
        }

        // Validação específica dos ingredientes
        const ingredientes = document.getElementById('ingredientes');
        if (ingredientes.value && ingredientes.value.split('\n').filter(line => line.trim()).length < 2) {
            errors.push('Adicione pelo menos 2 ingredientes');
            ingredientes.classList.add('error');
        }

        if (!isValid) {
            showError(errors.join('<br>'));
        } else {
            hideError();
        }

        return isValid;
    }

    // Validação individual de campo
    function validateField(field) {
        if (!field.value.trim()) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');

            // Validações específicas
            if (field.id === 'tempo' && field.value < 1) {
                field.classList.add('error');
            }
        }
    }

    // Salvar receita
    function saveRecipe() {
        const recipe = {
            id: Date.now().toString(),
            titulo: document.getElementById('titulo').value.trim(),
            categoria: document.getElementById('categoria').value,
            tempo: parseInt(document.getElementById('tempo').value),
            dificuldade: document.getElementById('dificuldade').value,
            ingredientes: document.getElementById('ingredientes').value.trim().split('\n').filter(line => line.trim()),
            modo: document.getElementById('modo').value.trim().split('\n').filter(line => line.trim()),
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            imagem: imgPreview.style.display !== 'none' ? imgPreview.src : null,
            descricao: document.getElementById('modo').value.trim().split('.')[0] + '.',
            dataCriacao: new Date().toISOString(),
            favorito: false
        };

        // Salvar no armazenamento local
        const receitaSalva = saveRecipeToStorage(recipe);

        // Mostrar mensagem de sucesso
        showSuccess();

        // Resetar formulário e redirecionar
        setTimeout(() => {
            form.reset();
            imgPreview.style.display = 'none';
            fileName.textContent = 'Nenhum arquivo escolhido';
            fileName.style.color = '#666';
            fileName.style.fontWeight = 'normal';
            hideSuccess();

            // Redirecionar para a página inicial após salvar
            window.location.href = './index.html';
        }, 1500);
    }

    // Funções de utilidade
    function showError(message) {
        errorBox.innerHTML = message;
        errorBox.style.display = 'block';
    }

    function hideError() {
        errorBox.style.display = 'none';
    }

    function showSuccess() {
        successMsg.style.display = 'block';
        successMsg.textContent = 'Receita salva com sucesso!';
    }

    function hideSuccess() {
        successMsg.style.display = 'none';
    }

    // Integração com armazenamento.js
    function saveRecipeToStorage(recipe) {
        let receitaSalva;

        if (typeof armazenamentoAPI !== 'undefined' && armazenamentoAPI.addReceita) {
            receitaSalva = armazenamentoAPI.addReceita(recipe);
        } else {
            // Fallback: salvar no localStorage diretamente
            const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
            receitaSalva = recipe;
            receitas.push(receitaSalva);
            localStorage.setItem('receitas', JSON.stringify(receitas));
        }

        // Chamar função para adicionar o novo card
        if (typeof adicionarNovoCard === 'function') {
            adicionarNovoCard(receitaSalva);
        }

        return receitaSalva;
    }

    // Prevenção de saída acidental
    let formChanged = false;
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            formChanged = true;
        });
    });

    window.addEventListener('beforeunload', function (e) {
        if (formChanged) {
            e.preventDefault();
            e.returnValue = 'Você tem alterações não salvas. Tem certeza que deseja sair?';
        }
    });

    // Limpar flag de alteração quando o formulário for enviado
    form.addEventListener('submit', function () {
        formChanged = false;
    });
});