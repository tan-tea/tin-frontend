import { sql } from 'drizzle-orm';
import {
    pgTable,
    uuid,
    text,
    varchar,
    boolean,
    timestamp,
    smallint,
    jsonb,
    check,
    index,
    numeric,
    integer,
    primaryKey,
    time,
    date,
} from 'drizzle-orm/pg-core';

type Font = 'Poppins' | 'Raleway' | 'Inter';

const fonts = ['Poppins', 'Raleway', 'Inter'] as const;

type SocialMediaPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'whatsapp';

type SocialMedia = {
    url: string;
    label: string;
    platform: SocialMediaPlatform;
};

type OfferType = 'product' | 'service';

const offerTypes = ['product', 'service'] as const;

export const users = pgTable(
    'users',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        email: text('email').unique().notNull(),
        emailVerified: boolean('email_verified').default(false).notNull(),
        image: text('image'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [],
);

export const sessions = pgTable(
    'sessions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        expiresAt: timestamp('expires_at').notNull(),
        token: text('token').unique().notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        index('session_user_id_idx').on(table.userId),
    ],
);

export const accounts = pgTable(
    'accounts',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        accountId: text('account_id').notNull(),
        providerId: text('provider_id').notNull(),
        accessToken: text('access_token'),
        refreshToken: text('refresh_token'),
        idToken: text('id_token'),
        accessTokenExpiresAt: timestamp('access_token_expires_at'),
        refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
        scope: text('scope'),
        password: text('password'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        index('account_user_id_idx').on(table.userId),
    ],
);

export const verifications = pgTable(
    'verification',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        identifier: text('identifier').notNull(),
        value: text('value').notNull(),
        expiresAt: timestamp('expires_at').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [
        index('verification_identifier_idx').on(table.identifier),
    ],
);


export const segments = pgTable(
    'segments',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        slug: text('slug').unique().notNull(),
        description: varchar('description', {
            length: 250,
        }),
        isActive: boolean('is_active').default(true).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [],
);

export const workspaces = pgTable(
    'workspaces',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        slug: text('slug').unique().notNull(),
        description: text('description'),
        tin: varchar('tin'),
        isVerfied: boolean('is_verified').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        segmentId: uuid('segment_id')
            .notNull()
            .references(() => segments.id),
        ownerId: uuid('owner_id')
            .notNull()
            .references(() => users.id, {
                onUpdate: 'cascade',
                onDelete: 'set null',
            }),
    },
    (table) => [],
);

export const customizations = pgTable(
    'customizations',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        logo: text('logo').notNull(),
        fontPrimary: text('font_primary', {
            enum: fonts,
        }).default('Poppins'),
        fontSecondary: text('font_secondary', {
            enum: fonts,
        }).default('Raleway'),
        showName: boolean('show_name').default(false),
        socialMedia: jsonb('social_media').$type<Array<SocialMedia>>(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [],
);

export const customizationColors = pgTable(
    'customization_colors',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        label: text('label').notNull(),
        value: text('value').notNull(),
        isDefault: boolean('is_default').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        customizationId: uuid('customization_id')
            .notNull()
            .references(() => customizations.id),
    },
    (table) => [],
);

export const customizationColorVariants = pgTable(
    'customization_color_variants',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        code: text('code').notNull(),
        hex: text('hex').notNull(),
        r: smallint('r').default(0),
        g: smallint('g').default(0),
        b: smallint('b').default(0),
        a: smallint('a').default(255),
        isMain: boolean('is_main').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        colorId: uuid('color_id')
            .notNull()
            .references(() => customizationColors.id),
    },
    (table) => [
        check('r_range', sql`${table.r} BETWEEN 0 AND 255`),
        check('g_range', sql`${table.g} BETWEEN 0 AND 255`),
        check('b_range', sql`${table.b} BETWEEN 0 AND 255`),
        check('a_range', sql`${table.a} BETWEEN 0 AND 255`),
    ],
);

export const categories = pgTable(
    'categories',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        label: text('label').notNull(), // TODO: change to 'name'.
        slug: text('slug').unique().notNull(),
        description: varchar('description', {
            length: 500,
        }),
        position: smallint('position').default(0),
        banner: text('banner'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [],
);

export const subcategories = pgTable(
    'subcategories',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        label: text('label').notNull(),
        description: varchar('description', {
            length: 500,
        }),
        position: smallint('position').default(0),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        categoryId: uuid('category_id')
            .notNull()
            .references(() => categories.id),
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [],
);

export const addresses = pgTable(
    'addresses',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        street: text('street').notNull(),
        number: text('number').notNull(),
        complement: text('complement'),
        neighboorhood: text('neighborhood').notNull(),
        city: text('city').notNull(),
        state: text('state').notNull(),
        country: text('country').notNull(),
        postalCode: varchar('postal_code', { length: 20 }),
        isOnline: boolean('is_online').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [],
);

export const geolocations = pgTable(
    'geolocations',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        latitude: numeric('latitude', { precision: 9, scale: 6 }).notNull(),
        longitude: numeric('longitude', { precision: 9, scale: 6 }).notNull(),
        accuracy: smallint('accuracy').default(5),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        check('latitude_range', sql`${table.latitude} BETWEEN -90 AND 90`),
        check('longitude_range', sql`${table.longitude} BETWEEN -180 AND 180`),
    ],
);

export const shops = pgTable(
    'shops',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        slug: text('slug').notNull(),
        description: varchar('description', {
            length: 500,
        }),
        banner: text('banner'),
        phone: varchar('phone', { length: 15 }),
        isPrimary: boolean('is_primary').default(false),
        isVerified: boolean('is_verified').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        addressId: uuid('address_id')
            .notNull()
            .references(() => addresses.id),
        geolocationId: uuid('geolocation_id')
            .notNull()
            .references(() => geolocations.id),
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [],
);

export const offers = pgTable(
    'offers',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        type: text('type', {
            enum: offerTypes
        }).default('product').notNull(),
        schedulingType: text('scheduling_type', {
            enum: ['provider', 'capacity'],
        }),
        duration: smallint('duration'),
        title: text('title').notNull(),
        slug: text('slug').notNull(),
        description: varchar('description', {
            length: 2500,
        }),
        banner: text('banner').notNull(),
        price: numeric('price', { precision: 12, scale: 2 }).notNull(),
        stock: integer('stock').default(0),
        discount: smallint('discount').default(0),
        startDate: timestamp('start_date').defaultNow().notNull(),
        endDate: timestamp('end_date')
            .$default(() => new Date(9999, 11, 31))
            .notNull(),
        isActive: boolean('is_active').default(true),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        categoryId: uuid('category_id')
            .notNull()
            .references(() => categories.id),
        subcategoryId: uuid('subcategory_id')
            .references(() => subcategories.id),
        shopId: uuid('shop_id') //TODO: pending to remove?
            .notNull()
            .references(() => shops.id),
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [
        check('discount_range', sql`${table.discount} BETWEEN 0 AND 100`),
    ],
);

export const offerImages = pgTable(
    'offer_images',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        image: text('image').notNull(),
        description: varchar('description', {
            length: 250,
        }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        offerId: uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [],
);

export const shopOffers = pgTable(
    'shop_offers',
    {
        shopId: uuid('shop_id')
            .notNull()
            .references(() => shops.id),
        offerId: uuid('offer_id')
            .notNull()
            .references(() => offers.id),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        primaryKey({
            columns: [
                table.shopId,
                table.offerId
            ]
        }),
    ],
);

export const schedules = pgTable(
    'schedules',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        dayOfWeek: smallint('day_of_week').notNull(),
        isClosed: boolean('is_closed').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        shopId: uuid('shop_id')
            .notNull()
            .references(() => shops.id),
    },
    (table) => [
        check('day_of_week_range', sql`${table.dayOfWeek} BETWEEN 0 AND 6`),
    ],
);

export const scheduleTimeSlots = pgTable(
    'schedule_time_slots',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        startTime: time('start_time', {
            withTimezone: true,
        }).notNull(),
        endTime: time('end_time', {
            withTimezone: true,
        }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        scheduleId: uuid('schedule_id')
            .notNull()
            .references(() => schedules.id),
    },
    (table) => [],
);

export const exceptions = pgTable(
    'exceptions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        date: timestamp('date').notNull(),
        reason: varchar('reason', {
            length: 500,
        }),
        isClosed: boolean('is_closed').default(false),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        shopId: uuid('shop_id')
            .notNull()
            .references(() => shops.id),
    },
);

export const exceptionTimeSlots = pgTable(
    'exception_time_slots',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        startTime: time('start_time', {
            withTimezone: true,
        }).notNull(),
        endTime: time('end_time', {
            withTimezone: true,
        }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        exceptionId: uuid('exception_id')
            .notNull()
            .references(() => exceptions.id),
    },
);

export const optionGroups = pgTable(
    'option_groups',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        description: varchar('description', {
            length: 500,
        }),
        required: boolean('required').default(false),
        min: smallint('min').default(0),
        max: smallint('max').default(1),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [],
);

export const options = pgTable(
    'options',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: text('name').notNull(),
        priceDelta: numeric('price_delta', { precision: 12, scale: 2 }).default('0.00'),
        isActive: boolean('is_active').default(true),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        optionGroupId: uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'cascade' }),
    },
    (table) => [],
);

export const offerOptionGroups = pgTable(
    'offer_option_groups',
    {
        offerId: uuid('offer_id')
            .notNull()
            .references(() => offers.id, { onDelete: 'cascade' }),
        optionGroupId: uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'cascade' }),
        sortOrder: smallint('sort_order').default(0),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        primaryKey({
            columns: [
                table.offerId,
                table.optionGroupId,
            ],
        }),
    ],
);

export const carts = pgTable(
    'carts',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        status: text('status', {
            enum: ['open', 'submitted', 'paid'],
        }).default('open'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [],
);

export const cartItems = pgTable(
    'cart_items',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        offerTitle: text('offer_title').notNull(),
        basePrice: numeric('base_price', { precision: 12, scale: 2 }).notNull(),
        totalPrice: numeric('total_price', { precision: 12, scale: 2 }).notNull(),
        quantity: integer('quantity').default(1).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        cartId: uuid('cart_id')
            .notNull()
            .references(() => carts.id, { onDelete: 'cascade' }),
        offerId: uuid('offer_id')
            .references(() => offers.id, { onDelete: 'set null' }),
        shopId: uuid('shop_id')
            .references(() => shops.id, { onDelete: 'set null' }),
    },
    (table) => [],
);

export const cartItemOptions = pgTable(
    'cart_item_options',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        optionGroupName: text('option_group_name').notNull(),
        optionName: text('option_name').notNull(),
        price: numeric('price', { precision: 12, scale: 2 }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        cartItemId: uuid('cart_item_id')
            .notNull()
            .references(() => cartItems.id, { onDelete: 'cascade' }),
        optionGroupId: uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'set null' }),
        optionId: uuid('option_id')
            .notNull()
            .references(() => options.id, { onDelete: 'set null' }),
    },
    (table) => [],
);

export const schedulingResources = pgTable(
    'scheduling_resources',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        type: text('type', {
            enum: ['provider', 'capacity'],
        }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        shopId: uuid('shop_id')
            .notNull()
            .references(() => shops.id),
    },
    (table) => [],
);

export const providerResources = pgTable(
    'provider_resources',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        providerId: uuid('provider_id'),
        resourceId: uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [],
);

export const capacityResources = pgTable(
    'capacity_resources',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        capacity: integer('capacity').default(1).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        resourceId: uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [],
);

export const availabilities = pgTable(
    'availabilities',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        weekday: smallint('weekday').notNull(),
        startTime: time('start_time', {
            withTimezone: true,
        }).notNull(),
        endTime: time('end_time', {
            withTimezone: true,
        }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        resourceId: uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [
        check('weekday_range', sql`${table.weekday} BETWEEN 0 AND 6`),
    ],
);

export const appointments = pgTable(
    'appointments',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        startAt: timestamp('start_at', {
            withTimezone: true,
        }).notNull(),
        endAt: timestamp('end_at', {
            withTimezone: true,
        }).notNull(),
        status: text('status', {
            enum: ['pending', 'confirmed', 'canceled', 'completed'],
        }).default('pending').notNull(),
        quantity: integer('quantity'),
        notes: varchar('notes', {
            length: 1000,
        }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        clientId: uuid('client_id')
            .references(() => users.id),
        resourceId: uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
        offerId: uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [],
);

export const waitlists = pgTable(
    'waitlists',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        desiredDate: date('desired_date').notNull(),
        timeFrom: time('time_from', {
            withTimezone: true,
        }).notNull(),
        timeTo: time('time_to', {
            withTimezone: true,
        }).notNull(),
        priority: smallint('priority').default(0),
        quantity: integer('quantity'),
        status: text('status', {
            enum: ['pending', 'confirmed', 'canceled', 'completed'],
        }).default('pending').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        clientId: uuid('client_id')
            .references(() => users.id),
        resourceId: uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
        offerId: uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [],
);

