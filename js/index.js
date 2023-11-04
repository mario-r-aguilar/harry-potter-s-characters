// Importa el archivo que contiene un array con imágenes faltantes en la api de personajes conocidos
import { dataRest } from './auxFile.js';

// Obtiene la información de los personajes desde una api
fetch('https://hp-api.onrender.com/api/characters')
	.then((res) => {
		// Convierte la respuesta http a json
		return res.json();
	})
	.then((data) => {
		// Guarda los datos convertidos a json en una variable llamada data
		if (!data) {
			// Si data llega vacía muestra un error
			throw new Error("What happened? Nothing... You haven't the data");
		} else {
			// Objeto global Set que permite sólo almacenar valores únicos
			const uniqueNames = new Set();
			let dataHP = data.filter((item) => {
				if (!uniqueNames.has(item.name)) {
					uniqueNames.add(item.name);
					return true; // Mantiene el elemento si es un nombre único
				}
				return false; // Descarta elementos duplicados
			});

			// Selecciona la sección del html donde se renderizara el listado de personajes para elegir
			const search = document.getElementById('search');
			search.innerHTML = '';

			// Selecciona la sección del html donde se renderizaran los personajes
			const html = document.getElementById('characters');
			html.innerHTML = '';

			// Crea el listado de personajes y asigna las propiedades de la etiqueta html
			const select = document.createElement('select');
			select.name = 'selectCharacter';
			select.id = 'selectCharacter';

			// Crea la opción por defecto y la incluye dentro del listado
			const defaultOption = document.createElement('option');
			defaultOption.value = 'choiceOne';
			defaultOption.text = 'Elegir un personaje';
			select.appendChild(defaultOption);

			// Recorre el array de personajes
			dataHP.forEach((element) => {
				// Añade la url de la foto a la propiedad image a los personajes más reconocidos que no la tienen
				if (!element.image) {
					const elementName = dataRest.find(
						(dato) => dato.name === element.name
					);

					if (elementName) {
						element.image = elementName.image;
					}
				}

				// Solo renderiza los personajes con fotos obtenidas desde la api o desde el array local
				if (element.image) {
					// Renderiza los nombres de los personajes en el listado
					const option = document.createElement('option');
					option.value = element.name;
					option.text = element.name;
					select.appendChild(option);
					search.appendChild(select);
					select.setAttribute('class', 'form-control m-3 mb-5 w-25');

					// Renderiza los personajes
					const characters = document.createElement('div');
					characters.setAttribute('class', 'mb-3');

					characters.innerHTML = `
                    	<div id="card" class="card text-center m-6 text-bg-light" style="width: 15rem; height: 20rem">

							<div class="card-inner">

								<div class="card-front">
                    				<img class="card-img-top img-fluid w-100 h-75 character-image" src="${
											element.image
										}" alt="${element.name}">
                    				<h5 class="card-title pt-4">${element.name}</h5>
								</div>

								<div class="card-back">
									<h5 class="card-title ">${element.name}</h5>
									<p>${element.ancestry}</p>
									<p>Casa: ${element.house || 'N/A'}</p>
									<p>Patronus: ${element.patronus || 'N/A'}</p>
									<p>Especie: ${element.species || 'N/A'}</p>
									<p>Nacimiento: ${element.dateOfBirth || 'N/A'}</p>
								</div>
                    
							</div>

						</div>
                    `;

					html.append(characters);

					// En caso de que por algún motivo las urls agregadas arrojen un 404, renderiza una imagen local
					const characterImage =
						characters.querySelector('.character-image');
					characterImage.addEventListener('error', function () {
						this.src = 'notFound.webp';
					});
				}
			});

			// Al mantener presionado el puntero sobre la imagen, muestra la información del personaje
			const card = document.getElementById('card');
			card.addEventListener('click', () => {
				card.classList.toggle('active');
			});

			// Cuando se selecciona un personaje, solo renderiza el personaje elegido
			select.addEventListener('change', () => {
				const showAllCharactersContainer = document.querySelector(
					'#showAllCharactersContainer'
				);
				showAllCharactersContainer.classList.remove(
					'showAllCharactersContainer'
				);

				// Busca el elemento seleccionado en el array
				const selectedName = select.value;
				const selectedCharacter = dataHP.find(
					(character) => character.name === selectedName
				);

				// Renderiza el personaje elegido
				const html = document.getElementById('characters');
				html.innerHTML = '';
				const characters = document.createElement('div');
				characters.setAttribute('class', 'mb-3');

				characters.innerHTML = `
					<div id="card" class="card text-center m-6 text-bg-light" style="width: 15rem; height: 20rem">

						<div class="card-inner">

							<div class="card-front">
								<img class="card-img-top img-fluid w-100 h-75 character-image" src="${
									selectedCharacter.image
								}" alt="${selectedCharacter.name}">
								<h5 class="card-title pt-4">${selectedCharacter.name}</h5>
							</div>

							<div class="card-back">
								<h5 class="card-title ">${selectedCharacter.name}</h5>
								<p>${selectedCharacter.ancestry}</p>
								<p>Casa: ${selectedCharacter.house || 'N/A'}</p>
								<p>Patronus: ${selectedCharacter.patronus || 'N/A'}</p>
								<p>Especie: ${selectedCharacter.species || 'N/A'}</p>
								<p>Nacimiento: ${selectedCharacter.dateOfBirth || 'N/A'}</p>
							</div>
			
						</div>

					</div>
				`;

				html.append(characters);
			});
		}
	})
	.catch((err) => console.error({ error: err }));
