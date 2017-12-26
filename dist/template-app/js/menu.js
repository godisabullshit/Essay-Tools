// YOU NEED TO REPLACE THE GOOGLE_APPLICATION_CREDENTIALS with your own

const remote = require('remote');

// Add the listener
document.addEventListener('DOMContentLoaded', function () {
  // Select the analysis tool
  var analysisTool = 'sentiment-text';
  var navBar = document.getElementById('nav').children;
  for (var i = navBar.length - 1; i >= 1; i--) {
    navBar[i].onclick = function() {
      for (var j = navBar.length - 1; j >= 1; j--) {
        navBar[j].className = "nav-group-item";
      }
      this.className = "nav-group-item active";
      analysisTool = this.id;
    };
  }

  // Submit and process the text
  var submitButton = document.getElementById('submit');
  var resultText = document.getElementById('result');
  submitButton.onclick = function() {
    var text = document.getElementById('text').value;
    const spawn = require('child_process').spawn;   // The power of Node.JS
    var env = Object.create( process.env );
    env.GOOGLE_APPLICATION_CREDENTIALS = '/home/myisaak/Documents/ElectronApp/Machine Learning Playground-0ba14ae6bf59.json';
    
    var analyze = spawn('node', ['dist/template-app/js/analyze.js', analysisTool, text], { env: env });

    analyze.stdout.on('data', function (data) {
      resultText.innerHTML += data+'\n';
    });

    analyze.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    analyze.on('close', function (code) {
      if (code == 0)
        resultText.innerHTML += '\nchild process complete.\n';
      else
        resultText.innerHTML += '\nchild process exited with code' + code + '\n';
    });
  };

  // Setup the clear button
  var clearButton = document.getElementById('clear');
  clearButton.onclick = function() {
    resultText.innerHTML = "";
  }
})