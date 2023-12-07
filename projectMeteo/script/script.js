// Variable qui permet de stocker les infos Métos actuellement ouverte
let currentInfosMeteos;

// Fonction générique pour créer des éléments html dynamiquement
function createElementHtml(type, parent, id, className, contenu, event) {
    // Permet de créer un élément html en fonction du paramètre type
    let elementHtml = document.createElement(type);
    // Permet d'ajouter cet élément html à un parent en fonction du paramètre parent
    parent.appendChild(elementHtml);
    // Permet d'ajouter à cet élément html une id et une classe
    elementHtml.id = id;
    elementHtml.className = className;

    // Permet d'ajouter du contenu à cet élément html en fonction du paramètre contenu
    // Si on a crée un élément html de type p ou h2 : on change le contenu de la balise en fonction du paramètre contenu
    if (type === 'p' || type === 'h2') {
        elementHtml.textContent = contenu
    }

    // Si on a crée un élément html de type img : on ajoute une source d'image en fonction du paramètre contenu
    if (type === 'img') {
        elementHtml.src = contenu
    }

    // Si le paramètre event est correspond bien a une fonction :
    if (typeof event === 'function') {
        // Ajouter un écouteur d'évènement
        elementHtml.addEventListener('click', event);
    }

    // On retourne la variable elementHTML afin de pouvoir l'utiliser en dehors de la fonction createElementHtml
    return elementHtml;
}

createElementHtml('div', document.body, 'carte', 'carte')

// Fetch du json si l'api ne marche pas
fetch('script/apiMeteo.json')

    // Fetch de l'api
    // fetch('http://57.129.5.9:3000/villes')

    .then(response => response.json())
    .then(data => {
        // On fetch les données de l'api que l'on stocke dans data et on recherche les informations pour chaque ville
        data.forEach(ville => {
            // On créer des variables pour les différentes div d'affichage des informations
            let infosMeteosContainer
            let divInfos
            let divOtherInfos
            let divCity
            let carte

            // Récupération de la carte en js
            carte = document.querySelector("#carte")

            // Création des div city
            divCity = createElementHtml('div', carte, `divCity${ville.nom.toLowerCase().replace(/\s/g,'')}`, `div-city ${ville.nom.toLowerCase().replace(/\s/g,'')}`);

            // Création des boutons pour chaque ville
            createElementHtml('button', divCity, `buttonCity${ville.nom.toLowerCase().replace(/\s/g,'')}`, `button-city button-city-${ville.nom.toLowerCase().replace(/\s/g,'')}`, "", () => afficheInfosMeteo(ville));

            // Création du conteneur des informations météos
            infosMeteosContainer = createElementHtml('div', divCity, `infosMeteosContainer${ville.nom.toLowerCase().replace(/\s/g,'')}`, 'div-global');

            // Mise en place par défaut du conteneur en display none
            infosMeteosContainer.style.display = 'none';

            // Création de la balise titre dans le conteneur des informations météos
            createElementHtml('h2', infosMeteosContainer, `info${ville.nom}`, `info-${ville.nom.toLowerCase()}`, ville.nom);

            // Création d'une balise div pour contenir le nom de la ville, et les informations météos
            divInfos = createElementHtml('div', infosMeteosContainer, `divInfos${ville.nom}`, 'div-infos');

            // Création d'une balise img pour afficher une icone en fonction de la météo
            createElementHtml('img', divInfos, `conditionsMeteo${ville.nom}`, `conditions-meteo ${ville.nom.toLowerCase()}`, `img/${ville.conditionsMeteo}.jpg`);
            
            // Création d'une balise p pour affiche la température
            createElementHtml('p', divInfos, `temperature${ville.nom}`, `temperature ${ville.nom.toLowerCase()}`, `${ville.temperature}°C`);

            // Création d'une div pour contenir les informations météos supplémentaires
            divOtherInfos = createElementHtml('div', divInfos, `divOtherInfos${ville.nom}`, 'div-other-infos');

            // Création d'une balise p pour afficher le taux d'humidité
            createElementHtml('p', divOtherInfos, `humidite${ville.nom}`, `humidite ${ville.nom.toLowerCase()}`, `humidité : ${ville.humidite}`);
            
            // Création d'une balise p pour afficher les précipitations
            createElementHtml('p', divOtherInfos, `precipitations${ville.nom}`, `precipitations ${ville.nom.toLowerCase()}`, `précipitations : ${ville.precipitations}`);
            
            // Création d'une balise p pour afficher l'indice UV
            createElementHtml('p', divOtherInfos, `indiceUV${ville.nom}`, `indice-uv ${ville.nom.toLowerCase()}`, `indice UV : ${ville.indiceUV}`);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


function afficheInfosMeteo(ville) {
    // On récupère l'id de infosMeteosContainer et une variable pour stocker dans un conteneur chaque données météos
    let infosMeteosContainer = document.querySelector(`#infosMeteosContainer${ville.nom.toLowerCase().replace(/\s/g,'')}`);

    // Si une div est déjà ouverte, on la ferme d'abord
    if (currentInfosMeteos && currentInfosMeteos !== infosMeteosContainer) {
        currentInfosMeteos.style.display = 'none';
    }

    // On stocke la référence à la nouvelle div actuellement ouverte
    currentInfosMeteos = infosMeteosContainer;


    // On lui ajoute le style css display none par défaut et un "toggle" pour l'afficher ou non au clic
    infosMeteosContainer.style.display = (infosMeteosContainer.style.display === 'none') ? 'flex' : 'none';
}


 