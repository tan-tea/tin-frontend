CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"street" text NOT NULL,
	"number" text NOT NULL,
	"complement" text,
	"neighborhood" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"postal_code" varchar(20),
	"is_online" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"quantity" integer,
	"notes" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"client_id" uuid,
	"resource_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"weekday" smallint NOT NULL,
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL,
	CONSTRAINT "weekday_range" CHECK ("weekday" BETWEEN 0 AND 6)
);
--> statement-breakpoint
CREATE TABLE "capacity_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"capacity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_item_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"option_group_name" text NOT NULL,
	"option_name" text NOT NULL,
	"price" numeric(12,2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cart_item_id" uuid NOT NULL,
	"option_group_id" uuid NOT NULL,
	"option_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"offer_title" text NOT NULL,
	"base_price" numeric(12,2) NOT NULL,
	"total_price" numeric(12,2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cart_id" uuid NOT NULL,
	"offer_id" uuid,
	"shop_id" uuid
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"status" text DEFAULT 'open',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"label" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" varchar(500),
	"position" smallint DEFAULT 0,
	"banner" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customization_color_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"code" text NOT NULL,
	"hex" text NOT NULL,
	"r" smallint DEFAULT 0,
	"g" smallint DEFAULT 0,
	"b" smallint DEFAULT 0,
	"a" smallint DEFAULT 255,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"color_id" uuid NOT NULL,
	CONSTRAINT "r_range" CHECK ("r" BETWEEN 0 AND 255),
	CONSTRAINT "g_range" CHECK ("g" BETWEEN 0 AND 255),
	CONSTRAINT "b_range" CHECK ("b" BETWEEN 0 AND 255),
	CONSTRAINT "a_range" CHECK ("a" BETWEEN 0 AND 255)
);
--> statement-breakpoint
CREATE TABLE "customization_colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"label" text NOT NULL,
	"value" text NOT NULL,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"customization_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"logo" text NOT NULL,
	"font_primary" text DEFAULT 'Poppins',
	"font_secondary" text DEFAULT 'Raleway',
	"show_name" boolean DEFAULT false,
	"social_media" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exception_time_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"exception_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exceptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"date" timestamp NOT NULL,
	"reason" varchar(500),
	"is_closed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "geolocations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"latitude" numeric(9,6) NOT NULL,
	"longitude" numeric(9,6) NOT NULL,
	"accuracy" smallint DEFAULT 5,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "latitude_range" CHECK ("latitude" BETWEEN -90 AND 90),
	CONSTRAINT "longitude_range" CHECK ("longitude" BETWEEN -180 AND 180)
);
--> statement-breakpoint
CREATE TABLE "offer_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"image" text NOT NULL,
	"description" varchar(250),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offer_option_groups" (
	"offer_id" uuid,
	"option_group_id" uuid,
	"sort_order" smallint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "offer_option_groups_pkey" PRIMARY KEY("offer_id","option_group_id")
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" text DEFAULT 'product' NOT NULL,
	"scheduling_type" text,
	"duration" smallint,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(2500),
	"banner" text NOT NULL,
	"price" numeric(12,2) NOT NULL,
	"stock" integer DEFAULT 0,
	"discount" smallint DEFAULT 0,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" uuid NOT NULL,
	"subcategory_id" uuid,
	"shop_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	CONSTRAINT "discount_range" CHECK ("discount" BETWEEN 0 AND 100)
);
--> statement-breakpoint
CREATE TABLE "option_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" varchar(500),
	"required" boolean DEFAULT false,
	"min" smallint DEFAULT 0,
	"max" smallint DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"price_delta" numeric(12,2) DEFAULT '0.00',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"option_group_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"provider_id" uuid,
	"resource_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_time_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"schedule_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"day_of_week" smallint NOT NULL,
	"is_closed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL,
	CONSTRAINT "day_of_week_range" CHECK ("day_of_week" BETWEEN 0 AND 6)
);
--> statement-breakpoint
CREATE TABLE "scheduling_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "segments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" varchar(250),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_offers" (
	"shop_id" uuid,
	"offer_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shop_offers_pkey" PRIMARY KEY("shop_id","offer_id")
);
--> statement-breakpoint
CREATE TABLE "shops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(500),
	"banner" text,
	"phone" varchar(15),
	"is_primary" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"address_id" uuid NOT NULL,
	"geolocation_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subcategories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"label" text NOT NULL,
	"description" varchar(500),
	"position" smallint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"desired_date" date NOT NULL,
	"time_from" time with time zone NOT NULL,
	"time_to" time with time zone NOT NULL,
	"priority" smallint DEFAULT 0,
	"quantity" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"client_id" uuid,
	"resource_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"tin" varchar,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"segment_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "accounts" ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_resource_id_scheduling_resources_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "scheduling_resources"("id");--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id");--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_resource_id_scheduling_resources_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "scheduling_resources"("id");--> statement-breakpoint
ALTER TABLE "capacity_resources" ADD CONSTRAINT "capacity_resources_resource_id_scheduling_resources_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "scheduling_resources"("id");--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_cart_item_id_cart_items_id_fkey" FOREIGN KEY ("cart_item_id") REFERENCES "cart_items"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_option_group_id_option_groups_id_fkey" FOREIGN KEY ("option_group_id") REFERENCES "option_groups"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_option_id_options_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_workspace_id_workspaces_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id");--> statement-breakpoint
ALTER TABLE "customization_color_variants" ADD CONSTRAINT "customization_color_variants_0yj63a3sajFV_fkey" FOREIGN KEY ("color_id") REFERENCES "customization_colors"("id");--> statement-breakpoint
ALTER TABLE "customization_colors" ADD CONSTRAINT "customization_colors_customization_id_customizations_id_fkey" FOREIGN KEY ("customization_id") REFERENCES "customizations"("id");--> statement-breakpoint
ALTER TABLE "customizations" ADD CONSTRAINT "customizations_workspace_id_workspaces_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id");--> statement-breakpoint
ALTER TABLE "exception_time_slots" ADD CONSTRAINT "exception_time_slots_exception_id_exceptions_id_fkey" FOREIGN KEY ("exception_id") REFERENCES "exceptions"("id");--> statement-breakpoint
ALTER TABLE "exceptions" ADD CONSTRAINT "exceptions_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id");--> statement-breakpoint
ALTER TABLE "offer_images" ADD CONSTRAINT "offer_images_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id");--> statement-breakpoint
ALTER TABLE "offer_option_groups" ADD CONSTRAINT "offer_option_groups_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "offer_option_groups" ADD CONSTRAINT "offer_option_groups_option_group_id_option_groups_id_fkey" FOREIGN KEY ("option_group_id") REFERENCES "option_groups"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_subcategory_id_subcategories_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id");--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id");--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_workspace_id_workspaces_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id");--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_option_group_id_option_groups_id_fkey" FOREIGN KEY ("option_group_id") REFERENCES "option_groups"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "provider_resources" ADD CONSTRAINT "provider_resources_resource_id_scheduling_resources_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "scheduling_resources"("id");--> statement-breakpoint
ALTER TABLE "schedule_time_slots" ADD CONSTRAINT "schedule_time_slots_schedule_id_schedules_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id");--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id");--> statement-breakpoint
ALTER TABLE "scheduling_resources" ADD CONSTRAINT "scheduling_resources_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "shop_offers" ADD CONSTRAINT "shop_offers_shop_id_shops_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id");--> statement-breakpoint
ALTER TABLE "shop_offers" ADD CONSTRAINT "shop_offers_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id");--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_address_id_addresses_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_geolocation_id_geolocations_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocations"("id");--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_workspace_id_workspaces_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id");--> statement-breakpoint
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_workspace_id_workspaces_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id");--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_resource_id_scheduling_resources_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "scheduling_resources"("id");--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_offer_id_offers_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_segment_id_segments_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "segments"("id");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;