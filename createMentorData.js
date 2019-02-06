const Chance = require('chance')
const chance = new Chance()

const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]
const levels = ['GCSE', 'A Level']

const createMentorData = ({ noOfMentorsToCreate, mentorUidCollection }) => {
  let mentorUidCollectionCopy = [...mentorUidCollection]
  return new Array(noOfMentorsToCreate).fill().map(() => {
    return {
      "uid": mentorUidCollectionCopy.pop(),
      "available": chance.bool(),
      "email": chance.email(),
      "gems": chance.integer({ min: 0, max: 100 }),
      "name": chance.name(),
      "subjects": new Array(chance.integer({ min: 1, max: 3 })).fill().map((v, i) => {
        let noOfTopics = chance.integer({ min: 1, max: 3 })
        return {
          "name": subjects[i],
          "topics": topics[i].slice(0, noOfTopics),
          "backgroundColor": getRandomColor(),
          "imageUrl": 'https://firebasestorage.googleapis.com/v0/b/fir-demo-ea316.appspot.com/o/images%2Fmaths.png?alt=media&token=a34071db-7867-47e8-9baf-4090f19649db',
          "levels": chance.pickset(levels, chance.integer({ min: 1, max: 2 }))
        }
      }),
      "avgRating": chance.pickone([1, 2, 3, 4, 5]),
      "totalQuestionsAnswered": 0,
      "totalRating": 0
    }
  })
}

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}


module.exports.createMentorData = createMentorData