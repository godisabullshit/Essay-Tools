// YOU NEED TO REPLACE THE GOOGLE_APPLICATION_CREDENTIALS with your own

const remote = require('remote');

const toolDescriptions = {
  "sentiment-text": "<b>Sentiment analysis</b> inspects the given text and identifies the prevailing emotional opinion within the text, especially to determine a writer's attitude as positive, negative, or neutral.<br><br><b>score</b> of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and corresponds to the overall emotional leaning of the text.<br><br><b>magnitude</b> indicates the overall strength of emotion (both positive and negative) within the given text, between 0.0 and +inf",
  "entities-text": "<b>Entity analysis</b> inspects the given text for known entities (Proper nouns such as public figures, landmarks, and so on. Common nouns such as restaurant, stadium, and so on.) and returns information about those entities.<br><br><b>type</b> indicates the type of this entity (for example if the entity is a person, location, consumer good, etc.) This information helps distinguish and/or disambiguate entities, and can be used for writing patterns or extracting information<br><br><b>salience</b> indicates the importance or relevance of this entity to the entire document text. This score can assist information retrieval and summarization by prioritizing salient entities. Scores closer to 0.0 are less important, while scores closer to 1.0 are highly important.<br><br><b>URL</b>, if present, contains the Wikipedia URL pertaining to this entity.",
  "syntax-text": "<b>Syntactic analysis</b> extracts linguistic information, breaking up the given text into a series of sentences and tokens (generally, word boundaries), providing further analysis on those tokens.<br><br><b>Under development.</b>",
  "classify-text": "<b>Content classification</b> analyzes text content and returns a content category for the content.<br><br><b>Under development.</b>"
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
    console.log()
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
          resultText.innerHTML = output;
          break;

        case "classify-text":
          resultText.innerHTML = output;
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