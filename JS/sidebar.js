const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebarToggle');

toggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.add('open');
    }
});