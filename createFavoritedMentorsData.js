const Chance = require('chance')
const chance = new Chance()

const createFavoritedMentorsData = ({ noOfCollectionsToCreate, studentUidCollection, mentorUidCollection }) => {
  let studentUidCollectionCopy = [...studentUidCollection]
  return new Array(noOfCollectionsToCreate).fill().map(() => {
    //  to ensure no student id is picked more than once
    let studentId = chance.pickone(studentUidCollectionCopy)
    let index = studentUidCollectionCopy.findIndex((i) => i === studentId)
    studentUidCollectionCopy.splice(index, 1)
    return {
      studentId: studentId,
      mentorIds: chance.pickset(mentorUidCollection, chance.integer({ min: 0, max: 5 }))
    }
  })
}

module.exports.createFavoritedMentorsData = createFavoritedMentorsData