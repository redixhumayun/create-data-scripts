const Chance = require('chance')
const chance = new Chance()

const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]

const createStudentData = ({ noOfStudentsToCreate, studentUidCollection }) => {
  let studentUidCollectionCopy = [...studentUidCollection]
  return new Array(noOfStudentsToCreate).fill().map(() => {
    return {
      "uid": studentUidCollectionCopy.pop(),
      "email": chance.email(),
      "name": chance.name(),
      "gems": chance.integer({ min: 0, max: 100 }),
      "levels": [{
        "level": "GCSE",
        "subjects": new Array(randomIntFromInterval(0, 3)).fill().map(() => {
          let subIndex = randomIntFromInterval(0, 2)
          let noOfTopics = randomIntFromInterval(1, 3)
          return {
            "name": subjects[subIndex],
            "topics": topics[subIndex].slice(0, noOfTopics)
          }
        })
      }, {
        "level": "A Level",
        "subjects": new Array(randomIntFromInterval(0, 3)).fill().map(() => {
          let subIndex = randomIntFromInterval(0, 2)
          let noOfTopics = randomIntFromInterval(1, 3)
          return {
            "name": subjects[subIndex],
            "topics": topics[subIndex].slice(0, noOfTopics)
          }
        })
      }]
    }
  })
}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.createStudentData = createStudentData