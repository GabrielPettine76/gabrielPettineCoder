const btn = document.querySelector('a');
const nav = document.getElementById('menu');
btn.addEventListener('click', function(){
    nav.classList.remove('side-menu:checked ~ nav');
});