ALTER TABLE "customization_color_variants" RENAME COLUMN "a" TO "alpha";--> statement-breakpoint
ALTER TABLE "customization_color_variants" DROP CONSTRAINT "a_range";--> statement-breakpoint
ALTER TABLE "customization_color_variants" ALTER COLUMN "r" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customization_color_variants" ALTER COLUMN "g" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customization_color_variants" ALTER COLUMN "b" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customization_color_variants" ALTER COLUMN "is_main" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customization_color_variants" ADD CONSTRAINT "a_range" CHECK ("customization_color_variants"."alpha" BETWEEN 0 AND 255);