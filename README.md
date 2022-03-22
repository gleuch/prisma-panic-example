Prisma will throw PANIC when attempting to pass extremely large number beyond Postgres upper Int bound.

To run:

```
yarn install

node index.js
```

This will attempt 3 upserts. Once a PANIC happens, unable to continue any further Prisma actions.

1. ✅ The first `upsert()` has a number within bounds will succeed.
2. ❌ The second `upsert()` has a number extremely out of range of Postgres' Int bounds that will throw a PANIC on `Option::unwrap()`.
3. ❌ The third `upsert()` has a number within bounds, but will fail due to earlier PANIC within Prisma engine.
