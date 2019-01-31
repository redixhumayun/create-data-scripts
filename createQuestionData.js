const Chance = require('chance')
const chance = new Chance()

const questionStatuses = ['pending', 'matched', 'claimed', 'solved']
const subjects = ['Maths', 'Science', 'Geography']
const topics = [['algebra', 'calculus', 'trignometry'], ['physics', 'chemistry', 'biology'], ['oceans', 'forests', 'land']]

const createQuestionData = ({ noOfQuestionsToCreate, studentUidCollection }) => {
  return new Array(noOfQuestionsToCreate).fill().map(() => {
    let subjectIndex = randomIntFromInterval(0, 2)
    return {
      "uid": chance.guid(),
      "created": chance.date(),
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/fir-demo-ea316.appspot.com/o/images%2FQ9sF2bbb3WwhEgBZddmV%2Fquestion.jpg?alt=media&token=32f3e195-19dc-4c26-87d4-2eb6d38dedae",
      "status": chance.pickone(questionStatuses),
      "subject": {
        name: subjects[subjectIndex],
        backgroundColor: 'red',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fir-demo-ea316.appspot.com/o/images%2F,maths.png?alt=media&token=a34071db-7867-47e8-9baf-4090f19649db',
        topics: ['Array of topics']
      },
      "storageUri": "images/Q9sF2bbb3WwhEgBZddmV/question.jpg",
      "topic": chance.pickone(topics[subjectIndex]),
      "title": chance.string(),
      "studentId": chance.pickone(studentUidCollection),
      "matchedMentorIds": [],
      "answer": {
        'created': chance.date(),
        'questionId': null,
        'mentorId': chance.uid(),
        'answerText': chance.string(),
        'rating': chance.integer({ min: 0, max: 5 }),
        'imageUri': chance.url(),
      }
    }
  })
}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.createQuestionData = createQuestionData