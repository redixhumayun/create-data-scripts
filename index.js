const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccount.json')

const { createUserData } = require('./createUserData')
const { createMentorData } = require('./createMentorData')
const { createStudentData } = require('./createStudentData')
const { createQuestionData } = require('./createQuestionData')
const { createFavoritedMentorsData } = require('./createFavoritedMentorsData')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});
const db = admin.firestore()

const { users, studentUidCollection, mentorUidCollection } = createUserData({ noOfUsersToCreate: 50 })
const mentors = createMentorData({ noOfMentorsToCreate: mentorUidCollection.length, mentorUidCollection })
const students = createStudentData({ noOfStudentsToCreate: studentUidCollection.length, studentUidCollection })
const questions = createQuestionData({ noOfQuestionsToCreate: 50, studentUidCollection })
const favoritedMentors = createFavoritedMentorsData({ noOfCollectionsToCreate: studentUidCollection.length, studentUidCollection, mentorUidCollection })

const writeToFirestore = async (collections) => {
  // const ref = db.collection(collectionName)
  // data.map(datum => {
  //   ref.doc(datum.uid).set(datum)
  //   return datum
  // })
  const batch = db.batch()
  Object.entries(collections).map(([key, value]) => {
    
  })
  // const batch = db.batch()
  // collectionNames.map(collectionName => {
  //   const ref = db.collection(collectionName)

  // })
}

// writeToFirestore({ 
//   mentors, students, questions, favoritedMentors
// })

const print = (...data) => {
  data.map(datum => {
    console.log(JSON.stringify(datum, null, 2))
    console.log('\n\n')
  })
}

print(mentors)