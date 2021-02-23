// ==UserScript==
// @name            Get image URL Twitter
// @namespace       http://tampermonkey.net/
// @description     Context menu to execute UserScript
// @version         0.1
// @author          author
// @include         twitter.com
// @grant           GM_xmlhttpRequest
// @run-at          context-menu
// @connect         api2.elise.tech
// ==/UserScript==]



var imgList = document.querySelectorAll("img");
var index
for (index = 0; index < imgList.length; index++) {
    var parent = imgList[index].parentNode;
    if (parent.classList.contains("AdaptiveMedia-photoContainer")||parent.classList.contains("AdaptiveStreamGridImage")){
        var bouton = document.createElement("BUTTON");
        parent.append(bouton);
        bouton.innerText = "Send";
        bouton.onclick = buttonFunction(bouton);
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
;

function buttonFunction(bouton) {
    return function (event) {
        event.stopPropagation();
        event.preventDefault();
        bouton.style.background="red";
        bouton.innerText="SENT";
        var imgs = bouton.parentNode.querySelectorAll("img")
        for (index = 0; index < imgs.length; index++){
            var parentimg = imgs[index].parentNode;
            if(parentimg.classList.contains("AdaptiveMedia-photoContainer")){
                var img = imgs[index].getAttribute('src');
                postData(`https://api2.elise.tech/image-collect-dev-rhizlaine`, {url: img,RS:'Twitter',S3path:false});
                return false;
            }
            else{
                var img2 = bouton.parentNode.querySelector("img").getAttribute('src');
                postData(`https://api2.elise.tech/image-collect-dev-rhizlaine`, {url: img2,RS:'Twitter'});
                return false;
            }
        }
    }
};



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

