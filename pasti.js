/*var els = document.getElementsByTagName("*");
var pasti = chrome.extension.getURL("pastillita.jpg");
var pastihtml = chrome.extension.getURL("pastillita.html");

function pastifyIntense(array){
  for(var i = 0; i<array.length; i++){
    if(array[i].tagName != 'IMG' && array[i].tagName != 'SCRIPT'){
      array[i].style.backgroundImage = "url('" + pasti + "')";
      array[i].style.backgroundSize = "cover";
      }
    if(array[i].tagName == 'IMG'){
      array[i].src = '"' + pasti + '"';
    }
    if(array[i].tagName == 'IFRAME'){
      var newEl = document.createElement("img");
      array[i].style.visibility = "hidden";
      newEl.src = '"' + pasti + '"';
      newEl.width = array[i].width;
      newEl.height = array[i].height;
      array[i].parentNode.insertBefore(newEl, array[i]);
      array[i].parentNode.removeChild(array[i]);
    }
  }
}

function pastifyHigh(array){
  for(var i = 0; i<array.length; i++){
    if(array[i].tagName != 'IMG' && array[i].tagName != 'SCRIPT'){
      array[i].style.backgroundImage = "url('" + pasti + "')";
      array[i].style.backgroundSize = "cover";
      }
    if(array[i].tagName == 'IMG'){
      array[i].src = pasti  ;
    }

  }
}

function lowPastification(array){
  for(var i = 0; i<array.length; i++){
    if(array[i].tagName == 'IFRAME'){
      var newEl = document.createElement("img");
      array[i].style.visibility = "hidden";
      newEl.src = pasti ;
      newEl.width = array[i].width;
      newEl.height = array[i].height;
      array[i].parentNode.insertBefore(newEl, array[i]);
      array[i].parentNode.removeChild(array[i]);
    }
  }
}

switch(option){
  case 1:
    els = document.getElementsByTagName("iframe");
    lowPastification(els);
    break;
  case 2:
    els = document.getElementsByTagName("img");
    pastifyHigh(els);
    break;
  case 3:
    els = document.getElementsByTagName("div");
    pastifyHigh(els);
    els = document.getElementsByTagName("span");
    pastifyHigh(els);
    break;
  case 4:
    pastifyIntense(els);
    break;
  default:
}
*/
var artData = {};

function elExist(array, element){

  if(array.indexOf(element)>-1){

    return true;

  }else{

    return false;

  }

}
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function getDomain(url){

  var host = extractHostname(url);
  var testGob = /gob|gov/i;

  artData["domain"] = testGob.test(host);


}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }

    var first = domain.split(".");
    return first[0];
}


function getAutor(){



  var elements = document.getElementsByTagName('*');
  var regAutor = /autor|author/g;
  var forbWords = /redacción|redaccion|staff|personal/i;
  var domain = extractHostname(location.href);
  var f = false;
  var prevAut = artData["author"];


  for(var i = 0; i<elements.length; i++){

    var aClass = elements[i].className || "";
    var id = elements[i].id || "";

    if(regAutor.test(aClass) || regAutor.test(id) && !regAutor.test(domain) && !regAutor.test("staff") && !forbWords.test(artData["author"])){

      //chrome.runtime.sendMessage({found:true, au:elements[i].innerHTML});
      artData["author"] = delHtml(elements[i].innerHTML);
      return;

    }

  }

  if(!f){

    artData["author"] = null;

  }


  //chrome.runtime.sendMessage({found:false});

}

function getTitle(){

  if(artData["title"] != null)
    return;

  var elements = document.getElementsByTagName('*');
  var regAutor = /title|titulo/g;

  for(var i = 0; i<elements.length; i++){

    var aClass = elements[i].className || "";
    var id = elements[i].id || "";
    var domain = extractRootDomain(location.href);
    if(regAutor.test(aClass) || regAutor.test(id) && !regAutor.test(domain) && !regAutor.test("staff")){

      //chrome.runtime.sendMessage({found:true, au:elements[i].innerHTML});
      artData["title"] = elements[i].innerHTML;

    }

  }

  //chrome.runtime.sendMessage({found:false});


}

function getContact(){

  var elements = document.getElementsByTagName('*');
  var regAutor = /redes-sociales|social|facebook|twitter|instagram|linkedin|fb|tw/g;
  var fb = /facebook|fb/i;
  var twi = /twitter|tw/i;
  var inst = /instagram/i;
  var linked = /linkedin/i;
  var famous = /universal|norte|reforma|economista/i;
  artData["contacto"] ={};
  artData["contacto"]["red"] = [];
  for(var i = 0; i<elements.length; i++){

    var aClass = elements[i].className || "";
    var id = elements[i].id || "";
    var domain = extractHostname(location.href);
    if(regAutor.test(aClass) || regAutor.test(id) && regAutor.test(elements[i].innerHTML)){

      //chrome.runtime.sendMessage({found:true, au:elements[i].innerHTML});

      if(fb.test(elements[i].innerHTML) || fb.test(aClass) || fb.test(id)){

        if(!elExist(artData["contacto"]["red"], "Facebook")){

          artData["contacto"]["red"].push("Facebook");

        }


      }

      if(twi.test(elements[i].innerHTML) || twi.test(aClass) || twi.test(id)){

        if(!elExist(artData["contacto"]["red"], "Twitter")){

          artData["contacto"]["red"].push("Twitter");

        }


      }

      if(inst.test(elements[i].innerHTML) || inst.test(aClass) || inst.test(id)){

        if(!elExist(artData["contacto"]["red"], "Instagram")){

          artData["contacto"]["red"].push("Instagram");

        }


      }

      if(linked.test(elements[i].innerHTML) || inst.test(aClass) || inst.test(id)){

        if(!elExist(artData["contacto"]["red"], "Linkedin")){

          artData["contacto"]["red"].push("Linkedin");

        }


      }



    }

    if(famous.test(domain)){

      artData["contacto"]["conocido"] = true;

    }else{

      artData["contacto"]["conocido"] = false;

    }

  }

}

function getFecha(){

  if(artData["date_published"] != null)
    return;

  var elements = document.getElementsByTagName('*');
  var regAutor = /fecha|date|timestamp|time/g;

  for(var i = 0; i<elements.length; i++){

    var aClass = elements[i].className || "";
    var id = elements[i].id || "";
    var domain = extractRootDomain(location.href);
    if(regAutor.test(aClass) || regAutor.test(id)  ){

      //chrome.runtime.sendMessage({found:true, au:elements[i].innerHTML});
      artData["date_published"] = elements[i].innerHTML;
      return;

    }

  }

}

function allData(){

  var url = "https://mercury.postlight.com/parser?url="+location.href;
  var ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.setRequestHeader("x-api-key", "7nieJu3M7FIDTg9EEzE1hLYbeNMAwxQDvDmk7MmA");

  ajax.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){

      artData = JSON.parse(this.responseText);
      functionSet();
      //console.log(artData);


    }

  }
  ajax.send();

}

function getBody(){

  var para = document.getElementsByTagName("p");
  var buffer = "";

  for(var i = 0; i<para.length; i++){

    buffer += delHtml(para[i].innerHTML);

  }

  artData["body"] = buffer;

}

function delHtml(sHtml){

  var nonReg = /<([^>]+)>/g;
  var quitScript = /<script>.+<\/script>/g;
  var quitSpan = /<span .+>.+<\/span>/gs;

  var unscripted = sHtml.replace(quitScript, "");
  var unspanned = unscripted.replace(quitSpan, "");
  return unspanned.replace(nonReg, "");

}
var g = "lol";
function getAdjPercent(conll){

  var total_words = 0;
  var total_adj = 0;
  var ismo = /isimo|isima|ísimo|ísima/g;

  for(var i = 0; i<conll["result"]["output"]["sentences"].length; i++){

    for(var j = 0; j<conll["result"]["output"]["sentences"][i]["words"].length; j++ ){

      if(conll["result"]["output"]["sentences"][i]["words"][j]["features"]["fPOS"] == "ADJ++" ||
          conll["result"]["output"]["sentences"][i]["words"][j]["features"]["fPOS"] == "ADV++" ||
          conll["result"]["output"]["sentences"][i]["words"][j]["universal_pos"] == "X"){

            total_adj++;
            total_words++;
            if(ismo.test(conll["result"]["output"]["sentences"][i]["words"][j]["form"])){

              total_adj++;

            }


          }else{

            total_words++;

          }

    }

  }

  var perc = (total_adj/total_words)*100;
  artData["adje"] = perc;
  chrome.runtime.sendMessage({data: artData});


}

function parseParagraph(){

  var url = "https://api.algorithmia.com/v1/algo/deeplearning/Parsey/1.1.0";
  var ajax = new XMLHttpRequest();

  ajax.open("POST", url, true);
  //Content-Type: application/json
  ajax.setRequestHeader("Content-Type", "application/json");
  //Authorization: Simple simpHLqJ9kmgBQjVPz/ppWC4zqe1
  ajax.setRequestHeader("Authorization", "simpHLqJ9kmgBQjVPz/ppWC4zqe1");
  ajax.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){

      //console.log(this.responseText);
      getAdjPercent(JSON.parse(this.responseText));

    }

  }
  var d = {};
  /*
  "src":"Algorithmia is de enige plek waar je nederlands met syntaxnet kunnen ontleden.",
  "format":"tree",
  "language":"dutch"
  */
  d["src"] = artData["body"];
  d["format"] = "conll";
  d["language"] = "spanish";
  ajax.send(JSON.stringify(d));

}

function getInts(){

  var els = document.querySelectorAll("p a");
  artData["ints"] = [];
  var domain =  extractHostname(location.href);
  var reDomain = new RegExp(domain+"|^\/.+$|#", "gi");
  for(var i = 0; i<els.length; i++){

    if(!reDomain.test(els[i].href)){

      artData["ints"].push(els[i].href);

    }


  }

}

function functionSet(){

  getAutor();
  getTitle();
  getFecha();
  getBody();
  getContact();
  getInts();
  getDomain(location.href);
  parseParagraph();

}

function testParseObj(){

  var url = chrome.extension.getURL("test2Obj.json");
  var xml = new XMLHttpRequest();
  xml.open("GET", url, true);

  xml.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      getAdjPercent(JSON.parse(this.responseText));

    }

  }

  xml.send();

}

//allData();getBody();
//console.log(artData);
allData();
