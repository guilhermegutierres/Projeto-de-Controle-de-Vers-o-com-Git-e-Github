'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.querySelector('.btn');

    switcher.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            this.textContent = "Light"; 
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            this.textContent = "Dark";
        }
    });
});
