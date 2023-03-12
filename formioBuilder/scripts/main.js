var jsonElement = document.getElementById('json');
var formElement = document.getElementById('formio');
var subJSON = document.getElementById('subjson');
var builder = new Formio.FormBuilder(document.getElementById("formBuilder"), {
  display: 'form',
  components: [],
  settings: {
   
  }
}, {
  baseUrl: ''
});

var onForm = function(form) {
  form.on('change', function() {
    subJSON.innerHTML = '';
    subJSON.appendChild(document.createTextNode(JSON.stringify(form.submission, null, 4)));
  });
};

var onBuild = function(build) {
  jsonElement.innerHTML = '';
  formElement.innerHTML = '';
  console.log(build)
  console.log(builder);
  console.log(builder.instance)
  jsonElement.appendChild(document.createTextNode(JSON.stringify(builder.instance.schema, null, 4)));
  Formio.createForm(formElement, builder.instance.form).then(onForm);
};

var onReady = function() {
  var jsonElement = document.getElementById('json');
  var formElement = document.getElementById('formio');
  builder.instance.on('change', onBuild);
};

var setDisplay = function(display) {
  builder.setDisplay(display).then(onReady);
};

// Handle the form selection.
var formSelect = document.getElementById('form-select');
formSelect.addEventListener("change", function() {
  setDisplay(this.value);
});

builder.instance.ready.then(onReady);