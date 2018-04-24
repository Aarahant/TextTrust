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

  s("p_dominio").innerHTML = data["domain"];
  if(data["domain"] == "gov"){

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

  s("p_punt").innerHTML = puntuacion;

});
