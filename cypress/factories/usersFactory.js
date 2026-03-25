import { faker } from '@faker-js/faker';

const userRandom = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    routingNumber: faker.finance.routingNumber(),
    accountNumber: faker.finance.accountNumber({ length: 9 }),
    username: `${firstName}${faker.number.int(1000)}`,
    password: "s3cret"
  };
};

export default userRandom;