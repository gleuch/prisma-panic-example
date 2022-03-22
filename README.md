Prisma will throw PANIC when attempting to pass extremely large number beyond Postgres upper Int bound.

To run:

```
yarn install
node index.js
```

Once PANIC happens, unable to continue any further Prisma actions.
