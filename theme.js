(function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    
    // Load saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            localStorage.setItem('theme', theme);
            
            // Add a little pop animation
            themeBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                themeBtn.style.transform = '';
            }, 100);
        });
    }
})();
