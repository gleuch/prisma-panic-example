require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient({ log: ['query', 'error'] });

Promise.resolve().then(async () => {
  
  
  // Create an initial record to use for upsert
  const record = await client.example.create({ data: { example_id: 0 } });


  // Add a number within PG Int range
  // Expect: ✅ SUCCESS
  try {
    const goodInt = 2147483647;
    const goodResult = await client.example.upsert({
      where: { id: record.id },
      create: { example_id: goodInt },
      update: { example_id: goodInt },
    });

    console.log('Upsert #1 Succeeded!', goodResult);
  } catch (err) {
    console.error('Upsert #1 Failed!\n', err);
  }


  console.log('\n\n\n');


  // Add some really high number outside PG Int range (or compiler's range?)
  // Expect: ❌ FAIL -- EXTREMELY OUT OF BOUNDS INT THROWS PANIC
  try {
    const badInt = 21474837003423423423214748370034234234;
    const badResult = await client.example.upsert({
      where: { id: record.id },
      create: { example_id: badInt },
      update: { example_id: badInt },
    });
    console.log('Upsert #2 Succeeded!', badResult);
    return record;
  } catch (err) {
    console.error('Upsert #2 Failed!\n', err);
  }


  console.log('\n\n\n');


  // Add a number within PG Int range
  // Expect: ❌ FAIL -- EARLIER PANIC PREVENTS FUTHER USE
  try {
    const goodInt = 88;
    const goodResult = await client.example.upsert({
      where: { id: record.id },
      create: { example_id: goodInt },
      update: { example_id: goodInt },
    });
    console.log('Upsert #3 Succeeded!', goodResult);
  } catch (err) {
    console.error('Upsert #3 Failed!\n', err);
  }


});
