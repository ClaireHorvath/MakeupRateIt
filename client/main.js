const makeupItemsContainer = document.querySelector('#makeup-items-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/makeupitems`

const makeupItemsCallback = ({ data: makeupItems }) => displayMakeupItems(makeupItems)
const errCallback = err => console.log(err.response.data)

const getAllMakeupItems = () => axios.get(baseURL).then(makeupItemsCallback).catch(errCallback)
const createMakeupItem = body => axios.post(baseURL, body).then(makeupItemsCallback).catch(errCallback)
const deleteMakeupItem = id => axios.delete(`${baseURL}/${id}`).then(makeupItemsCallback).catch(errCallback)
const updateMakeupItem = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(makeupItemsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createMakeupItem(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createMakeupItemCard(makeupItem) {
    const makeupItemCard = document.createElement('div')
    makeupItemCard.classList.add('makeup-item-card')

    makeupItemCard.innerHTML = `<img alt='makeup item image' src=${makeupItem.imageURL} class="makeup-item-image"/>
    <p class="makeup-item-name">${makeupItem.title}</p>
    <div class="btns-container">
        <button onclick="updateMakeupItem(${makeupItem.id}, 'minus')">-</button>
        <p class="makeup-item-rating">${makeupItem.rating} stars</p>
        <button onclick="updateMakeupItem(${makeupItem.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteMakeupItem(${makeupItem.id})">delete</button>
    `


    makeupItemsContainer.appendChild(makeupItemCard)
}

function displayMakeupItems(arr) {
    makeupItemsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMakeupItemCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMakeupItems()
