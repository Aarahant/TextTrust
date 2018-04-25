/*chrome.browserAction.onClicked.addListener(function(tab){
  console.log("initiating");
  chrome.tabs.executeScript(null,{
    file:"pasti.js"
  });


});*/

function s(str){

  return document.getElementById(str);

}

function performAjax(){

  var url = "https://api.algorithmia.com/v1/algo/nlp/SentimentAnalysis/1.0.4";
  var ajax = new XMLHttpRequest();

  ajax.open("POST", url, true);
  //Content-Type: application/json
  ajax.setRequestHeader("Content-Type", "application/json");
  //Authorization: Simple simpHLqJ9kmgBQjVPz/ppWC4zqe1
  ajax.setRequestHeader("Authorization", "simpHLqJ9kmgBQjVPz/ppWC4zqe1");
  ajax.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){

      console.log(this.responseText);

    }

  }
  var d = {};
  d["document"] = "LOL";
  ajax.send(JSON.stringify(d));

}

document.addEventListener("DOMContentLoaded", function(){

  s("button").addEventListener("click", function(){
    console.log("Sí funciona");
    s("gify").style.display = "block";
    chrome.tabs.executeScript(null, {

      file: "pasti.js"

    });

  });

  /*s("button").addEventListener("click", function(){

    performAjax();

  });*/

});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){

  //console.log(req.lol);
  s("gify").style.display = "none";
  var data = req.data;
  var puntuacion = 0;
  if(data["author"] != null){

    puntuacion += 5;
    s("p_autor").innerHTML = data["author"];

  }

  if(data["date_published"] != null){

    puntuacion += 5;
    s("p_fecha").innerHTML = data["date_published"];

  }

  s("p_dominio").innerHTML = "El dominio es propiedad de una entidad gubernamental";

  if(data["domain"]){

    puntuacion += 5;


  }

  if(data["adje"] == undefined){

    s("p_adj").innerHTML = "No se tienen las suficientes palabras para obtener porcentaje de adjetivación";

  }else{

    s("p_adj").innerHTML = data["adje"];

  }


  if(data["adje"]<10){

    puntuacion += 5;


  }

  console.log(data);
  if(data["contacto"]["conocido"] || data["contacto"]["red"].length>0){

    if(data["contacto"]["conocido"] && data["contacto"]["red"].length>0){

      puntuacion += 5;

    }else{

      puntuacion += 3;

    }

    if(data["contacto"]["conocido"]){

      s("p_contacto").innerHTML += "El sitio es conocido <br>";

    }

    if(data["contacto"]["red"].length>0){

      s("p_contacto").innerHTML += "Tiene las siguientes redes sociales: <br>";

      for(var i = 0; i<data["contacto"]["red"].length; i++){

        s("p_contacto").innerHTML += data["contacto"]["red"][i] + "<br>";

      }

    }

  }

  if(data["ints"].length>0){

    puntuacion += 5;

    for(var i = 0; i<data["ints"].length; i++){

      s("p_ints").innerHTML += data["ints"][i];

    }

  }

  s("p_punt").innerHTML = puntuacion;

});
