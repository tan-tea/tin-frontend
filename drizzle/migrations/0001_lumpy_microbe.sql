DROP INDEX "account_user_id_idx";--> statement-breakpoint
DROP INDEX "addresses_street_idx";--> statement-breakpoint
DROP INDEX "addresses_city_idx";--> statement-breakpoint
DROP INDEX "addresses_country_idx";--> statement-breakpoint
DROP INDEX "offer_images_image_idx";--> statement-breakpoint
DROP INDEX "session_user_id_idx";--> statement-breakpoint
DROP INDEX "verification_identifier_idx";--> statement-breakpoint
CREATE INDEX "accounts_account_id_index" ON "accounts" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "accounts_provider_id_index" ON "accounts" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "addresses_street_index" ON "addresses" USING btree ("street");--> statement-breakpoint
CREATE INDEX "addresses_city_index" ON "addresses" USING btree ("city");--> statement-breakpoint
CREATE INDEX "addresses_country_index" ON "addresses" USING btree ("country");--> statement-breakpoint
CREATE INDEX "offer_images_image_index" ON "offer_images" USING btree ("image");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_index" ON "verification" USING btree ("identifier");