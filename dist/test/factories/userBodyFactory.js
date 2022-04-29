// /tests/factories/userBodyFactory.ts
import { faker } from "@faker-js/faker";
export default function userBodyFactory() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}
