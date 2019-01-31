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
const students = createStudentData({ noOfStudentsToCreate: studentUidCollection.length, studentUidCollection })
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

writeToFirestore({ 
  users, mentors, students, questions
})

const print = (...data) => {
  data.map(datum => {
    console.log(JSON.stringify(datum, null, 2))
    console.log('\n\n')
  })
}

