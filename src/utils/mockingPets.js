import { faker } from "@faker-js/faker";

export function generateMockPets(qty = 100) {
  return Array.from({ length: qty }).map(() => ({
    name: faker.animal.petName(),
    type: faker.helpers.arrayElement(["dog", "cat", "bird", "hamster"]),
    age: faker.number.int({ min: 0, max: 20 })
  }));
}
