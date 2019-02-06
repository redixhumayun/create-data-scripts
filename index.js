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

const studentUidCollection = ['euBbNeEdCbTWVRERvrBNZ1T09fI2', 'KDV39xKYsGfiAZV3gPm2iwhHi1G2', '5OL9wZBhBNdUkRuePmhkjZpvujE2', 'PuA9laE07FNfxMYAEsnQwwAiu7s1']
const mentorUidCollection = ['tBiBHDYDMaQve3exXA5n2E5rFwJ3', 'g9oukxWlT0f9DMPDZBNnnWH9TKw1', 'R8zIwEZ1nJMHmksyGFFl9MDoMgR2', 'lIvMrAjgiHZ7Ww2RiCgnvV9iu4p2']

const users = createUserData({ noOfUsersToCreate: 8, studentUidCollection, mentorUidCollection })
const mentors = createMentorData({ noOfMentorsToCreate: mentorUidCollection.length, mentorUidCollection })
const students = createStudentData({ noOfStudentsToCreate: studentUidCollection.length, studentUidCollection, mentorUidCollection })
const questions = createQuestionData({ noOfQuestionsToCreate: 15, studentUidCollection, mentorUidCollection })


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
