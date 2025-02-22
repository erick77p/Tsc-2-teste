// Função principal que é executada quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Adiciona evento de clique ao botão de buscar cliente
    document.getElementById("botao-buscar").addEventListener("click", buscarCliente);

    // Adiciona evento de clique ao botão de gerar PDF
    document.getElementById("botao-pdf").addEventListener("click", gerarPDF);

    // Preenche os dados iniciais (opcional)
    const dadosIniciais = {
        cliente: "Nome Cliente",
        empresa: "Nome Empresa",
        cnpj: "00.000.000/0001-00",
        endereco: "Endereço da Empresa",
        cpf: "000.000.000-00",
        cidade: "Cidade Padrão",
        estado: "Estado Padrão",
        representante_fornecedor: "Nome do Representante",
        nome_cliente: "Nome do Cliente",
        data: "01/01/2023"
    };
    preencherDados(dadosIniciais);
});

// Função para buscar dados do cliente (simulação de banco de dados)
function buscarCliente() {
    const cpf = document.getElementById("cpf-busca").value;

    // Simulação de um banco de dados de clientes
    const clientes = [
        {
            cliente: "João Silva",
            empresa: "Tech Solutions",
            cnpj: "12.345.678/0001-99",
            endereco: "Rua Exemplo, 123",
            cpf: "123.456.789-00",
            cidade: "São Paulo",
            estado: "SP",
            representante_fornecedor: "Carlos Mendes",
            nome_cliente: "João Silva",
            data: "10/10/2023"
        },
        {
            cliente: "Maria Oliveira",
            empresa: "InovaTech",
            cnpj: "98.765.432/0001-11",
            endereco: "Avenida Teste, 456",
            cpf: "987.654.321-00",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            representante_fornecedor: "Ana Souza",
            nome_cliente: "Maria Oliveira",
            data: "15/10/2023"
        }
    ];

    // Busca o cliente pelo CPF
    const clienteEncontrado = clientes.find(cliente => cliente.cpf === cpf);

    if (clienteEncontrado) {
        preencherDados(clienteEncontrado);
    } else {
        alert("Cliente não encontrado!");
    }
}

// Função para preencher os dados do cliente no contrato
function preencherDados(dados) {
    document.getElementById("empresa").textContent = dados.empresa;
    document.getElementById("cnpj").textContent = dados.cnpj;
    document.getElementById("endereco_empresa").textContent = dados.endereco;
    document.getElementById("cliente").textContent = dados.cliente;
    document.getElementById("cpf").textContent = dados.cpf;
    document.getElementById("cidade").textContent = dados.cidade;
    document.getElementById("estado").textContent = dados.estado;
    document.getElementById("representante_fornecedor").textContent = dados.representante_fornecedor;
    document.getElementById("nome_cliente").textContent = dados.nome_cliente;
    document.getElementById("data").textContent = dados.data;
}

// Função para gerar o PDF do contrato
function gerarPDF() {
    const { jsPDF } = window.jspdf; // Importa a biblioteca jsPDF
    const doc = new jsPDF(); // Cria um novo documento PDF

    // Adiciona o título ao PDF
    doc.setFontSize(18);
    doc.text("Contrato de Prestação de Serviços de Banco de Dados Empresarial", 10, 10);

    // Captura o conteúdo do contrato
    const contratoTexto = document.getElementById("contrato").innerText;

    // Adiciona o texto do contrato ao PDF
    doc.setFontSize(12);
    doc.text(contratoTexto, 10, 20, { maxWidth: 180 }); // Define a largura máxima do texto

    // Salva o PDF com o nome "contrato.pdf"
    doc.save("contrato.pdf");
}