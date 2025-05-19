export type DiscordUserAvatarDecorationData = {
    asset: string;
    sku_id: string;
    expires_at: string;
};

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: DiscordUserAvatarDecorationData;
    collectibles: string | null;
    banner_color: string;
    clan: string;
    primary_guild: string;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
    email: string;
    verified: boolean;
};
