import { mergeDbdSchema } from './merged-schema';
import { paymentCustomer, paymentCustomerPlan } from './public-database-schema';

export type MergedDbSchema = typeof mergeDbdSchema;

export type PaymentCustomerPersistence = typeof paymentCustomer.$inferSelect;
export type PaymentCustomerPlanPersistence = typeof paymentCustomerPlan.$inferSelect;
