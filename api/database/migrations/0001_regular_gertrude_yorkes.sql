CREATE TABLE IF NOT EXISTS "payment_customer_plan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_provider_id" text,
	"subscription_provider_id" text,
	"plan_started_at" timestamp,
	"plan_ends_at" timestamp,
	"trial_ends_at" timestamp,
	"subscription_status" text
);
--> statement-breakpoint
ALTER TABLE "payment_customers" ADD COLUMN "customer_plan_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_customers" ADD CONSTRAINT "payment_customers_customer_plan_id_payment_customer_plan_id_fk" FOREIGN KEY ("customer_plan_id") REFERENCES "public"."payment_customer_plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "payment_customers" DROP COLUMN IF EXISTS "subscription_provider_id";--> statement-breakpoint
ALTER TABLE "payment_customers" DROP COLUMN IF EXISTS "trial_ends_at";--> statement-breakpoint
ALTER TABLE "payment_customers" DROP COLUMN IF EXISTS "plan_started_at";--> statement-breakpoint
ALTER TABLE "payment_customers" DROP COLUMN IF EXISTS "plan_ends_at";--> statement-breakpoint
ALTER TABLE "payment_customers" DROP COLUMN IF EXISTS "subscription_status";--> statement-breakpoint
ALTER TABLE "payment_customers" ADD CONSTRAINT "payment_customers_customer_plan_id_unique" UNIQUE("customer_plan_id");