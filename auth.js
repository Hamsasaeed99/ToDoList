document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authBtn = document.getElementById('authBtn');
    const toggleAuth = document.getElementById('toggleAuth');
    const toggleText = document.getElementById('toggleText');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    let isLogin = true;

    // Toggle between Login and Signup
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        
        if (isLogin) {
            authTitle.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Please login to manage your tasks';
            authBtn.textContent = 'Login';
            toggleText.innerHTML = "Don't have an account? <a href='#' id='toggleAuth'>Sign Up</a>";
        } else {
            authTitle.textContent = 'Create Account';
            authSubtitle.textContent = 'Join us to stay organized';
            authBtn.textContent = 'Sign Up';
            toggleText.innerHTML = "Already have an account? <a href='#' id='toggleAuth'>Login</a>";
        }
        
        // Re-attach listener since we replaced innerHTML
        document.getElementById('toggleAuth').addEventListener('click', (e) => {
            e.preventDefault();
            toggleAuth.click();
        });
    });

    // Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Handle Form Submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        
        const users = JSON.parse(localStorage.getItem('todo_users') || '[]');
        
        if (isLogin) {
            // Login Logic
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('todo_session', JSON.stringify({ email, isLoggedIn: true }));
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password!');
            }
        } else {
            // Signup Logic
            if (users.find(u => u.email === email)) {
                alert('User already exists!');
                return;
            }
            
            users.push({ email, password });
            localStorage.setItem('todo_users', JSON.stringify(users));
            localStorage.setItem('todo_session', JSON.stringify({ email, isLoggedIn: true }));
            
            alert('Account created successfully!');
            window.location.href = 'index.html';
        }
    });
});
