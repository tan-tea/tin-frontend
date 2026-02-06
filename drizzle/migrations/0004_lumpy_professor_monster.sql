ALTER TABLE "offer_option_groups" ALTER COLUMN "sort_order" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "discount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "option_groups" ALTER COLUMN "min" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "option_groups" ALTER COLUMN "max" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "price_delta" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "price_delta" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "is_active" SET NOT NULL;