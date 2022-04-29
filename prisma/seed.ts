import { client } from '../src/database.js'
import bcrypt from 'bcrypt'

async function main() {

  await client.users.upsert({
    where: { email: "teste123@mail.com" },
    update: {},
    create: {
      email: "teste123@mail.com",
      password: bcrypt.hashSync("123", 10)
    },
  });

}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });