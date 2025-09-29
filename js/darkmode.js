'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.dark-toggle');   // novo botão
    const icon   = toggle.querySelector('i');                // ícone dentro do botão

    toggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            // troca ícone para sol
            icon.classList.replace('ri-moon-line', 'ri-sun-line');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            // troca ícone para lua
            icon.classList.replace('ri-sun-line', 'ri-moon-line');
        }
    });
});
