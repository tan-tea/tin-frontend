ALTER TABLE "categories" ALTER COLUMN "position" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "is_primary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "is_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "tin" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;