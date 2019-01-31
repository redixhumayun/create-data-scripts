const Chance = require('chance')
const chance = new Chance()

const studentUidCollection = []
const mentorUidCollection = []

const createUserData = ({ noOfUsersToCreate }) => {
  return {
    users: new Array(noOfUsersToCreate).fill().map(() => {
      let role = chance.pickone(['Student', 'Mentor'])
      let uid = chance.guid()
      if (role === 'Student') {
        studentUidCollection.push(uid)
        return {
          "uid": uid,
          "email": chance.email(),
          "name": chance.name(),
          "mentor": false,
          "student": true
        }
      } else if(role === 'Mentor') {
        mentorUidCollection.push(uid)
        return {
          "uid": uid,
          "email": chance.email(),
          "name": chance.name(),
          "mentor": true,
          "student": false
        }
      }
    }),
    studentUidCollection,
    mentorUidCollection
  }
}

module.exports.createUserData = createUserData