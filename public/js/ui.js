// save user data
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in. uid is now available to use
    var uid = user.uid

    // Create a GeoFirestore reference
    const geofirestore = new GeoFirestore(firestore)

    // Create a GeoCollection reference
    const geocollection = geofirestore.collection('responses')

    // define the field

    const guinessQuantity = document.querySelector('#guinessQuantity')
    const tuskerQuantity = document.querySelector('#tuskerQuantity')
    const pic = document.querySelector('#pic')
    const savebutton = document.querySelector('#saveButton')
    const uploader = document.getElementById('uploader')
    const fileButton = document.getElementById('fileButton')
    const items = document.getElementsByName('beerType')
    const howOftenTuskerStock = document.getElementsByName('tusker')
    const howOftenGuinessStock = document.getElementsByName('Guinness')
    const howOftenwhitecapStock = document.getElementsByName('whitecap')
    const howOftenSummitStock = document.getElementsByName('summit')
    const howOftenTuskerMaltStock = document.getElementsByName('tusker_malt')

    //html5 api

    function getLocation() {
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.geolocation !== 'undefined'
      ) {
        log('Getting respondent location')
        navigator.geolocation.getCurrentPosition(
          geolocationCallback,
          errorHandler
        )
      } else {
        log('Your device does not support the Geolocation API, contact Admin.')
      }
    }

    /* Callback method from the geolocation API which receives the current user's location */
    var geolocationCallback = function (location) {
      var latitude = location.coords.latitude
      var longitude = location.coords.longitude
      log("Retrieved user's location: [" + latitude + ', ' + longitude + ']')
      /* 
                var username = "wesley";
                geoFireInstance.set(username, [latitude, longitude]).then(function() {
                log("Current user " + username + "'s location has been added to GeoFire");
                
                }).catch(function(error) {
                log("Error adding user " + username + "'s location to GeoFire");
                });  */

      saveButton.addEventListener('click', function () {
        const stock = document.querySelector('input[name=stock]:checked').value
        const textTosave = guinessQuantity.value
        const doc = tuskerQuantity.value
        const socialClass = document.getElementById('Sclass').textContent
        const beer = Array.prototype.slice
          .call(items)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)
        const tuskerValue = Array.prototype.slice
          .call(howOftenTuskerStock)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)
        const guinessValue = Array.prototype.slice
          .call(howOftenGuinessStock)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)
        const whitecapValue = Array.prototype.slice
          .call(howOftenwhitecapStock)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)
        const summitValue = Array.prototype.slice
          .call(howOftenSummitStock)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)
        const tuskerMaltValue = Array.prototype.slice
          .call(howOftenTuskerMaltStock)
          .filter((ch) => ch.checked == true)
          .map((ch) => ch.value)

        console.log('I am going to save ' + stock + ' to firestore')
        console.log('I am going to save ' + textTosave + ' to firestore')
        console.log('I am going to save ' + doc + ' to firestore')
        console.log('I am going to save ' + tuskerValue + 'to firestore')
        console.log('I am going to save ' + beer + ' to firestore')
        console.log('I am going to save ' + guinessValue + ' to firestore')
        console.log('I am going to save ' + whitecapValue + ' to firestore')
        console.log('I am going to save ' + summitValue + ' to firestore')
        console.log('I am going to save ' + tuskerMaltValue + ' to firestore')
        console.log('I am going to save ' + socialClass + ' to firestore')

        // Add a GeoDocument to a GeoCollection
        geocollection
          .add({
            name: 'Geofirestore',
            score: 100,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            interviewer: user.email,
            if_beer_is_stocked: stock,
            type_of_beer_stocked: beer,
            no_of_guiness: textTosave,
            no_of_tusker: doc,
            freq_of_tusker_lager: tuskerValue,
            freq_of_guiness: guinessValue,
            freq_of_whitecap: whitecapValue,
            freq_of_summit: summitValue,
            freq_of_tusker_malt: tuskerMaltValue,
            social_class_id: socialClass,
            // The coordinates field must be a GeoPoint!
            coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
          })
          .then(function () {
            Materialize.toast('form saved succsesfully', 6000) // 4000 is the duration of the toast
            window.location.reload()
            console.log('Status saved')
          })
          .catch(function (error) {
            console.log('Got an error: ', error)
          })
      })
    }

    /* Handles any errors from trying to get the user's current location */
    var errorHandler = function (error) {
      if (error.code == 1) {
        log('Error: PERMISSION_DENIED: User denied access to their location')
      } else if (error.code === 2) {
        log(
          'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached'
        )
      } else if (error.code === 3) {
        log("Error: TIMEOUT: Calculating the user's location too took long")
      } else {
        log('Unexpected error code')
      }
    }

    /*************/
    /*  HELPERS  */
    /*************/
    /* Logs to the page instead of the console */
    function log(message) {
      var childDiv = document.createElement('div')
      var textNode = document.createTextNode(message)
      childDiv.appendChild(textNode)
      document.getElementById('log').appendChild(childDiv)
    }

    document.querySelector('#find-me').addEventListener('click', getLocation)
  }
})

// my stuff

survey.onUploadFiles.add(function (survey, options) {
  let myfile
  options.files.forEach(function (file) {
    const formData = new FormData()
    formData.append(file.name, file)
    console.log(file)
    myfile = file
  })

  const filePath = 'Test/' + this._auth.UserId + '/' + myfile.name
  const fileRef = this.storage.ref(filePath)
  this.task = this.storage.upload(filePath, myfile)
  this.task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()

        this.downloadURL.subscribe(
          (r) => {
            console.log('fonction valeur' + r)
            this.dl = r
          },
          (error) => console.log(error),
          () => {
            console.log('Completed')
            options.callback(
              'success',
              options.files.map((file) => {
                return { file: file, content: this.dl }
              })
            )
          }
        )
      })
    )
    .subscribe(() => console.log('Completed insert'))
})
