import type { InferSelectModel } from 'drizzle-orm';

import { geolocations } from 'lib/db/schema';

export interface Geolocation extends InferSelectModel<typeof geolocations> {}
