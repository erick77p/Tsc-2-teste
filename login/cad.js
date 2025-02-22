document.addEventListener("DOMContentLoaded", () => {
    // Elementos do DOM
    const btnPessoal = document.getElementById("btnPessoal");
    const btnEmpresarial = document.getElementById("btnEmpresarial");
    const formPessoal = document.getElementById("cadastroPessoalForm");
    const formEmpresarial = document.getElementById("cadastroEmpresarialForm");

    // Mostrar formulário pessoal por padrão
    btnPessoal.classList.add("active");
    formPessoal.style.display = "block";
    formEmpresarial.style.display = "none";

    // Alternar para cadastro pessoal
    btnPessoal.addEventListener("click", () => {
        btnPessoal.classList.add("active");
        btnEmpresarial.classList.remove("active");
        formPessoal.style.display = "block";
        formEmpresarial.style.display = "none";
    });

    // Alternar para cadastro empresarial
    btnEmpresarial.addEventListener("click", () => {
        btnEmpresarial.classList.add("active");
        btnPessoal.classList.remove("active");
        formEmpresarial.style.display = "block";
        formPessoal.style.display = "none";
    });

    // Validação e envio do formulário de cadastro pessoal
    if (formPessoal) {
        formPessoal.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (validarFormularioPessoal()) {
                const formData = obterDadosFormularioPessoal();
                enviarDados(formData, "pessoal");
            }
        });
    }

    // Validação e envio do formulário de cadastro empresarial
    if (formEmpresarial) {
        formEmpresarial.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (validarFormularioEmpresarial()) {
                const formData = obterDadosFormularioEmpresarial();
                enviarDados(formData, "empresarial");
            }
        });
    }

    // Função para enviar dados ao servidor
    function enviarDados(formData, tipoCadastro) {
        fetch(`https://seuservidor.com/cadastro/${tipoCadastro}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cadastro realizado com sucesso!");
                if (tipoCadastro === "pessoal") formPessoal.reset();
                else formEmpresarial.reset();
            } else {
                alert("Erro ao cadastrar: " + data.message);
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao enviar os dados. Tente novamente.");
        });
    }

    // Validação do formulário pessoal
    function validarFormularioPessoal() {
        const login = document.getElementById("loginPessoal").value.trim();
        const firstname = document.getElementById("firstname").value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        if (!login) return exibirErro("Por favor, insira um nome de login.");
        if (!firstname) return exibirErro("Por favor, insira seu primeiro nome.");
        if (!lastname) return exibirErro("Por favor, insira seu sobrenome.");
        if (!email) return exibirErro("Por favor, insira seu e-mail.");
        if (!validarEmail(email)) return exibirErro("Por favor, insira um e-mail válido.");
        if (!number) return exibirErro("Por favor, insira seu número de celular.");
        if (!validarCelular(number)) return exibirErro("Por favor, insira um número de celular válido.");
        if (!password) return exibirErro("Por favor, insira uma senha.");
        if (password.length < 6) return exibirErro("A senha deve ter pelo menos 6 caracteres.");
        if (!confirmPassword) return exibirErro("Por favor, confirme sua senha.");
        if (password !== confirmPassword) return exibirErro("As senhas não coincidem.");
        if (!gender) return exibirErro("Por favor, selecione um gênero.");
        
        return true;
    }

    // Validação do formulário empresarial
    function validarFormularioEmpresarial() {
        const login = document.getElementById("loginEmpresarial").value.trim();
        const razaoSocial = document.getElementById("razaoSocial").value.trim();
        const cnpj = document.getElementById("cnpj").value.trim();
        const emailEmpresarial = document.getElementById("emailEmpresarial").value.trim();
        const telefoneEmpresarial = document.getElementById("telefoneEmpresarial").value.trim();
        const passwordEmpresarial = document.getElementById("passwordEmpresarial").value.trim();
        const confirmPasswordEmpresarial = document.getElementById("confirmPasswordEmpresarial").value.trim();

        if (!login) return exibirErro("Por favor, insira um nome de login.");
        if (!razaoSocial) return exibirErro("Por favor, insira a razão social.");
        if (!cnpj) return exibirErro("Por favor, insira o CNPJ.");
        if (!validarCNPJ(cnpj)) return exibirErro("Por favor, insira um CNPJ válido.");
        if (!emailEmpresarial) return exibirErro("Por favor, insira o e-mail corporativo.");
        if (!validarEmail(emailEmpresarial)) return exibirErro("Por favor, insira um e-mail válido.");
        if (!telefoneEmpresarial) return exibirErro("Por favor, insira o telefone.");
        if (!validarCelular(telefoneEmpresarial)) return exibirErro("Por favor, insira um número de telefone válido.");
        if (!passwordEmpresarial) return exibirErro("Por favor, insira uma senha.");
        if (passwordEmpresarial.length < 6) return exibirErro("A senha deve ter pelo menos 6 caracteres.");
        if (!confirmPasswordEmpresarial) return exibirErro("Por favor, confirme sua senha.");
        if (passwordEmpresarial !== confirmPasswordEmpresarial) return exibirErro("As senhas não coincidem.");
        
        return true;
    }

    // Obter dados do formulário pessoal
    function obterDadosFormularioPessoal() {
        return {
            login: document.getElementById("loginPessoal").value.trim(),
            firstname: document.getElementById("firstname").value.trim(),
            lastname: document.getElementById("lastname").value.trim(),
            email: document.getElementById("email").value.trim(),
            number: document.getElementById("number").value.trim(),
            password: document.getElementById("password").value.trim(),
            gender: document.querySelector('input[name="gender"]:checked').value
        };
    }

    // Obter dados do formulário empresarial
    function obterDadosFormularioEmpresarial() {
        return {
            login: document.getElementById("loginEmpresarial").value.trim(),
            razaoSocial: document.getElementById("razaoSocial").value.trim(),
            cnpj: document.getElementById("cnpj").value.trim(),
            email: document.getElementById("emailEmpresarial").value.trim(),
            telefone: document.getElementById("telefoneEmpresarial").value.trim(),
            password: document.getElementById("passwordEmpresarial").value.trim()
        };
    }

    function exibirErro(mensagem) {
        alert(mensagem);
        return false;
    }
});
