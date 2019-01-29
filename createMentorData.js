const Chance = require('chance')
const chance = new Chance()

const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]
const uidCollection = []

const createMentorData = ({ noOfMentorsToCreate }) => {
  return {
    mentors: new Array(noOfMentorsToCreate).fill().map(() => {
      let uid = chance.guid()
      uidCollection.push(uid)
    
      return {
        "uid": uid,
        "available": chance.bool(),
        "email": chance.email(),
        "gems": chance.integer({ min: 0, max: 100 }),
        "name": chance.name(),
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
        }],
        "questionAssigned": chance.bool(),
        "rating": chance.pickone([1, 2, 3, 4, 5])
      }
    }),
    uidCollection: uidCollection
  }
}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.createMentorData = createMentorData