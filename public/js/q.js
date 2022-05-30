jQuery(function ($) {
  // footer slider script

  var slideIndex = 0
  showSlides()

  function showSlides() {
    var i
    var slides = document.getElementsByClassName('mySlides')
    var dots = document.getElementsByClassName('dot')
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none'
    }
    slideIndex++
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '')
    }
    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex - 1].className += ' active'
    setTimeout(showSlides, 2000) // Change image every 2 seconds
  }

  // change inner html of home on button click
  document
    .getElementById('newSurveyButton')
    .addEventListener('click', function () {
      //...... get user location when the button is clicked.......!!!!!

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error, options)
      } else {
        x.innerHTML = 'Geolocation is not supported by this browser.'
      }

      function showPosition(position) {
        var a = position.coords.latitude
        var b = position.coords.longitude
        var c = '' + a + ', ' + b

        console.log(c)

        document.getElementById('changes').innerHTML =
          '<div id="surveyElement" style="display:inline-block;width:100%;"></div><div id="surveyResult" style="display: hidden;"></div>'

        // wait for the dom to load then run the below script

        setTimeout(function () {
          Survey.StylesManager.applyTheme('modern')

          var myCss = {
            matrix: {
              root: 'table table-striped',
            },
            question: {
              contentLeft: 'content-right',
            },
            navigationButton: 'black',
            body: 'font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; ',
          }

          var projectCode = sessionStorage.getItem('code')

          var docRef = firestore
            .collection('Surveys')
            .where('surveyCode', '==', projectCode)

          docRef
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var x = doc.data().survey
                var jsondata = JSON.parse(x)

                var json = jsondata

                window.survey = new Survey.Model(json)

                survey.onComplete.add(function (result) {
                  var resultData = survey.data
                  var questions = survey.getAllQuestions()
                  for (var i = 0; i < questions.length; i++) {
                    var q = questions[i]
                    var key = q.getValueName()
                    //do nothing if question is answered
                    if (resultData[key]) continue
                    //optionaly ignore invisible questions
                    if (!q.isVisible) continue
                    //set null for unanswered questions
                    resultData[key] = null
                  }
                  document.querySelector('#surveyResult').textContent =
                    'Result JSON:\n' + JSON.stringify(resultData, null, 3)

                  // uploading form data to database on complete

                  auth.onAuthStateChanged((user) => {
                    if (user) {
                      var time = new Date()
                      var docRef = firestore.collection(projectCode).doc()

                      // trial to add adition data to our result

                      var myJsonObject = resultData //change to obj
                      function propAndValAdder() {
                        for (var i = 0; i < arguments.length; i += 2) {
                          myJsonObject[arguments[i]] = arguments[i + 1]
                        }
                      }

                      propAndValAdder(
                        'Location',
                        c,
                        'Interviewer',
                        user.email,
                        'Time',
                        time
                      )

                      data = JSON.stringify(myJsonObject)

                      console.log(data)

                      var surveyLocalData = data
                      var surveyHistory =
                        JSON.parse(localStorage.getItem('backupData')) || []
                      surveyHistory.push(surveyLocalData)
                      localStorage.setItem(
                        'backupData',
                        JSON.stringify(surveyHistory)
                      )

                      // define the form data from user

                      // const data = JSON.stringify(result.data, null, 3);

                      docRef
                        .set({
                          date: firebase.firestore.FieldValue.serverTimestamp(),
                          interviewer: user.email,
                          location: new firebase.firestore.GeoPoint(a, b),
                          surveyData: data,
                        })
                        .then(function () {
                          Materialize.toast('form saved succsesfully', 6000) // 4000 is the duration of the toast
                          // window.location.reload();
                          console.log('Status saved: ', doc.id)
                          window.localStorage.clear(storageName)
                          document.location.href = '../pages/questionnair.html'
                        })
                        .catch(function (error) {
                          console.log('Got an error: ', error)
                        })
                    }
                  })
                })

                var storageName = projectCode
                function saveSurveyData(survey) {
                  var data = survey.data
                  data.pageNo = survey.currentPageNo
                  window.localStorage.setItem(storageName, JSON.stringify(data))
                }
                survey.onPartialSend.add(function (survey) {
                  saveSurveyData(survey)
                })
                survey.onComplete.add(function (survey, options) {
                  saveSurveyData(survey)
                })
                survey.sendResultOnPageNext = true
                var prevData = window.localStorage.getItem(storageName) || null
                if (prevData) {
                  var data = JSON.parse(prevData)
                  survey.data = data
                  if (data.pageNo) {
                    survey.currentPageNo = data.pageNo
                  }
                }

                firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    let objectName
                    survey.onUploadFiles.add((survey, options) => {
                      let myfile
                      const formData = new FormData()
                      options.files.forEach(function (file) {
                        formData.append(file.name, file)
                        console.log(file)
                        myfile = file
                      })

                      const ref = firebase.storage().ref()
                      const name = +new Date() + '-' + myfile.name
                      objectName = name
                      const metadata = {
                        contentType: myfile.type,
                      }
                      const task = ref.child(name).put(myfile, metadata)
                      task
                        .then((snapshot) => snapshot.ref.getDownloadURL())
                        .then((url) => {
                          console.log(url)
                          options.callback(
                            'success',
                            options.files.map((file) => {
                              return {
                                file: file,
                                content: url,
                              }
                            })
                          )
                        })
                        .catch(console.error)
                    })
                    survey.onDownloadFile.add(function (survey, options) {
                      const refrence = firebase.storage().ref()
                      const ref = refrence.child(objectName)

                      ref
                        .getDownloadURL()
                        .then(function (url) {
                          options.callback('success', url)
                        })
                        .catch(function (error) {
                          console.error(error)
                        })
                    })
                  }
                })

                survey.showPreviewBeforeComplete = 'showAnsweredQuestions'

                $('#surveyElement').Survey({
                  model: survey,
                  css: myCss,
                })

                console.log('Document data:', doc.data())
              })
            })
            .catch(function (error) {
              console.log('Error getting documents: ', error)
              Materialize.toast('Error getting documents: ', error, 4000)
            })
        }, 0)
      }
    })
})
