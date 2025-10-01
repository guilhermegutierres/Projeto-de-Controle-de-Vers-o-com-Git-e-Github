document.getElementById('imageUpload').addEventListener('change', function (e) {
    const fileName = document.getElementById('fileName');
    const imgPreview = document.getElementById('imgPreview');

    if (this.files && this.files[0]) {
        fileName.textContent = this.files[0].name;
        fileName.style.color = '#2E7D32';
        fileName.style.fontWeight = '500';

        // Mostrar preview da imagem
        const reader = new FileReader();
        reader.onload = function (e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        }
        reader.readAsDataURL(this.files[0]);
    } else {
        fileName.textContent = 'Nenhum arquivo escolhido';
        fileName.style.color = '#666';
        fileName.style.fontWeight = 'normal';
        imgPreview.style.display = 'none';
    }
});