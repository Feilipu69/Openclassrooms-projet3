// ECRIRE UNE FONCTION AJAX GENERIQUE
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback en cas de succès

function ajaxGet(url, callback) // callback est une fonction appelée
{
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function()
	{
		if(req.status >= 200 && req.status < 400)
		{
			// Appelle la fonction callback en lui passant la réponse de la requête en paramètre
			callback(req.responseText);
		}
		else
		{
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function()
	{
		console.error("Erreur réseau avec l'URL " + url);
	});
	req.send(null);
}

// création de la fonction qui sera appelée avec callback
function afficher(reponse)
{
	console.log(reponse); // lors de l'appel, reponse est remplacé par : req.responseText
}
