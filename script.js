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

  for(var name in req.data){

    s("found").innerHTML += " " + name + ": " + req.data[name] + "<br>";

  }

});
