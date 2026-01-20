import { defineRelations } from 'drizzle-orm';

import {
    users,
    sessions,
    accounts,
    verifications,
    segments,
    workspaces,
    customizations,
    customizationColors,
    customizationColorVariants,
    categories,
    subcategories,
    addresses,
    geolocations,
    shops,
    offers,
    offerImages,
    shopOffers,
    schedules,
    scheduleTimeSlots,
    exceptions,
    exceptionTimeSlots,
    optionGroups,
    options,
    offerOptionGroups,
    carts,
    cartItems,
    cartItemOptions,
    schedulingResources,
    providerResources,
    capacityResources,
    availabilities,
    appointments,
    waitlists,
} from 'lib/db/schema';

export const relations = defineRelations({
    users,
    sessions,
    accounts,
    verifications,
    segments,
    workspaces,
    customizations,
    customizationColors,
    customizationColorVariants,
    categories,
    subcategories,
    addresses,
    geolocations,
    shops,
    offers,
    offerImages,
    shopOffers,
    schedules,
    scheduleTimeSlots,
    exceptions,
    exceptionTimeSlots,
    optionGroups,
    options,
    offerOptionGroups,
    carts,
    cartItems,
    cartItemOptions,
    schedulingResources,
    providerResources,
    capacityResources,
    availabilities,
    appointments,
    waitlists,
}, (r) => ({
    users: {
        sessions: r.many.sessions(),
        accounts: r.many.accounts(),
        workspaces: r.many.workspaces(),
        carts: r.many.carts(),
        appointments: r.many.appointments(),
    },
    sessions: {
        user: r.one.users({
            from: r.sessions.userId,
            to: r.users.id,
        }),
    },
    accounts: {
        user: r.one.users({
            from: r.accounts.userId,
            to: r.users.id,
        }),
    },
    segments: {
        workspaces: r.many.workspaces(),
    },
    workspaces: {
        owner: r.one.users({
            from: r.workspaces.ownerId,
            to: r.users.id,
        }),
        segment: r.one.segments({
            from: r.workspaces.segmentId,
            to: r.segments.id,
        }),
        customizations: r.many.customizations(),
        categories: r.many.categories(),
        subcategories: r.many.subcategories(),
        shops: r.many.shops(),
    },
    customizations: {
        workspace: r.one.workspaces({
            from: r.customizations.workspaceId,
            to: r.workspaces.id,
        }),
        colors: r.many.customizationColors(),
    },
    customizationColors: {
        customization: r.one.customizations({
            from: r.customizationColors.customizationId,
            to: r.customizations.id,
        }),
        variants: r.many.customizationColorVariants(),
    },
    customizationColorVariants: {
        color: r.one.customizationColors({
            from: r.customizationColorVariants.colorId,
            to: r.customizationColors.id,
        }),
    },
    categories: {
        workspace: r.one.workspaces({
            from: r.categories.workspaceId,
            to: r.workspaces.id,
        }),
        subcategories: r.many.subcategories(),
        offers: r.many.offers(),
    },
    subcategories: {
        workspace: r.one.workspaces({
            from: r.subcategories.workspaceId,
            to: r.workspaces.id,
        }),
        category: r.one.categories({
            from: r.subcategories.categoryId,
            to: r.categories.id,
        }),
        offers: r.many.offers(),
    },
    addresses: {
        shops: r.many.shops(),
    },
    geolocations: {
        shops: r.many.shops(),
    },
    shops: {
        address: r.one.addresses({
            from: r.shops.addressId,
            to: r.addresses.id,
        }),
        geolocation: r.one.geolocations({
            from: r.shops.geolocationId,
            to: r.geolocations.id,
        }),
        workspace: r.one.workspaces({
            from: r.shops.workspaceId,
            to: r.workspaces.id,
        }),
        offers: r.many.offers(),
        schedules: r.many.schedules(),
        exceptions: r.many.exceptions(),
        cartItems: r.many.cartItems(),
        schedulingResources: r.many.schedulingResources(),
    },
    schedules: {
        shop: r.one.shops({
            from: r.schedules.shopId,
            to: r.shops.id,
        }),
        timeSlots: r.many.scheduleTimeSlots(),
    },
    scheduleTimeSlots: {
        schedule: r.one.schedules({
            from: r.scheduleTimeSlots.scheduleId,
            to: r.schedules.id,
        }),
    },
    exceptions: {
        shop: r.one.shops({
            from: r.exceptions.shopId,
            to: r.shops.id,
        }),
        timeSlots: r.many.exceptionTimeSlots(),
    },
    exceptionTimeSlots: {
        exception: r.one.exceptions({
            from: r.exceptionTimeSlots.exceptionId,
            to: r.exceptions.id,
        }),
    },
    offers: {
        category: r.one.categories({
            from: r.offers.categoryId,
            to: r.categories.id,
        }),
        subcategory: r.one.subcategories({
            from: r.offers.subcategoryId,
            to: r.subcategories.id,
        }),
        workspace: r.one.workspaces({
            from: r.offers.workspaceId,
            to: r.workspaces.id,
        }),
        shops: r.many.shops({
            from: r.offers.id.through(r.shopOffers.offerId),
            to: r.shops.id.through(r.shopOffers.shopId),
        }),
        images: r.many.offerImages(),
        optionGroups: r.many.optionGroups({
            from: r.offers.id.through(r.offerOptionGroups.offerId),
            to: r.optionGroups.id.through(r.offerOptionGroups.optionGroupId),
        }),
        cartItems: r.many.cartItems(),
        appointments: r.many.appointments(),
    },
    offerImages: {
        offer: r.one.offers({
            from: r.offerImages.offerId,
            to: r.offers.id,
        }),
    },
    optionGroups: {
        offers: r.many.offers(),
        options: r.many.options(),
        cartItemOptions: r.many.cartItemOptions(),
    },
    options: {
        optionGroup: r.one.optionGroups({
            from: r.options.optionGroupId,
            to: r.optionGroups.id,
        }),
    },
    carts: {
        user: r.one.users({
            from: r.carts.userId,
            to: r.users.id,
        }),
        items: r.many.cartItems(),
    },
    cartItems: {
        cart: r.one.carts({
            from: r.cartItems.cartId,
            to: r.carts.id,
        }),
        offer: r.one.offers({
            from: r.cartItems.offerId,
            to: r.offers.id,
        }),
        shop: r.one.shops({
            from: r.cartItems.shopId,
            to: r.shops.id,
        }),
        cartItemOptions: r.many.cartItemOptions(),
    },
    cartItemOptions: {
        cartItem: r.one.cartItems({
            from: r.cartItemOptions.cartItemId,
            to: r.cartItems.id,
        }),
        optionGroup: r.one.optionGroups({
            from: r.cartItemOptions.optionGroupId,
            to: r.optionGroups.id,
        }),
        option: r.one.options({
            from: r.cartItemOptions.optionId,
            to: r.options.id,
        }),
    },
    schedulingResources: {
        shop: r.one.shops({
            from: r.schedulingResources.shopId,
            to: r.shops.id,
        }),
        providerResources: r.many.providerResources(),
        capacityResources: r.many.capacityResources(),
        availabilities: r.many.availabilities(),
        appointments: r.many.appointments(),
    },
    providerResources: {
        resource: r.one.schedulingResources({
            from: r.providerResources.resourceId,
            to: r.schedulingResources.id,
        }),
    },
    capacityResources: {
        resource: r.one.schedulingResources({
            from: r.capacityResources.resourceId,
            to: r.schedulingResources.id,
        }),
    },
    availabilities: {
        resource: r.one.schedulingResources({
            from: r.availabilities.resourceId,
            to: r.schedulingResources.id,
        }),
    },
    appointments: {
        client: r.one.users({
            from: r.appointments.clientId,
            to: r.users.id,
        }),
        resource: r.one.schedulingResources({
            from: r.appointments.resourceId,
            to: r.schedulingResources.id,
        }),
        offer: r.one.offers({
            from: r.appointments.offerId,
            to: r.offers.id,
        }),
    },
    waitlists: {
        client: r.one.users({
            from: r.waitlists.clientId,
            to: r.users.id,
        }),
        resource: r.one.schedulingResources({
            from: r.waitlists.resourceId,
            to: r.schedulingResources.id,
        }),
        offer: r.one.offers({
            from: r.waitlists.offerId,
            to: r.offers.id,
        }),
    },
}));
