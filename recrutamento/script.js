document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("curriculoForm");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Validação básica dos campos
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const foto = document.getElementById("foto").files[0];
        const curriculo = document.getElementById("curriculo").files[0];
        const comprovante = document.getElementById("comprovante").files[0];

        if (!nome || !email || !telefone || !foto || !curriculo || !comprovante) {
            mensagem.textContent = "Por favor, preencha todos os campos obrigatórios.";
            mensagem.style.color = "red";
            return;
        }

        // Simulação de envio
        mensagem.textContent = "Currículo enviado com sucesso!";
        mensagem.style.color = "green";

        
        form.reset();
    });
});