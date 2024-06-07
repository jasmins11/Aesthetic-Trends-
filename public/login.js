document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const signupSubmit = document.getElementById('signupSubmit');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const body = document.body;

    loginBtn.addEventListener('click', () => {
        body.setAttribute('data-page', 'login');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });

    signupBtn.addEventListener('click', () => {
        body.setAttribute('data-page', 'signup');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        window.location.href = '/'; 
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = '/logout'; 
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        window.location.href = '/login'; 
    });

    signupSubmit.addEventListener('click', () => {
        signupForm.submit(); // trimite formularul manual
    });
});
