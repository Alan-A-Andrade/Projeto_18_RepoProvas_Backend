import { client } from '../src/database.js'

async function main() {
  //upsert = update/insert
  //melhor que create por que pode dar conflito em campos unicos
  await client.users.upsert({
    where: { email: "teste123@mail.com" },
    update: {},
    create: {
      email: "teste123@mail.com",
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