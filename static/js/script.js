const sourceBtn = document.getElementById('source-btn')
const modifiedBtn = document.getElementById('modified-btn')
const textInput = document.getElementById('text')
const options = document.getElementById('options')

const result = document.getElementById('result')
const sourceText = document.getElementById('source-text')
const modifiedText = document.getElementById('modified-text')
const sourcePlace = document.getElementById('source-place')
const modifiedPlace = document.getElementById('modified-place')



sourceBtn.onclick = () => {
    console.log(textInput.value);
    fetch('/source', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({input: textInput.value})
    }).then(response => {
        return response.json()
    }).then(data => {
        sourceText.innerText = data.text
        result.style.display = 'block'
        modifiedPlace.style.display = 'none'
        sourcePlace.style.display = 'block'
    })
}

modifiedBtn.onclick = () => {
    fetch('/modified', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({input: textInput.value, option: options.value})
    }).then(response => {
        return response.json()
    }).then(data => {
        modifiedText.innerText = data.text
        result.style.display = 'block'
        sourcePlace.style.display = 'none'
        modifiedPlace.style.display = 'block'
    })
}