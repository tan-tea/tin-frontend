ALTER TABLE "customizations" ALTER COLUMN "font_primary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customizations" ALTER COLUMN "font_secondary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customizations" ALTER COLUMN "show_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customizations" ALTER COLUMN "social_media" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "customizations" ALTER COLUMN "social_media" SET NOT NULL;