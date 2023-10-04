const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getMakeupItems, createMakeupItem, deleteMakeupItem, updateMakeupItem} = require('./controller')

app.get('/api/makeupitems', getMakeupItems)
app.post('/api/makeupitems', createMakeupItem)
app.delete('/api/makeupitems/:id', deleteMakeupItem)
app.put('/api/makeupitems/:id', updateMakeupItem)


app.listen(4004, () => console.log('Rockin and rollin on port 4004'))
