import faker from 'faker'

const constants = {
  RANDOM_EMAIL: faker.internet.email(),
  RANDOM_NAME: faker.name.firstName(),
  RANDOM_GENDER: faker.name.gender()
}

export default constants
