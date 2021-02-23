// ==UserScript==
// @name            Get image URL Instagram
// @namespace       http://tampermonkey.net/
// @description     Context menu to execute UserScript
// @version         0.1
// @author          author
// @include         www.instagram.com
// @grant           GM_xmlhttpRequest
// @run-at          context-menu
// @connect         api2.elise.tech
// ==/UserScript==]



var imgList = document.querySelectorAll("img"); // Recupère les balises img de la page
var index
for (index = 1; index < imgList.length; index++) { // On parcourt les images
    var parent = imgList[index].parentNode.parentNode.parentNode.parentNode; // On recupère la balise parent de l’image
    if (parent.querySelectorAll("button").length == 0){ // Si on a pas déjà de bouton alors
        var bouton = document.createElement("BUTTON"); // On crée un bouton
        parent.append(bouton);// On l’ajoute dans le css
        bouton.innerHTML = "SEND";
        bouton.onclick = buttonFunction(bouton);// Au clique on effectue la fonction buttonFunction
        bouton.style.background="#404040";
        bouton.style.color="#fff";
        bouton.style.textAlign = "center";
        bouton.style.position = "absolute";
        bouton.style.top = "0px";
        bouton.style.right = "0px";
        bouton.style.fontSize = "14px";
        bouton.style.border = "0px";
        bouton.style.borderBottomLeftRadius = "6px";
        bouton.style.fontWeight= "bold";
    }
}


function buttonFunction(bouton) { // Pour le bouton cliqué
    return function (event) {
        event.stopPropagation(); // Pour éviter que la clic sur la photo soit considérer lorsqu’on clique sur le bouton
        event.preventDefault();
        bouton.style.background="red";
        bouton.innerText="SENT";
        var img = bouton.parentNode.querySelector("img").getAttribute('src'); // On récupère le lien
        postData(`https://api2.elise.tech/image-collect-dev-rhizlaine`, {url: img,RS:'Instagram'});
        return false;
    }
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return GM_xmlhttpRequest({
        method: "POST",
        url: url,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        onload: function(response) {
            console.log(response);
        }
    });
}


