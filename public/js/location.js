fileButton.addEventListener('change', function(e){
    //get file
    var file = e.target.files[0];

    //create a storage ref
    var storageRef = firebase.storage().ref('store/' + file.name);

    //upload file
    var task = storageRef.put(file);

    //update progress bar
    task.on('state_changed',

        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage

        },
        function error(err){

        },
        function complete(){

        }
    
    );
});

// call onload or in script segment below form
function attachCheckboxHandlers() {
// get reference to element containing toppings checkboxes
var el = document.getElementById('toppings');

// get reference to input elements in toppings container element
var tops = el.getElementsByTagName('input');

// assign updateTotal function to onclick property of each checkbox
for (var i=0, len=tops.length; i<len; i++) {
    if ( tops[i].type === 'checkbox' ) {
        tops[i].onclick = updateTotal;
    }
}
}

// called onclick of Social class checkboxes
function updateTotal(e) {
// 'this' is reference to checkbox clicked on
var form = this.form;

// get current value in total text box, using parseFloat since it is a string
var val = parseFloat( form.elements['total'].value );

// if check box is checked, add its value to val, otherwise subtract it
if ( this.checked ) {
    val += parseFloat(this.value);
} else {
    val -= parseFloat(this.value);
}

// format val with correct number of decimal places
// and use it to update value of total text box
form.elements['total'].value = formatDecimal(val);
}

// format val to n number of decimal places
// modified version of Danny Goodman's (JS Bible)
function formatDecimal(val, n) {
n = n || 2;
var str = "" + Math.round ( parseFloat(val) * Math.pow(10, n) );
while (str.length <= n) {
    str = "0" + str;
}
var pt = str.length - n;
return str.slice(0,pt) + "." + str.slice(pt);
}

// in script segment below form
attachCheckboxHandlers();

function calculate(){
var x =  document.getElementById("total").value;
var text;
if (x>350) {
    text = "AB";
}else if (x <= 350 && x >= 300) {
    
    text = "C1";
}else if (x< 300 && x >= 200) {
    
    text = "C2";
}else if (x < 200 && x >= 100) {
    
    text = "D";

}else  {
    
    text = "E";
}
document.getElementById("Sclass").innerHTML = text;
}
$(document).ready(function(){
$('.check').click(function() {
    $('.check').not(this).prop('checked', false);
});
});
$(document).ready(function(){
$('.check1').click(function() {
    $('.check1').not(this).prop('checked', false);
});
});

$(document).ready(function(){
$('.check2').click(function() {
    $('.check2').not(this).prop('checked', false);
});
});

$(document).ready(function(){
$('.check3').click(function() {
    $('.check3').not(this).prop('checked', false);
});
});
$(document).ready(function(){
$('.check4').click(function() {
    $('.check4').not(this).prop('checked', false);
});
});
