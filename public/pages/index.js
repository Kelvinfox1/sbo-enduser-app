Survey.StylesManager.applyTheme('bootstrap')

var docRef = firestore.collection('Surveys').doc('IdKAtVv81k83sK3zzRyB')

docRef
  .get()
  .then(function (doc) {
    if (doc.exists) {
      // get survey form and display to user

      var x = doc.data().survey
      var jsondata = JSON.parse(x)

      var json = jsondata

      window.survey = new Survey.Model(json)

      survey.onComplete.add(function (result) {
        document.querySelector('#surveyResult').textContent =
          'Result JSON:\n' + JSON.stringify(result.data, null, 3)
        console.log('wagwan', result.data)
      })

      $('#surveyElement').Survey({
        model: survey,
      })

      console.log('Document data:', doc.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  })
  .catch(function (error) {
    console.log('Error getting document:', error)
  })
