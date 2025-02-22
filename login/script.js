document.addEventListener("DOMContentLoaded", () => {
    // Configurações comuns
    const forms = {
        cadastro: document.querySelector("#cadastroForm"),
        login: document.querySelector("#loginForm")
    };

    const togglePasswordButtons = document.querySelectorAll(".toggle-password");
    const errorMessages = {
        cadastro: document.querySelector("#cadastroErrorMessage"),
        login: document.querySelector("#loginErrorMessage")
    };

    // Alternar visibilidade da senha (funciona para ambos os formulários)
    togglePasswordButtons.forEach(button => {
        button.addEventListener("click", () => {
            const passwordInput = button.previousElementSibling;
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            button.classList.toggle("fa-eye");
            button.classList.toggle("fa-eye-slash");
        });
    });

    // Validação e envio do formulário de cadastro
    if (forms.cadastro) {
        forms.cadastro.addEventListener("submit", async (event) => {
            event.preventDefault();
            limparErros("cadastro");

            if (!validarFormularioCadastro()) return;

            const formData = obterDadosFormularioCadastro();

            try {
                const response = await fetch("https://seuservidor.com/cadastro", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.success) {
                    alert("Cadastro realizado com sucesso!");
                    forms.cadastro.reset();
                } else {
                    exibirErro("cadastro", "Erro ao cadastrar: " + data.message);
                }
            } catch (error) {
                console.error("Erro:", error);
                exibirErro("cadastro", "Erro ao enviar os dados. Tente novamente.");
            }
        });
    }

    // Validação e envio do formulário de login
    if (forms.login) {
        forms.login.addEventListener("submit", async (event) => {
            event.preventDefault();
            limparErros("login");

            if (!validarFormularioLogin()) return;

            const formData = obterDadosFormularioLogin();

            // Simulação de autenticação (substitua por uma requisição real ao backend)
            const correctUsername = "erick";
            const correctPassword = "1234";

            if (formData.username === correctUsername && formData.password === correctPassword) {
                // Login bem-sucedido
                forms.login.classList.remove("error-animation");
                forms.login.classList.add("success-animation");
                errorMessages.login.style.display = "none";

                setTimeout(() => {
                    alert("Login bem-sucedido!");
                    window.location.href = "pagina-principal.html"; // Redireciona após o login
                }, 1000);
            } else {
                // Login falhou
                forms.login.classList.remove("success-animation");
                forms.login.classList.add("error-animation");
                exibirErro("login", "Usuário ou senha incorretos. Tente novamente.");
            }
        });
    }

    // Funções de validação
    function validarFormularioCadastro() {
        let valido = true;
        const campos = [
            { id: "firstname", mensagem: "Por favor, insira seu primeiro nome." },
            { id: "lastname", mensagem: "Por favor, insira seu sobrenome." },
            { id: "email", mensagem: "Por favor, insira seu e-mail.", validacao: validarEmail },
            { id: "number", mensagem: "Por favor, insira seu número de celular.", validacao: validarCelular },
            { id: "password", mensagem: "Por favor, insira uma senha.", validacao: (val) => val.length >= 6 || "A senha deve ter pelo menos 6 caracteres." },
            { id: "confirmPassword", mensagem: "Por favor, confirme sua senha.", validacao: (val) => val === document.getElementById("password").value || "As senhas não coincidem." }
        ];

        campos.forEach(({ id, mensagem, validacao }) => {
            const campo = document.getElementById(id);
            const valor = campo.value.trim();
            if (!valor || (validacao && typeof validacao === "function" && !validacao(valor))) {
                mostrarErro(campo, validacao && typeof validacao === "function" ? validacao(valor) : mensagem);
                valido = false;
            }
        });

        if (!document.querySelector('input[name="gender"]:checked')) {
            exibirErro("cadastro", "Por favor, selecione um gênero.");
            valido = false;
        }
        return valido;
    }

    function validarFormularioLogin() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username) {
            exibirErro("login", "Por favor, insira seu usuário.");
            return false;
        }

        if (!password) {
            exibirErro("login", "Por favor, insira sua senha.");
            return false;
        }

        return true;
    }

    // Funções utilitárias
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarCelular(number) {
        return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(number);
    }

    function mostrarErro(campo, mensagem) {
        const erro = document.createElement("div");
        erro.className = "error-message";
        erro.textContent = mensagem;
        campo.parentElement.appendChild(erro);
    }

    function exibirErro(formulario, mensagem) {
        errorMessages[formulario].textContent = mensagem;
        errorMessages[formulario].style.display = "block";
    }

    function limparErros(formulario) {
        errorMessages[formulario].style.display = "none";
        document.querySelectorAll(".error-message").forEach(erro => erro.remove());
    }

    function obterDadosFormularioCadastro() {
        return {
            firstname: document.getElementById("firstname").value.trim(),
            lastname: document.getElementById("lastname").value.trim(),
            email: document.getElementById("email").value.trim(),
            number: document.getElementById("number").value.trim(),
            password: document.getElementById("password").value.trim(),
            gender: document.querySelector('input[name="gender"]:checked').value
        };
    }

    function obterDadosFormularioLogin() {
        return {
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value.trim()
        };
    }
});