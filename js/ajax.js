// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback en cas de succès

function ajaxGet(url, callback) // callback est une fonction appelée
{
	// création d'une requête HTTP
	let req = new XMLHttpRequest();

	// requête HTTP GET asynchrone (le troisième paramètre true est absent)
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

	req.send(null); // Envoi de la requête
}
