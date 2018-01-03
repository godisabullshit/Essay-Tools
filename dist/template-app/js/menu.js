// YOU NEED TO REPLACE THE GOOGLE_APPLICATION_CREDENTIALS with your own

const remote = require('remote');

const toolDescriptions = {
  "sentiment-text": "<b>Sentiment analysis</b> inspects the given text and identifies the prevailing emotional opinion within the text, especially to determine a writer's attitude as positive, negative, or neutral.<br><br><b>score</b> of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and corresponds to the overall emotional leaning of the text.<br><br><b>magnitude</b> indicates the overall strength of emotion (both positive and negative) within the given text, between 0.0 and +inf",
  "entities-text": "<b>Entity analysis</b> inspects the given text for known entities (Proper nouns such as public figures, landmarks, and so on. Common nouns such as restaurant, stadium, and so on.) and returns information about those entities.<br><br><b>type</b> indicates the type of this entity (for example if the entity is a person, location, consumer good, etc.) This information helps distinguish and/or disambiguate entities, and can be used for writing patterns or extracting information<br><br><b>salience</b> indicates the importance or relevance of this entity to the entire document text. This score can assist information retrieval and summarization by prioritizing salient entities. Scores closer to 0.0 are less important, while scores closer to 1.0 are highly important.<br><br><b>URL</b>, if present, contains the Wikipedia URL pertaining to this entity.",
  "syntax-text": "<b>Syntactic analysis</b> extracts linguistic information, breaking up the given text into a series of sentences and tokens (generally, word boundaries), providing further analysis on those tokens.<br><br><b>tag</b> denotes the part of speech using a coarse-grained POS tag (NOUN, VERB, etc.), and provides top-level surface syntax information.<br><br><b>number</b> denotes a word's grammatical number indicating its count distinction.<br><br><b>person</b> denotes a word's grammatical person indicating a speaker's relationship to an event.<br><br><b>gender</b> denotes a noun's grammatical gender.<br><br><b>case</b> denotes a word's grammatical case and its relationship to its containing sentence.<br><br><b>tense</b> denotes a verb's grammatical tense, which indicates the verb's reference to a position in time. Note that <b>tense</b> is distinct from <b>aspect</b>, which also deals with a verb's relationship to time, but focuses on the characteristics of that time flow, rather than its position.<br><br><b>aspect</b> denotes a verb's grammatical aspect, its expression of time flow. Unlike <b>tense</b>, which focuses on a verb's position within time, <b>aspect</b> focuses on the characteristics of that time flow where it occurs.<br><br><b>mood</b> denotes a verb's grammatical mood, which indicates attitude about an underlying action.<br><br><b>voice</b> denotes a verb's grammatical voice, the relationship between an action and a subject and/or object.<br><br><b>reciprocity</b> denotes a word's (typically a pronoun's) reciprocity, indicating the pronoun refers to a noun phrase elsewhere within the sentence.<br><br><b>proper</b> denotes whether a noun is part of a proper name.<br><br><b>form</b> denotes additional morphological forms that don't neatly fit into the previous set of common forms.<br><br>",
  "classify-text": "<b>Content classification</b> analyzes text content and returns a content category for the content."
};

// After the document has loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select the analysis tool
  var analysisTool = 'sentiment-text';
  var navBar = document.getElementById('nav').children;
  var description = document.getElementById('description');
  
  // Initialy select the first tool
  description.innerHTML = toolDescriptions[analysisTool];

  for (var i = navBar.length - 1; i >= 1; i--) {
    navBar[i].onclick = function() {
      // Set the clicked navbar to it's active css class
      for (var j = navBar.length - 1; j >= 1; j--) {
        navBar[j].className = "nav-group-item";
      }
      this.className = "nav-group-item active";

      // Set the selected tool for the algorithm
      analysisTool = this.id;

      // Set the description area for selected tool
      description.innerHTML = toolDescriptions[analysisTool];
    };
  }

  // Submit and process the text
  var submitButton = document.getElementById('submit');
  var resultText = document.getElementById('result');
  submitButton.onclick = function() {
    var text = document.getElementById('text').value;
    const spawn = require('child_process').spawn;   // The power of Node.JS
    var env = Object.create( process.env );
    env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/../../Machine Learning Playground-0ba14ae6bf59.json`;
    var analyze = spawn('node', ['dist/template-app/js/analyze.js', analysisTool, text], { env: env });
    var output = "";

    analyze.stdout.on('data', function (data) {
      output += data; 
    });

    analyze.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    analyze.on('close', function (code) {
      console.log('Finished with code: ' + code);
      console.log(output);
      var jsonParsed = JSON.parse(output);

      switch(analysisTool)
      {
        case "sentiment-text":
          jsonParsed.sentences.forEach(sentence => {
            const fontSize = sentence.magnitude*10;
            resultText.innerHTML += 
              `<font class=\"tooltip\" title=\"Score: ${sentence.score*100}%<br>Magnitude : ${fontSize}\" size=${fontSize} color=\"hsl(${50+(sentence.score*50)}, 100%, 50%)\">`+
                sentence.sentence+
              "</font>";
          });
          break;
        
        case "entities-text":
          resultText.innerHTML = text;

          jsonParsed.entities.forEach(entity => {
            var output = `<font class=\"tooltip\" title=\"Type: ${entity.type}<br>Salience : ${entity.salience}${(entity.url == null) ? "" : `<br>URL: ${entity.url}`}\" size=\"${(entity.salience * 10)}\"><b>${entity.name}</b></font>`;
            resultText.innerHTML = resultText.innerHTML.replace(entity.name, output);
          });
          break;

        case "syntax-text":
          var text = "", types = "";
          jsonParsed.tokens.forEach(token => {
            var morphology = token.morphology;
            types = "";
            for (type in morphology) {
              if (morphology[type].indexOf("UNKNOWN") == -1) {
                types += type + ": " + morphology[type] + "<br>"; 
              }
            }
            text += `<font class=\"tooltip\" title=\"${types}\" color=\"${token.tag == "VERB" ? "green" : `${token.tag == "ADJ" ? "red" : "black"}`}\">${token.content} </font>`;
          });
          
          resultText.innerHTML = text;
          break;

        case "classify-text":
          var text = "";
          jsonParsed.categories.forEach(category => {
            text += "Category: " + category.name + "<br>Confidence: " + category.confidence + "<br><br>";
          });

          resultText.innerHTML = text;
          break;
      }

      // Setup the tooltip
      tippy('.tooltip');

      // Highlight the text when hovered
      var tooltips = document.getElementsByClassName('tooltip');
      for (var i = tooltips.length - 1; i >= 0; i--) {
        tooltips[i].onmouseover = function(e) {
          e = e || window.event;
          var target = e.target || e.srcElement;
          selectElementText(target);
        };
      }
    });
  }

  // Setup the clear button
  var clearButton = document.getElementById('clear');
  clearButton.onclick = function() {
    resultText.innerHTML = "";
  }
})

function selectElementText(el, win) {
    el.focus();
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};