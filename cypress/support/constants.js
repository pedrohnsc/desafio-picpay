import faker from 'faker'

const constants = {
  RANDOM_EMAIL: faker.internet.email(),
  RANDOM_NAME: faker.name.firstName(),
  RANDOM_GENDER: faker.name.gender(),

  TOKEN: 'Bearer 2275e2cbbf8dc1d113b25fb018cdb2e07e088b35bb5f7b7c13ca160ed96a82ba'
}

export default constants
