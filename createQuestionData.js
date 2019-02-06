const Chance = require('chance')
const chance = new Chance()

const questionStatuses = ['pending', 'matched', 'claimed', 'solved']
const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]
const level = ['GCSE', 'A Level']

const createQuestionData = ({ noOfQuestionsToCreate, studentUidCollection, mentorUidCollection }) => {
  return new Array(noOfQuestionsToCreate).fill().map(() => {
    let subjectIndex = chance.integer({ min: 0, max: 2 })
    let uid = chance.guid()
    const result = {
      "uid": uid,
      "created": chance.date(),
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/fir-demo-ea316.appspot.com/o/images%2FQ9sF2bbb3WwhEgBZddmV%2Fquestion.jpg?alt=media&token=32f3e195-19dc-4c26-87d4-2eb6d38dedae",
      "status": chance.pickone(questionStatuses),
      "subject": {
        name: subjects[subjectIndex],
        backgroundColor: getRandomColor(),
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fir-demo-ea316.appspot.com/o/images%2F,maths.png?alt=media&token=a34071db-7867-47e8-9baf-4090f19649db',
        topics: topics[subjectIndex], 
        level: chance.pickone(level)
      },
      "storageUri": "images/Q9sF2bbb3WwhEgBZddmV/question.jpg",
      "topic": chance.pickone(topics[subjectIndex]),
      "title": chance.string(),
      "studentId": chance.pickone(studentUidCollection),
      "matchedMentorIds": [],
      "claimedMentorIds": []
    }
    if (result.status === 'claimed') {
      const mentorUids = chance.pickset(mentorUidCollection, chance.integer({ min: 1, max: 5 }))
      result.matchedMentorIds = mentorUids
      result.claimedMentorIds = chance.pickone(mentorUids)
    }
    if (result.status === 'matched') {
      result.matchedMentorIds = chance.pickset(mentorUidCollection, chance.integer({ min: 1, max: 5 }))
    }
    if (result.status === 'solved') {
      result.answer = {
        'created': chance.date(),
        'questionId': uid,
        'mentorId': chance.pickone(mentorUidCollection),
        'answerText': chance.string(),
        'rating': chance.integer({ min: 0, max: 5 }),
        'imageUri': chance.url(),
      }
      result.matchedMentorIds = chance.pickone(mentorUidCollection)
    }
    return result
  })
}

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}


module.exports.createQuestionData = createQuestionData