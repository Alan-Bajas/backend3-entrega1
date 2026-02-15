import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const mongoObjectId = () => faker.string.hexadecimal({ length: 24, prefix: "" });

export async function generateMockUsers(qty = 50, options = {}) {
  const { mongoLike = true } = options;

  const hashedPassword = await bcrypt.hash("coder123", 10);

  return Array.from({ length: qty }).map(() => {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();

    // email casi imposible de repetir
    const email =
      faker.internet
        .email({ firstName: first_name, lastName: last_name, allowSpecialCharacters: false })
        .toLowerCase()
      + "." + faker.string.numeric(6);

    const base = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    };

    if (mongoLike) {
      return {
        _id: mongoObjectId(),
        ...base,
        __v: 0,
        createdAt: faker.date.past(),
        updatedAt: new Date()
      };
    }

    return base;
  });
}
