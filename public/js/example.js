// save user data  
auth.onAuthStateChanged(user => {
    if (user) {
    // User is signed in. uid is now available to use
    var uid = user.uid;

   const docRef = firestore.collection("responces").doc();
   ;
  // define the field 

  const guinessQuantity         = document.querySelector("#guinessQuantity");
  const tuskerQuantity          = document.querySelector("#tuskerQuantity");
  const pic                     = document.querySelector("#pic");
  const savebutton              = document.querySelector("#saveButton");
  const uploader                = document.getElementById('uploader');
  const fileButton              = document.getElementById('fileButton');
  const items                   = document.getElementsByName("beerType");
  const howOftenTuskerStock     = document.getElementsByName("tusker");
  const howOftenGuinessStock    = document.getElementsByName("Guinness");
  const howOftenwhitecapStock   = document.getElementsByName("whitecap");
  const howOftenSummitStock     = document.getElementsByName("summit");
  const howOftenTuskerMaltStock = document.getElementsByName("tusker_malt");

  saveButton.addEventListener("click", function(){
        
      const stock           = document.querySelector('input[name=stock]:checked').value;
      const textTosave      = guinessQuantity.value;
      const doc             = tuskerQuantity.value;
      const socialClass     = document.getElementById("Sclass").textContent;
      const beer            = Array.prototype.slice.call(items).filter(ch => ch.checked==true).map(ch => ch.value);
      const tuskerValue     = Array.prototype.slice.call(howOftenTuskerStock).filter(ch => ch.checked==true).map(ch =>ch.value);
      const guinessValue    = Array.prototype.slice.call(howOftenGuinessStock).filter(ch => ch.checked==true).map(ch =>ch.value);
      const whitecapValue   = Array.prototype.slice.call(howOftenwhitecapStock).filter(ch => ch.checked==true).map(ch =>ch.value);
      const summitValue     = Array.prototype.slice.call(howOftenSummitStock).filter(ch => ch.checked==true).map(ch =>ch.value);
      const tuskerMaltValue = Array.prototype.slice.call(howOftenTuskerMaltStock).filter(ch => ch.checked==true).map(ch =>ch.value);

      console.log("I am going to save " + stock + " to firestore");
      console.log("I am going to save " + textTosave + " to firestore");
      console.log("I am going to save " + doc + " to firestore");
      console.log("I am going to save " + tuskerValue + "to firestore");
      console.log("I am going to save " + beer + " to firestore");
      console.log("I am going to save " + guinessValue + " to firestore");
      console.log("I am going to save " + whitecapValue + " to firestore");
      console.log("I am going to save " + summitValue + " to firestore");
      console.log("I am going to save " + tuskerMaltValue + " to firestore");
      console.log("I am going to save " + socialClass + " to firestore");

      docRef.set({
        
        date: firebase.firestore.FieldValue.serverTimestamp(),
        interviewer: user.email,
        if_beer_is_stocked: stock,
        type_of_beer_stocked: beer,
        no_of_guiness: textTosave,
        no_of_tusker: doc,
        freq_of_tusker_lager: tuskerValue,
        freq_of_guiness:guinessValue,
        freq_of_whitecap:whitecapValue,
        freq_of_summit:summitValue,
        freq_of_tusker_malt:tuskerMaltValue,
        social_class_id: socialClass
      

      }).then(function(){
          Materialize.toast("form saved succsesfully", 6000);// 4000 is the duration of the toast
          // window.location.reload();
        console.log("Status saved");
      }).catch(function(error){
          console.log("Got an error: ",error);
      });
    })


    }
    });
  
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

//html5 api

function getLocation(){
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
        log("Getting respondent location");
        navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
      } else {
        log("Your device does not support the Geolocation API, contact Admin.")
      }
    };

  /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");
/* 
    var username = "wesley";
    geoFireInstance.set(username, [latitude, longitude]).then(function() {
      log("Current user " + username + "'s location has been added to GeoFire");
     
    }).catch(function(error) {
      log("Error adding user " + username + "'s location to GeoFire");
    });  */
  }

/* Handles any errors from trying to get the user's current location */
var errorHandler = function(error) {
    if (error.code == 1) {
      log("Error: PERMISSION_DENIED: User denied access to their location");
    } else if (error.code === 2) {
      log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
    } else if (error.code === 3) {
      log("Error: TIMEOUT: Calculating the user's location too took long");
    } else {
      log("Unexpected error code")
    }
  };
 

   /*************/
   /*  HELPERS  */
   /*************/
   /* Logs to the page instead of the console */
   function log(message) {
     var childDiv = document.createElement("div");
     var textNode = document.createTextNode(message);
     childDiv.appendChild(textNode);
     document.getElementById("log").appendChild(childDiv);
   }

   document.querySelector('#find-me').addEventListener('click', getLocation);

