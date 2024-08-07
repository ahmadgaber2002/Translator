/*
File: index.js 

Author: Ahmad Gaber

Class: CSC 337

Purpose: Manage the AJAX request and get the response and then 
change the response from html to text format to diplay the translation
*/

// function onChangeListener reads the html elements
// call the callAPI function to manage the AJAX request
// and get the response
function onChangeListener() {
  var fromWordsElm = document.getElementById("fromWords");
  var fromLangElm = document.getElementById("fromLang");
  var toLangElm = document.getElementById("toLang");

  fromWordsElm.value=fromWordsElm.value.toLowerCase();

  callAPI(fromLangElm.value, toLangElm.value, fromWordsElm.value);
}

// callAPI function to manage the AJAX request and get the response
// change the response from html to text format, copy the text response
// to the text area which display the translation
function callAPI(fromLang, toLang, words) {
  const xhttp = new XMLHttpRequest();

  var url = "http://3.145.14.164:5000/translate/" + fromLang + "2" + toLang + "/" + words.replaceAll(" ", "+");
  console.log("url is " + url);

  var toWordsElm = document.getElementById("toWords");
  toWordsElm.value = "";

  xhttp.open("GET", url, false);
  xhttp.send();

  var responseText = xhttp.responseText;

  console.log(responseText);

  var resposneHtmlElm = document.createElement("html");
  resposneHtmlElm.innerHTML = responseText;
  var translation = resposneHtmlElm.getElementsByTagName("h1")[0].innerHTML;

  toWordsElm.value = translation;
}

