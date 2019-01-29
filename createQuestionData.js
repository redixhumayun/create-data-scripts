const Chance = require('chance')
const chance = new Chance()

const questionStatuses = ['pending', 'assigned']
const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]

const createQuestionData = ({ noOfQuestionsToCreate, uidCollectionOfMentors }) => {
  return new Array(noOfQuestionsToCreate).fill().map(() => {
    let subjectIndex = randomIntFromInterval(0, 2)
    return {
      "uid": chance.guid(),
      "created": chance.date(),
      "status": chance.pickone(questionStatuses),
      "subject": subjects[subjectIndex],
      "topic": chance.pickone(topics[subjectIndex]),
      "title": chance.string(),
      "favoriteMentors": new Array(chance.integer({ min: 1, max: 10 })).fill().map(() => {
        return chance.pickone(uidCollectionOfMentors)
      })
    }
  })
}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.createQuestionData = createQuestionData