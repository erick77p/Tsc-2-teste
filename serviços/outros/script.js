document.addEventListener("DOMContentLoaded", function () {
    // Eventos de Pagamento
    const selectPagamento = document.getElementById("pagamento");
    const selectParcelas = document.getElementById("parcelas");
    const selectServico = document.getElementById("servico");

    if (selectPagamento) {
        selectPagamento.addEventListener("change", mostrarDetalhesPagamento);
    }
    if (selectParcelas) {
        selectParcelas.addEventListener("change", calcularParcelas);
    }
    if (selectServico) {
        selectServico.addEventListener("change", calcularParcelas);
    }

    // Animação de Digitação
    const textElement = document.querySelector(".efect-digit h2");
    if (textElement) {
        const text = "Nossos Serviços";
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                textElement.textContent = text.substring(0, index + 1);
                index++;
                setTimeout(typeEffect, 100); // Velocidade da digitação (100ms por caractere)
            } else {
                // Adiciona o cursor piscante após a digitação
                textElement.innerHTML += '<span class="cursor">|</span>';
                blinkCursor();
            }
        }

        function blinkCursor() {
            const cursor = document.querySelector(".efect-digit h2 .cursor");
            if (cursor) {
                setInterval(() => {
                    cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
                }, 500); // Velocidade do cursor piscante (500ms)
            }
        }

        typeEffect();
    }
});

// Funções de Pagamento
function mostrarDetalhesPagamento() {
    const metodoPagamento = document.getElementById("pagamento").value;
    const cartaoDetalhes = document.getElementById("cartaoDetalhes");
    const boletoDetalhes = document.getElementById("boletoDetalhes");
    const pixDetalhes = document.getElementById("pixDetalhes");

    // Esconde todos os detalhes primeiro
    if (cartaoDetalhes) cartaoDetalhes.style.display = "none";
    if (boletoDetalhes) boletoDetalhes.style.display = "none";
    if (pixDetalhes) pixDetalhes.style.display = "none";

    // Mostra os detalhes do método selecionado
    if (metodoPagamento === "cartao" && cartaoDetalhes) {
        cartaoDetalhes.style.display = "block";
    } else if (metodoPagamento === "boleto" && boletoDetalhes) {
        boletoDetalhes.style.display = "block";
    } else if (metodoPagamento === "pix" && pixDetalhes) {
        pixDetalhes.style.display = "block";
    }
}

function calcularParcelas() {
    const servicoSelecionado = document.getElementById("servico").value;
    const numeroParcelas = document.getElementById("parcelas").value;
    const valorParcelasElement = document.getElementById("valorParcelas");

    let valorTotal = 0;

    // Define o valor total com base no serviço selecionado
    switch (servicoSelecionado) {
        case "marketing":
            valorTotal = 1500;
            break;
        case "design":
            valorTotal = 800;
            break;
        case "manutencao":
            valorTotal = 200; // Valor por hora
            break;
        case "montagem":
            valorTotal = 300;
            break;
        default:
            valorTotal = 0;
    }

    // Calcula o valor das parcelas
    if (numeroParcelas && valorTotal > 0 && valorParcelasElement) {
        const valorParcela = valorTotal / numeroParcelas;
        valorParcelasElement.textContent = `Valor de cada parcela: R$ ${valorParcela.toFixed(2)}`;
    } else if (valorParcelasElement) {
        valorParcelasElement.textContent = "";
    }
}