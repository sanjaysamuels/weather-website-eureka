console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

message1.textContent = 'Powered by Java'
 
// e stand for event 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)

    message1.textContent = "Loading..."
    message2.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = 'Error'
                message2.textContent = ''

            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})