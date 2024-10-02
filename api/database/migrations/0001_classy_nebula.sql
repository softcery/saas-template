CREATE TABLE IF NOT EXISTS "payment_customer" (
	"id" text PRIMARY KEY NOT NULL,
	"provider_customer_id" text NOT NULL,
	"user_id" text NOT NULL,
	"name" text,
	"email" text,
	"subscription_provider_id" text,
	"trial_started_at" timestamp,
	"trial_canceled_at" timestamp,
	"trial_ends_at" timestamp,
	"plan_started_at" timestamp,
	"subscription_canceled_at" timestamp,
	"plan_ends_at" timestamp,
	"subscription_status" text
);
--> statement-breakpoint
DROP TABLE "hello-world";