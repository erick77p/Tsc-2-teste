function mostrarDetalhesPagamento() {
    const metodoPagamento = document.getElementById("pagamento").value;
    const cartaoDetalhes = document.getElementById("cartaoDetalhes");
    const boletoDetalhes = document.getElementById("boletoDetalhes");
    const pixDetalhes = document.getElementById("pixDetalhes");

    // Esconder todos os detalhes primeiro
    cartaoDetalhes.style.display = "none";
    boletoDetalhes.style.display = "none";
    pixDetalhes.style.display = "none";

    // Mostrar apenas os detalhes do método selecionado
    if (metodoPagamento === "cartao") {
        cartaoDetalhes.style.display = "block";
    } else if (metodoPagamento === "boleto") {
        boletoDetalhes.style.display = "block";
    } else if (metodoPagamento === "pix") {
        pixDetalhes.style.display = "block";
    }
}

function calcularParcelas() {
    const valorTotal = 3000; // Valor total do site
    const numeroParcelas = document.getElementById("parcelas").value;
    if (numeroParcelas) {
        const valorParcelas = valorTotal / numeroParcelas;
        document.getElementById("valorParcelas").innerText = `Valor de cada parcela: R$ ${valorParcelas.toFixed(2)}`;
    } else {
        document.getElementById("valorParcelas").innerText = "";
    }
}