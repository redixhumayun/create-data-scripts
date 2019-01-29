const { createMentorData } = require('./createMentorData')
const { createQuestionData } = require('./createQuestionData')

const { mentors, uidCollection } = createMentorData({ noOfMentorsToCreate: 50 })
const questions = createQuestionData({ noOfQuestionsToCreate: 100, uidCollectionOfMentors: uidCollection })


const print = (data) => {
  console.log(JSON.stringify(data, null, 2))
}

print(questions)