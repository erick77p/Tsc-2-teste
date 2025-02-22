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
});document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file");
    const fileNameDisplay = document.getElementById("file-name");

    // Exibe o nome do arquivo selecionado
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const files = Array.from(fileInput.files);
            const fileNames = files.map(file => file.name).join(", ");
            fileNameDisplay.textContent = `Arquivos selecionados: ${fileNames}`;
        } else {
            fileNameDisplay.textContent = "Nenhum arquivo selecionado";
        }
    });

    // Validação do formulário antes do envio
    const form = document.getElementById("uploadForm");
    form.addEventListener("submit", (e) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        const files = fileInput.files;

        if (files.length === 0) {
            e.preventDefault();
            alert("Por favor, selecione pelo menos um arquivo.");
            return;
        }

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                e.preventDefault();
                alert(`Tipo de arquivo não permitido: ${file.name}. Apenas fotos (JPEG, PNG) e PDFs são aceitos.`);
                return;
            }
        }

        alert("Arquivos enviados com sucesso!"); // Simulação de envio
    });
});