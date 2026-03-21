import { faker } from '@faker-js/faker';

const userRandom = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    username: `${firstName}${faker.number.int(1000)}`,
    password: "s3cret"
  };
};

export default userRandom;