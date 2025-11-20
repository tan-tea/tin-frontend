import { formatISO, } from 'date-fns';

import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Offer } from '../../domain/Offer';
import { OfferId } from '../../domain/value-object/OfferId';
import { OfferRepository } from '../../domain/OfferRepository';

export class SupabaseOfferRepository extends SupabaseRepository<Offer> implements OfferRepository {
    async getOffers(): Promise<Array<Offer>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository.select('*');

        if (error && !data) return [];

        return data.map(d => this.formatResult(d));
    }

    async getOfferById(id: OfferId): Promise<Offer | null> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('id', id.value)
            .eq('is_active', true)
            .single();

        if (error && !data) return null;

        return this.formatResult(data);
    }

    async getOffersByShopId(shopId: ExternalId): Promise<Array<Offer>> {
        const repository = await this.from();

        const now = formatISO(new Date());

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('shop_id', shopId.value)
            .lte('start_date', now)
            .gte('end_date', now)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error && !data) return [];

        return data.map(d => this.formatResult(d));
    }

    async getOffersByCategoryId(categoryId: ExternalId): Promise<Array<Offer>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('category_id', categoryId.value);

        if (error && !data) return [];

        return data.map(d => this.formatResult(d));
    }

    protected entityName(): string {
        return 'offers';
    }

    private formatResult(data: any): Offer {
        const result = this.parseObjectToCamelCase(data);
        return Offer.fromPrimitives({
            ...result,
            banner: result.banner || '/images/blank.svg',
            startDate: new Date(result.startDate),
            endDate: new Date(result.endDate),
            createdAt: new Date(result.createdAt),
            updatedAt: new Date(result.updatedAt),
        });
    }
}
