console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    const location = search.value

    const url = "/weather?address=" + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                msgOne.textContent = data.error
            } else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })    
})