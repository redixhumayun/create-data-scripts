const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccount.json')

const { createUserData } = require('./createUserData')
const { createMentorData } = require('./createMentorData')
const { createStudentData } = require('./createStudentData')
const { createQuestionData } = require('./createQuestionData')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});
const db = admin.firestore()

const { users, studentUidCollection, mentorUidCollection } = createUserData({ noOfUsersToCreate: 50 })
const mentors = createMentorData({ noOfMentorsToCreate: mentorUidCollection.length, mentorUidCollection })
const students = createStudentData({ noOfStudentsToCreate: studentUidCollection.length, studentUidCollection, mentorUidCollection })
const questions = createQuestionData({ noOfQuestionsToCreate: 50, studentUidCollection, mentorUidCollection })

const writeToFirestore = async (collections) => {
  const batch = db.batch()
  Object.entries(collections).map(([key, data]) => {
    const collectionRef = db.collection(key)
    data.map(datum => {
      const docRef = collectionRef.doc(datum.uid)
      batch.set(docRef, datum)
      return datum
    })
  })
  try {
    await batch.commit()
  } catch (e) {
    throw new Error("Could not finish writing batch")
  }
}

const writeSingleQuestion = async () => {
  const questionRef = db.collection('questions')
  const docRef = questionRef.doc('eb50700b-ce86-5857-90a1-e018bd5eecf2')
  docRef.set({
    "status": "pending",
    "studentId": "0060cd26-38fb-5a8b-a769-86c02e8b1598",
    "subject": {
      "name": "Maths",
      "level": "GCSE",
      "topics": ["algebra", "trigonometry", "calculus"]
    },
    "topic": "calculus",
    "uid": "eb50700b-ce86-5857-90a1-e018bd5eecf2",
    "matchedMentorIds": []
  })
  return
}

writeSingleQuestion()

// writeToFirestore({ 
//   users, mentors, students, questions
// })

const print = (...data) => {
  data.map(datum => {
    console.log(JSON.stringify(datum, null, 2))
    console.log('\n\n')
  })
}