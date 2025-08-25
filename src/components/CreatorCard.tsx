// This component displays a card for a content creator, including their name, url, description and image.

import { Card, CardHeader, CardFooter, Image } from "@heroui/react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

export const CreatorCard = ({ creator }: {creator:Creator}) => {
    return (
        <Card isFooterBlurred >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <h4 className="text-white/90 font-medium text-xl">{creator.name}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt={`${creator.name} profile image`}
                className="z-0 w-full h-[350px] w-[350px] object-cover object-center mx-auto rounded-lg"
                src={creator.imageUrl}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">{creator.description}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {creator.tiktokUrl &&
                        <a href={creator.tiktokUrl} target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="w-5 h-5" />
                        </a>
                    }
                    {creator.youtubeUrl &&
                        <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="w-5 h-5" />
                        </a>
                    }
                    {creator.instagramUrl &&
                        <a href={creator.instagramUrl} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="w-5 h-5" />
                        </a>
                    }
                </div>
            </CardFooter>
        </Card>
    );
}
