// const { response, request } = require('express');
const express = require('express')
// import http from 'http';
const app = express()
const logger = require('./middleware/logger')
const cors = require('cors')

app.use(cors) // Allow other origins
app.use(express.json())
app.use(logger)

let classes = [
  {
    Id: 1,
    ClassName: 'Shushi go BASICO',
    MaxStudents: 10,
    StartDate: '01/09/2021T09:00:00.000Z',
    EndDate: '01/09/2021T11:00:00.000Z',
    TeacherId: 1
  },
  {
    Id: 2,
    ClassName: 'Shushi go MEDIO',
    MaxStudents: 7,
    StartDate: '05/09/2021T09:00:00.000Z',
    EndDate: '05/09/2021T11:00:00.000Z',
    TeacherId: 1
  },
  {
    Id: 3,
    ClassName: 'Shushi go AVANZADOoooo',
    MaxStudents: 12,
    StartDate: '06/09/2021T09:00:00.000Z',
    EndDate: '06/09/2021T11:00:00.000Z',
    TeacherId: 1
  }
]

const teachers = [

  {
    Id: 1,
    Name: 'Lorenzo'
  }
]

app.get('/api/classes', (request, response) => {
  response.json(classes)
})

app.get('/api/teachers', (request, response) => {
  response.json(teachers)
})

app.get('/api/classes/:id', (request, response) => {
  const id = Number(request.params.id)
  const classBuscada = classes.find(cl => cl.Id === id)
  if (classBuscada) {
    response.json(classBuscada)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/classes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  classes = classes.filter(cl => cl.Id !== id)
  response.status(204).end()
})

app.post('/api/classes', (request, response) => {
  const classFromBody = request.body

  if (!classFromBody || !classFromBody.ClassName) {
    return response.status(400).json({
      error: 'Request data not correct.'
    })
  }

  const ids = classes.map(cl => cl.Id)
  const id = Math.max(...ids)

  console.log(id)

  const newClass = {
    Id: id + 1,
    ClassName: classFromBody.ClassName,
    MaxStudents: classFromBody.MaxStudents,
    StartDate: classFromBody.StartDate,
    EndDate: classFromBody.EndDate,
    TeacherId: classFromBody.TeacherId
  }

  classes = [...classes, newClass]

  response.status(201).json(newClass)
})

app.use((request, response) => {
  response.status(404).json({ error: 'Resource not found' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
