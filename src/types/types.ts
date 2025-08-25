interface Creator {
    name: string;
    description?: string;
    imageUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
}

interface ShowCreatorsProps {
    data: Creator[];
}