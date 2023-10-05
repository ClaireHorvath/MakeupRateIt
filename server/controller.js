const makeupItems = require('./db.json')
let globalID = 11;

module.exports = {
    getMakeupItems: (req, res) => {
        res.status(200).send(makeupItems)
    }, 
    createMakeupItem: (req, res) => {
        const {title, rating, imageURL} = req.body;
        let newMakeupItem = {
            title: title,
            rating: +rating,
            imageURL,
            id: globalID
        }
        makeupItems.push(newMakeupItem)
        globalID++
        res.status(200).send(makeupItems)
    },
    deleteMakeupItem: (req, res) => {
        const {id} = req.params;
        let index = makeupItems.findIndex((elem) => elem.id === +id)
        makeupItems.splice(index, 1)
        res.status(200).send(makeupItems)
    },
    updateMakeupItem: (req, res) => {
        const {type} = req.body;
        let index = makeupItems.findIndex((elem) => elem.id === +req.params.id)
        if(type === 'minus' && makeupItems[index].rating > 1){
            makeupItems[index].rating -= 1;
            res.status(200).send(makeupItems)
        } else if (type === 'plus' && makeupItems[index].rating < 5){
            makeupItems[index].rating += 1;
            res.status(200).send(makeupItems)
        } else {
            res.status(400).send('Invalid star rating!')
        }
    }
}
