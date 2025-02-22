document.addEventListener("DOMContentLoaded", () => {
    // Animação de fade-in com IntersectionObserver
    const fadeInElements = document.querySelectorAll(".fade-in");

    const fadeInObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Remove a observação após a animação
                }
            });
        },
        { threshold: 0.1 } // Dispara a animação quando 10% do elemento estiver visível
    );

    fadeInElements.forEach((element) => fadeInObserver.observe(element));

    // Header dinâmico ao rolar a página
    const header = document.getElementById("header");
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // Mostra ou esconde o header ao rolar
        if (currentScroll > lastScroll && currentScroll > 50) {
            header.style.top = "0"; // Mostra o header ao descer
        } else {
            header.style.top = "-60px"; // Esconde o header ao subir
        }

        lastScroll = currentScroll;
    });

    // Menu mobile
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link (opcional)
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // Adiciona um efeito de suavização ao rolar para links âncora
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Evita o comportamento padrão
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth", // Rola suavemente
                    block: "start", // Alinha o elemento no topo da viewport
                });
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o usuário está logado (simulação)
    const isLoggedIn = false; // Altere para `true` se o usuário estiver logado

    // Verifica se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    // Exibe a mensagem de cookies apenas para usuários não logados e que não aceitaram os cookies
    if (!isLoggedIn && !cookiesAccepted) {
        const cookieMessage = document.getElementById("cookieMessage");
        const acceptCookiesButton = document.getElementById("acceptCookies");

        // Mostra a mensagem de cookies
        setTimeout(() => {
            cookieMessage.classList.add("visible");
        }, 2000); // Exibe após 2 segundos

        // Fecha a mensagem e salva a preferência do usuário
        acceptCookiesButton.addEventListener("click", function () {
            cookieMessage.classList.remove("visible");
            localStorage.setItem("cookiesAccepted", "true");
        });
    }
});