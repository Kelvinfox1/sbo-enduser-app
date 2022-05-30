// Bind function to onclick event for checkbox
document.getElementById('dunhill_switch').onclick = function () {
  // access properties using this keyword
  if (this.checked) {
    // Returns true if checked
    document.getElementById('Q9').innerHTML = ''
  } else {
    // Returns false if not checked
  }
}
// Bind function to onclick event for checkbox
document.getElementById('dunhill_capsule').onclick = function () {
  // access properties using this keyword
  if (this.checked) {
    // Returns true if checked
    alert(this.value)
  } else {
    // Returns false if not checked
  }
}
// Bind function to onclick event for checkbox
document.getElementById('embassy').onclick = function () {
  // access properties using this keyword
  if (this.checked) {
    // Returns true if checked
    alert(this.value)
  } else {
    // Returns false if not checked
  }
}
// Bind function to onclick event for checkbox
document.getElementById('sportman').onclick = function () {
  // access properties using this keyword
  if (this.checked) {
    // Returns true if checked
    alert(this.value)
  } else {
    // Returns false if not checked
  }
}
jQuery(function ($) {
  var container = document.getElementById('fb-rendered-form')
  var formData =
    '<form-template><fields><field class="form-control" label="Full Name" name="text-input-1459436848806" type="text" subtype="text"></field><field class="form-control" label="Select" name="select-1459436851691" type="select"><option value="option-1">Option 1</option><option value="option-2">Option 2</option></field><field class="form-control" label="Your Message" name="textarea-1459436854560" type="textarea"></field></fields></form-template>'

  var formRenderOpts = {
    container,
    formData,
    dataType: 'xml',
  }

  $(container).formRender(formRenderOpts)
})

