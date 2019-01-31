const Chance = require('chance')
const chance = new Chance()

const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]

const createMentorData = ({ noOfMentorsToCreate, mentorUidCollection }) => {
  let mentorUidCollectionCopy = [...mentorUidCollection]
  return new Array(noOfMentorsToCreate).fill().map(() => {
    return {
      "uid": mentorUidCollectionCopy.pop(),
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
      "avgRating": chance.pickone([1, 2, 3, 4, 5]),
      "totalQuestionsAnswered": 0,
      "totalRating": 0
    }
  })
}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.createMentorData = createMentorData