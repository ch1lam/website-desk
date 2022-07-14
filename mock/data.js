const { faker } = require("@faker-js/faker");

module.exports = () => {
  const data = { users: [] };
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.users.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.exampleEmail(),
      phone: faker.phone.number("1##-####-####"),
    });
  }
  return data;
};
