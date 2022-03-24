const readline = require("readline");

// créer une interface "psy" qui écoute les input et retourne des réponses
const psy = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// liste de réponses pré-construites du psy
const psySpeech = [
	"Hmmm d'accord... dites m'en plus.",
	"Hmmmm bien, bien...",
	"Ha oui ? Vous pouvez développer ?",
	"Hmm intéressant... continuez",
	"Hmmm intéressant, dites m'en d'avantage",
	"Ha quand meme, continuez...",
	"Hmm Hmm ha oui, intéressant.",
	"Hmmm... ça mérite reflexion...",
];

const psySpeechFavor = [
	"C'est gentil, mais concentrez-vous...",
	"Revenons à nos moutons...",
	"Pourquoi pas une autre fois ?",
	"Vous devriez en parlez à votre femme...",
	"C'est gênant...",
	"Hmm... dans ce cas je vous offre 10mn de plus",
];
const psySpeechAboutMother = [
	"Vous voulez parler de votre mère ?",
	"Ha, nous y voilà... parlez moi de votre mère",
	"Encore et toujours votre mère...",
	"Un problème avec votre mère ?",
];
const psySpeechAboutAnimals = [
	"Vous aimez les animaux ?",
	"Chiens et chats sont de bons amis...",
	"Vous avez eu animal dans votre enfance ?",
	"Avez-vous peur des animaux ?",
];
const psySpeechAboutTransports = [
	"Vous avez peur en voiture ?",
	"Avez-vous le permis de conduire ?",
	"Souhaitez-vous parler de vos vacances ?",
	"Le voyage ne fait que commencer....",
	"Avez-vous peur de l'avion ?",
];

// stockage des paroles  du patient
let patientSpeech = [];

// le psy dit bonjour
console.log(
	" -- TAPEZ `help` pour la liste des commandes -- \nPSY : Comment allez-vous aujourd'hui ?"
);

// quand le patient parle (cf: il appuie sur entree)
psy.on("line", function (answer) {
	switch (answer) {
		case "help":
			psyCommandHelp();
			break;

		case "stop":
			// on termine la séance
			finDeSeance();
			break;

		case "pause":
			// on log l'evenement puis
			patientSpeech.push(dateHM() + " --- Le patient fait une pause ---");
			break;

		case "soudoyer":
			// on log l'evenement puis
			patientSpeech.push(dateHM() + " --- Le patient tente de me soudoyer ---");
			// le psy répond une des réponses spéciales au hasard et on continue
			console.log("PSY : " + arrayRandom(psySpeechFavor));
			break;

		default:
			// on enregistre la réponse du patient dans le tableau patient
			patientSpeech.push(dateHM() + " - " + answer);
			if (
				isWordInPatientSpeech(answer, [
					"mere",
					"mère",
					"maman",
					"merre",
					"mamman",
					"mére",
					"reum",
				])
			) {
				// le psy répond une des réponses spéciale maman au hasard et on continue
				console.log("PSY : " + arrayRandom(psySpeechAboutMother));
			} else if (
				isWordInPatientSpeech(answer, [
					"animaux",
					"animal",
					"chien",
					"chat",
					"oiseau",
					"serpent",
					"cheval",
				])
			) {
				// le psy répond une des réponses spéciale animaux au hasard et on continue
				console.log("PSY : " + arrayRandom(psySpeechAboutAnimals));
			} else if (
				isWordInPatientSpeech(answer, [
					"voiture",
					"bus",
					"bateau",
					"camion",
					"vélo",
					"avion",
				])
			) {
				// le psy répond une des réponses spéciale transport au hasard et on continue
				console.log("PSY : " + arrayRandom(psySpeechAboutTransports));
			} else {
				// le psy répond une des réponses au hasard et on continue
				console.log("PSY : " + arrayRandom(psySpeech));
			}
	} // fin de switch
});

// fin de séance : le psy résume ce qu'a dit le patient et réclamme ses honoraires
function finDeSeance() {
	console.log("-----------------------------");
	console.log("PSY : ça fera 85€, merci, à très bientôt !");
	console.log("-----------------------------");
	const transcription = patientSpeech.join("\n");
	console.log("Transcription de la séance :\n" + transcription);
	console.log("-----------------------------");
	psy.close();
	process.exit(1);
}

// fin auto de la séance au bout de 2mn (faut pas déconner ^^)
setTimeout(function () {
	console.log("PSY : Désolé mais le temps est écoulé...");
	finDeSeance();
}, 120000);

function psyCommandHelp() {
	console.log(`Voici la liste des commandes possibles :
help     : obtenir la liste des commandes
stop     : arreter immédiatement la séance
pause    : prendre un peu de temps pour soi
soudoyer : payer pour obtenir des faveurs`);
}

function isWordInPatientSpeech(phrase, words) {
	let isIn = -1;
	phraseLowerCase = phrase.toLowerCase();
	words.forEach((word) => {
		const search = word;
		const regex = new RegExp(search, "g");
		if (phraseLowerCase.search(regex) >= 0) {
			isIn++;
		}
	});
	if (isIn >= 0) {
		return true;
	} else {
		return false;
	}
}

function dateHM() {
	let dateObject = new Date();
	let hours = dateObject.getHours();
	let minutes = dateObject.getMinutes();
	return hours + ":" + minutes;
}

function arrayRandom(array) {
	const arrayLength = array.length;
	const randomIndex = Math.floor(Math.random() * arrayLength);
	return array[randomIndex];
}
