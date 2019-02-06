const Chance = require('chance')
const chance = new Chance()

const createUserData = ({ noOfUsersToCreate, studentUidCollection, mentorUidCollection }) => {
  return new Array(noOfUsersToCreate).fill().map((v, i) => {
    let role = chance.pickone(['Student', 'Mentor'])
    if (i <= 3) {
      return {
        "uid": studentUidCollection[i],
        "email": chance.email(),
        "name": chance.name(),
        "mentor": false,
        "student": true
      }
    } else {
      return {
        "uid": mentorUidCollection[i-4],
        "email": chance.email(),
        "name": chance.name(),
        "mentor": true,
        "student": false
      }
    }
  })
}

module.exports.createUserData = createUserData