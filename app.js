(function() {
  var soundBindings = [
    { charCode: 49,   sampleID: '1',          name: 'One',        highlightChar: '1'},
    { charCode: 50,   sampleID: '2',          name: 'Two',        highlightChar: '2'},
    { charCode: 51,   sampleID: '3',          name: 'Three',      highlightChar: '3'},
    { charCode: 52,   sampleID: '4',          name: 'Four',       highlightChar: '4'},
    { charCode: 119,  sampleID: 'what',       name: 'WHAT',       highlightChar: 'W'},
    { charCode: 116,  sampleID: 'tiger',      name: 'Tiger',      highlightChar: 'T'},
    { charCode: 121,  sampleID: 'yeah',       name: 'yeah',       highlightChar: 'Y'},
    { charCode: 117,  sampleID: 'yeah2',      name: 'YEAUHEEH!',  highlightChar: 'U'},
    { charCode: 105,  sampleID: 'sonicboom',  name: 'Sonic boom', highlightChar: 'I'},
    { charCode: 111,  sampleID: 'okay',       name: 'OKAUY',      highlightChar: 'O'},
    { charCode: 97,   sampleID: 'aah',        name: 'Aah',        highlightChar: 'A'},
    { charCode: 115,  sampleID: 'snare',      name: 'snare',      highlightChar: 'S'},
    { charCode: 104,  sampleID: 'hadouken',   name: 'Hadouken',   highlightChar: 'H'},
    { charCode: 106,  sampleID: 'hihat',      name: 'hihat',      highlightChar: 'J'},
    { charCode: 107,  sampleID: 'kick',       name: 'kick',       highlightChar: 'K'},
    { charCode: 120,  sampleID: 'wildforthenight', name: 'wild for the night',  highlightChar: 'X'},
    { charCode: 99,  sampleID: 'fuckbeingpolite', name: 'fuck being polite',   highlightChar: 'C'},
    { charCode: 118,  sampleID: 'clap',       name: 'clap', highlightChar: 'V'},
    { charCode: 98,   sampleID: 'boi',        name: 'Boi',        highlightChar: 'B'},
    { charCode: 110,  sampleID: 'needle',     name: 'Needle',     highlightChar: 'N'}
  ];

  function renderSamples() {
    var container = document.getElementById('sampleContainer');

    _.each(soundBindings, function(soundBinding) {
      var card = document.createElement('div');
      var keyLabel = document.createElement('p');
      var sampleName = document.createElement('p');
      
      card.id = soundBinding.sampleID + '-container';
      card.className = 'col-xs-4 col-md-3 sample-card';
      keyLabel.className = 'sample-card-key-label'
      sampleName.className = 'sample-card-label'

      keyLabel.innerHTML = soundBinding.highlightChar;
      sampleName.innerHTML = soundBinding.name;

      card.appendChild(keyLabel);
      card.appendChild(sampleName);

      card.onclick = play.bind(null, soundBinding.sampleID);

      container.appendChild(card);
    });
  }

  function onKeyPress(event) {
    result = _.find(soundBindings, function(soundBinding) {
        return soundBinding.charCode == event.charCode;
    });

    if (result) {
      play(result.sampleID);
    }
  }

  function play(sampleID){
    var sample = document.getElementById(sampleID);

    sample.children[0].src = "sounds/" + sampleID + ".mp3";
    sample.children[1].src = "sounds/" + sampleID + ".ogg";
    sample.load();
    sample.play();
    buttonGoesBoom(sampleID + '-container');
  }

  document.addEventListener("DOMContentLoaded", function(event) { 
    renderSamples();
    document.addEventListener("keypress", onKeyPress);
  });

  var randomArray = [
    '#120116','#6B566E', '#390E41', '#472D4B'
  ];

  function buttonGoesBoom(sampleContainerID) {
    var container = document.getElementById(sampleContainerID);
    var id = window.setInterval(changecolors.bind(null, container), 25);
    window.setTimeout(function(){
        window.clearInterval(id);
        container.style.background = '#FFF';
    }, 150);
  }

  function changecolors(container) {
    var randomElement = _.sample(randomArray);

    container.style.background = randomElement;

  }
})();