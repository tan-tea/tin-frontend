import type { InferSelectModel } from 'drizzle-orm';

import { users } from 'lib/db/schema';

export interface User extends InferSelectModel<typeof users> {}
