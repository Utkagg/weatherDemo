console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const searchAddress = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchAddress.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               messgaeOne.textContent=data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'The temperature is '+data.forecast.temperature+',and it feels like '+data.forecast.feelLike
            }
        })
    })

})

