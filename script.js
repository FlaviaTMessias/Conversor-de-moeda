// Pega os elementos do HTML
const botaoConverter = document.getElementById("converter");
const campoValor = document.getElementById("valor");
const campoMoeda = document.getElementById("moeda");
const campoResultado = document.getElementById("resultado");

// Função para buscar a cotação da moeda
async function buscarCotacao(moeda)
 {
  //try é usado em conjunto com as palavras-chave catch e finally para capturar e lidar com erros. acessando um arquivo ou fazendo uma requisição à API
  try {
    const url = `https://economia.awesomeapi.com.br/last/${moeda}-BRL`;
    //await - para aguardar a resolução de uma promessa (Promise) dentro de uma função assíncrona. Ela só pode ser utilizada dentro de uma função marcada com async.
    const resposta = await fetch(url);

    if (!resposta.ok) {
      //O new é usado em conjunto com throw para criar uma nova instância de um erro. A forma mais comum de uso é lançar um erro utilizando um objeto do tipo Error (ou suas subclasses, como TypeError, RangeError, etc.
      throw new Error("Erro ao buscar os dados da API");
    }

    const dados = await resposta.json();
    const cotacao = parseFloat(dados[`${moeda}BRL`].bid);
    return cotacao;
  } catch (erro) {
    console.error("Erro ao buscar cotação:", erro);
    return null;
  }
}

// Função principal para converter moeda
async function converterMoeda() {
  const valorEmReais = parseFloat(campoValor.value);
  const moedaSelecionada = campoMoeda.value; // USD, EUR, GBP

  if (isNaN(valorEmReais) || valorEmReais <= 0) {
    campoResultado.textContent = "Por favor, digite um valor válido.";
    return;
  }

  // Busca a cotação da moeda em tempo real
  const cotacao = await buscarCotacao(moedaSelecionada);

  if (cotacao) {
    const valorConvertido = valorEmReais / cotacao;
    campoResultado.textContent = `Resultado: ${valorConvertido.toFixed(2)} ${moedaSelecionada}`;
  } else {
    campoResultado.textContent = "Erro ao buscar a cotação. Tente novamente.";
  }
}

// Adiciona evento ao botão
botaoConverter.addEventListener("click", converterMoeda);
