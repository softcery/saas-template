import { pgTable, text } from 'drizzle-orm/pg-core';

export const helloWorld = pgTable('hello-world', {
  test: text('test'),
});
