/*
File: translator.js 

Author: Ahmad Gaber

Class: CSC 337

Purpose: making a server that translates between English, German, and Spanish
*/

// express server
const express = require("express");
// file system delaration
const fs = require("fs");
// host name
const hostname = "127.0.0.1";
// port number
const port = 5000;
const app = express();

// Create four Map objects as dictionaries
const eng_to_ger_dictionary = new Map();
const eng_to_spa_dictionary = new Map();
const ger_to_eng_dictionary = new Map();
const spa_to_eng_dictionary = new Map();

// call the build_dictionary function to read the files and build the dictionary one by one
build_dictionary("./German.txt", "g");
build_dictionary("./Spanish.txt", "s");

// the build_dictionary function to read the files and build the dictionary one by one
function build_dictionary(fname, foreign_lang) {
  data = fs.readFileSync(fname, "utf8");
  // declare and initialize variables
  var eng_word = "";
  var foreign_word = "";
  var lines_arr = [];
  // AARAY "lang_arr" will contains one line only from the file, row number zero will contain the english word,
  var lang_arr = [];
  
  // spliting the "data" in the "lines_arr"
  lines_arr = data.split("\n");
  
  // loop in the array "lines_arr" line by line
  for (var idx = 0; idx < lines_arr.length; idx++) {
    // line should not start with "#", and length must be greater than 0
    if (!lines_arr[idx].startsWith("#") && lines_arr[idx].length > 0) {
      // spliting the english word from the german translation by "TAB"
      lang_arr = lines_arr[idx].split("\t");
      // english word is the first row
      eng_word = lang_arr[0];
  
      // get the exact position of the non-alphabetic and non-space character
      var unalpha_unspace_position = lang_arr[1].search(/[^a-zA-ZäöüÄÖÜß\s]/i)
      // if there is no non-alphabetic and non-space character, take the whole row as german translation
      if (unalpha_unspace_position == -1) {
        foreign_word = lang_arr[1];
      }
      // otherwise take from the start till the location of the non-alphabetic and non-space character only
      else {
        foreign_word = lang_arr[1].substr(0, unalpha_unspace_position);
      }
  
      // remove any spaces before or after the words
      foreign_word = foreign_word.trim().toLowerCase();
      eng_word = eng_word.trim().toLowerCase();
  
      if (eng_word.length > 0 && foreign_word.length > 0) {
      // insert one row in each dictionary
        if (foreign_lang === 'g') {
          eng_to_ger_dictionary.set(eng_word, foreign_word);
          ger_to_eng_dictionary.set(foreign_word, eng_word);
        }
        else {
          eng_to_spa_dictionary.set(eng_word, foreign_word);
          spa_to_eng_dictionary.set(foreign_word, eng_word);

        }
      }
    }
  }
 }

// if url have the "translate" word, route to execute the below function
app.get("/translate/:type/:input_words", function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  var type = req.params.type;

  // get the input words that need to be translated
  var input_words = req.params.input_words.toLowerCase();

  // split the input words in an array by "+"
  var input_words_arr = input_words.split("+");

  // declare and initialize the varianle that will contain the translation
  var translated_words = "";

  if (type.localeCompare("e2g") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = eng_to_ger_dictionary.get(input_words_arr[idx]);
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }
  else if (type.localeCompare("e2s") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = eng_to_spa_dictionary.get(input_words_arr[idx]);
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }
  else if (type.localeCompare("g2e") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = ger_to_eng_dictionary.get(input_words_arr[idx]);
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }
  else if (type.localeCompare("g2s") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = eng_to_spa_dictionary.get(
        ger_to_eng_dictionary.get(input_words_arr[idx])
      );
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }
  else if (type.localeCompare("s2e") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = spa_to_eng_dictionary.get(input_words_arr[idx]);
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }
  else if (type.localeCompare("s2g") == 0) {
    // loop in the input words array word by word
    for (var idx = 0; idx < input_words_arr.length; idx++) {
      // get the translated words from the dictionary and store it in the "translated_words" variable
      var translatedWord = eng_to_ger_dictionary.get(
        spa_to_eng_dictionary.get(input_words_arr[idx])
      );
      if (typeof translatedWord == "undefined") translatedWord = "?";

      translated_words = translated_words + " " + translatedWord;
    }
  }

  // write the translation and end the response
  htmlText =
    '<html><body><h1 style="font-size: 100px;">' +
    translated_words.trim() +
    "</h1></body></html>";
  res.end(htmlText);
});

// route to the static html in case of root
app.use(express.static("public_html"));
app.get("/", function (req, res) {
  res.sendFile("./public_html/index.html");
});

// route to the root in case of any other url not in (translate or root)
app.get('*', function(req, res) {
  res.redirect('/');
});

// start the listner
app.listen(port, () =>
  console.log("Server running at http://" + hostname + ":" + port + "/")
);
