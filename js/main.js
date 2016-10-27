document.addEventListener('DOMContentLoaded', onDOMContentLoad);

function onDOMContentLoad() {

  //Defines how many Pokemons we are loading at a time + the 'step' when loading subsequent Pokemons
  var loadDataParams = {
    limit: 12,
    offset: 0
  };

  var pokemonContainer = document.querySelector(".pokemon-container");
  pokemonContainer.addEventListener('click', displayPokemonDetails);

  var pokemonDetailsContainer = document.querySelector(".pokemon-details");

  var loadMoreBtn = document.querySelector('.js-load-more');
  loadMoreBtn.addEventListener('click', getPokemons);

  getPokemons();


  function getPokemons() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://pokeapi.co/api/v1/pokemon/?limit=' + loadDataParams.limit + '&offset=' + loadDataParams.offset);
    xhr.send();

    xhr.onload = function () {
      console.log('DONE', xhr.status);
      //drawCards();
      var rawData = JSON.parse(this.responseText);
      var pokemonData = rawData.objects;
      drawCards(pokemonData);

      //Check if we reached maximum and hide the Load More button
      if (rawData.meta.next) {
        loadMoreBtn.classList = 'js-load-more visible load-btn';
      } else {
        loadMoreBtn.classList = 'js-load-more hidden load-btn';
      }
      //Increases offset value so that when clicking the Load More button, we get the next set of Pokemons
      loadDataParams.offset += loadDataParams.limit;
    };
  }

  function drawCards(array) {

    var docFragment = document.createDocumentFragment();

    array.forEach(createCard);

    function createCard(element) {
      var pokemonCard = document.createElement('article');
      pokemonCard.setAttribute('data-pokemon-id', element.pkdx_id);
      pokemonCard.classList = 'pokemon-card';

      var image = document.createElement('img');
      image.setAttribute('src', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRCU1Rz-LMD-g3k4bpd1jsDM_zJSqe45NkF3h2CmBaz0ORsEi-FzA');
      //image.setAttribute('src', 'http://pokeapi.co/media/img/' + element.pkdx_id + '.png');
      pokemonCard.appendChild(image);

      var pokemonName = document.createElement('h3');
      pokemonName.textContent = element.name;
      pokemonCard.appendChild(pokemonName);

      element.types.forEach(function (element) {
        var label = document.createElement('div');
        label.textContent = element.name;
        label.classList = 'type-label';

        switch (element.name) {
          case 'normal':
            label.classList += ' normal-type';
            break;
          case 'fighting':
            label.classList += ' fighting-type';
            break;
          case 'flying':
            label.classList += ' flying-type';
            break;
          case 'poison':
            label.classList += ' poison-type';
            break;
          case 'ground':
            label.classList += ' ground-type';
            break;
          case 'rock':
            label.classList += ' rock-type';
            break;
          case 'bug':
            label.classList += ' bug-type';
            break;
          case 'ghost':
            label.classList += ' ghost-type';
            break;
          case 'steel':
            label.classList += ' steel-type';
            break;
          case 'fire':
            label.classList += ' fire-type';
            break;
          case 'water':
            label.classList += ' water-type';
            break;
          case 'grass':
            label.classList += ' grass-type';
            break;
          case 'electric':
            label.classList += ' rock-type';
            break;
          case 'psychic':
            label.classList += ' psychic-type';
            break;
          case 'ice':
            label.classList += ' ice-type';
            break;
          case 'dragon':
            label.classList += ' dragon-type';
            break;
          case 'dark':
            label.classList += ' dark-type';
            break;
          case 'fairy':
            label.classList += ' fairy-type';
            break;
        }
        pokemonCard.appendChild(label);
      });
      docFragment.appendChild(pokemonCard);
    }

    pokemonContainer.appendChild(docFragment);
  }

  function displayPokemonDetails(event) {
    var target = event.target;
    while (target != event.currentTarget) {
      // Check if user is clicking a pokemon card +
      // Check if the same pokemon is being clicked (if yes, do not send request)
      if (isPokemonCard(target) &&
        (target.getAttribute('data-pokemon-id') != pokemonDetailsContainer.getAttribute('data-pokemon-id'))) {
        pokemonDetailsContainer.classList = 'pokemon-details visible';
        pokemonDetailsContainer.setAttribute('data-pokemon-id',target.getAttribute('data-pokemon-id'));
        getPokemonDetails(target.getAttribute('data-pokemon-id'));
        return;
      }
      target = target.parentNode;
    }
  }

  function isPokemonCard(target) {
    return target.hasAttribute('data-pokemon-id');
  }

  function getPokemonDetails(pokemonId) {
    var req = new XMLHttpRequest();

    req.open('GET', 'http://pokeapi.co/api/v1/pokemon/' + pokemonId + '/');
    req.send();

    req.onload = function () {
      var pokemonData = JSON.parse(this.responseText);

      //Fill table with Pokemon details
      //(Consider) Maybe use a list with properties instead of multiple variables?
//      var image = document.querySelector('.pokemon-details img');
//      image.setAttribute('src', 'http://pokeapi.co/media/img/' + pokemonData.pkdx_id + '.png');
//      image.setAttribute('alt', 'Pokemon image for ' + pokemonData.name);

      var name = document.querySelector('.pokemon-details h3');
      name.textContent = pokemonData.name + ' #' + pokemonData.pkdx_id;

      var type = document.querySelector('[data-details-type="types"]');
      type.textContent = ''; //Clean data from previous Pokemon
      pokemonData.types.forEach(function (element) {
        type.textContent += element.name + " ";
      });

      var attack = document.querySelector('[data-details-type="attack"]');
      attack.textContent = pokemonData.attack;

      var defense = document.querySelector('[data-details-type="defense"]');
      defense.textContent = pokemonData.defense;

      var hp = document.querySelector('[data-details-type="hp"]');
      hp.textContent = pokemonData.hp;

      var sp_atk = document.querySelector('[data-details-type="sp_attack"]');
      sp_atk.textContent = pokemonData.sp_atk;

      var sp_def = document.querySelector('[data-details-type="sp_def"]');
      sp_def.textContent = pokemonData.sp_def;

      var speed = document.querySelector('[data-details-type="speed"]');
      speed.textContent = pokemonData.speed;

      var weight = document.querySelector('[data-details-type="weight"]');
      weight.textContent = pokemonData.weight;

      var totalMoves = document.querySelector('[data-details-type="moves"]');
      totalMoves.textContent = pokemonData.moves.length;
    }
  }

}
