import {
    DISCORD_CDN,
    AVAILABLE_EXTENSIONS,
} from 'lib/utils/constants';

export function getDiscordAssetExtension(asset: string): string {
    const isGif = asset.startsWith('a_');
    return isGif
        ? AVAILABLE_EXTENSIONS['gif']
        : AVAILABLE_EXTENSIONS['photo']
}

export function getDiscordAvatar(user: any): string {
    if (!user) return '';

    const avatarExtension = getDiscordAssetExtension(user.avatar);

    const result = [
        DISCORD_CDN,
        '/avatars',
        `/${user.id}`,
        `/${user.avatar}`,
        `${avatarExtension}`,
    ];

    return result.join('');
}

export function getDiscordBanner(user: any): string {
    if (!user) return '';

    const bannerExtension = getDiscordAssetExtension(user?.banner);

    const result = [
        DISCORD_CDN,
        '/banners',
        `/${user.id}`,
        `/${user.banner}`,
        `${bannerExtension}`,
    ];

    return result.join('');
}
