import { mergeDbdSchema } from './merged-schema';
import { paymentCustomer } from './public-database-schema';

export type MergedDbSchema = typeof mergeDbdSchema;

export type PaymentCustomerPersistence = typeof paymentCustomer.$inferSelect;
