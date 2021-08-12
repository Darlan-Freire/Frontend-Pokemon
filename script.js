//Variáveis Globais
let inputBuscar = null, //campo input de pesquisa
  botaoBuscar = null, //botao de buscar
  painelPokemon = null, //Painel com a foto do pokemon
  painelEstatisticas = null, //painel de estatísticas do pokemon
  divInteraction = null, //Área de pesquisar pokémon
  divSpinner = null, //Snipper de Aguarde...
  InputValue = '', //variável GLOBAL que irá conter o texto do input.
  arrayPokemon = []; //Array do pokemon

//Carregamento dos elementos do DOM (Document Object Model)
window.addEventListener('load', () => {
  mapElements(); //Mapeamento dos elementos no HTML
  showInteraction(); //função que faz a troca da tela de Aguarde... Para tela de pesquisar
  handleButton(); //função de ação do botão pesquisar
  events(); //eventos previstos que irão acontecer
});

function mapElements() {
  inputBuscar = document.querySelector('#inputBuscar');
  botaoBuscar = document.querySelector('#botaoBuscar');
  painelPokemon = document.querySelector('#painelPokemon');
  painelEstatisticas = document.querySelector('#painelEstatisticas');
  divInteraction = document.querySelector('#divInteraction');
  divSpinner = document.querySelector('#divSpinner');
}

function handleButton() {
  botaoBuscar.addEventListener('click', async () => {
    const text = InputValue.toLowerCase();
    if (text !== '') {
      try {
        await fetchPokemon(text);
        renderPokemon();
        renderEstatisticas();
      } catch (erro) {
        alert('POKÉMON NÃO EXISTE. Digite um nome válido!');
      }
    } else {
      alert('CAMPO PESQUISAR ESTÁ VAZIO!');
    }
  });
}

function events() {
  inputBuscar.addEventListener('keyup', async (event) => {
    InputValue = event.target.value;
    const currentKey = event.key;
    if (currentKey !== 'Enter') {
      return;
    } else {
      const filterText = InputValue.toLowerCase();
      if (filterText !== '') {
        try {
          await fetchPokemon(filterText);
          renderPokemon();
          renderEstatisticas();
        } catch (erro) {
          alert('POKÉMON NÃO EXISTE. Digite um nome válido!');
        }
      } else {
        alert('CAMPO PESQUISAR ESTÁ VAZIO!');
      }
    }
  });
}

async function fetchPokemon(filterText) {
  /*Implementação da requisição HTTP, 
  para carregar os dados dos Pokémons que chegam da API*/
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${filterText}`);
  const json = await res.json();
  arrayPokemon = json;
}

function showInteraction() {
  setTimeout(() => {
    divSpinner.classList.add('hidden');
    divInteraction.classList.remove('hidden');
  }, 1000);
}

function renderPokemon() {
  painelPokemon.innerHTML = '';
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.classList.add('flex-row');

  const img = `<img class='avatar' src="${arrayPokemon.sprites.other.dream_world.front_default}" alt="${arrayPokemon.name}"/>`;
  li.innerHTML = `${img}`;
  ul.appendChild(li);
  painelPokemon.appendChild(ul);
}

function renderEstatisticas() {
  painelEstatisticas.innerHTML = `
  <div style="color: white">
    <h3 style="font-size: 1.2rem"><strong>Estatísticas</strong></h3>
    <ul style="font-size: 1.2rem">
      <li>Nome: ${arrayPokemon.name}</strong></li>
      <li>Registro: ${arrayPokemon.id}</li>
      <li>Tipo: ${arrayPokemon.types[0].type.name}</li>
      <li>Experiência base: ${arrayPokemon.base_experience}</li>
      <li>HP: ${arrayPokemon.stats[0].base_stat}</li>
      <li>Ataque: ${arrayPokemon.stats[1].base_stat}</li>
      <li>Defesa: ${arrayPokemon.stats[2].base_stat}</li>
      <li>Velocidade: ${arrayPokemon.stats[5].base_stat}</li>
    </ul>
  </div>
  `;
}
