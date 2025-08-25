
import { useLocation, useNavigate } from "react-router-dom";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

// --- Helper functions for extracting IDs from URLs ---
function getYouTubeId(url: string): string {
    // Handles https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
    const ytMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    return ytMatch ? ytMatch[1] : "";
}

function getTikTokId(url: string): string {
    // Handles https://www.tiktok.com/@user/video/VIDEO_ID
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : "";
}

function getInstagramId(url: string): string {
    // Handles https://www.instagram.com/p/POST_ID/
    const match = url.match(/instagram\.com\/p\/([\w-]+)/);
    return match ? match[1] : "";
}

export const ViewCreator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const creator = location.state?.creator;

    if (!creator) {
        return <div className="text-red-500">No creator data found.</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
            <div className="flex flex-col items-center">
                {creator.imageUrl && (
                    <img src={creator.imageUrl} alt={creator.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                )}
                <h2 className="text-2xl font-bold mb-2">{creator.name}</h2>
                {creator.description && <p className="mb-2 text-gray-700">{creator.description}</p>}
                <div className="flex flex-wrap gap-4 mb-4 w-full justify-center">
                    {/* TikTok Preview */}
                    {creator.tiktokUrl && (
                        <div className="flex flex-col items-center w-64 h-64">
                            <div className="mb-1 flex items-center gap-2">
                                <FaTiktok className="text-blue-500" />
                                <a href={creator.tiktokUrl} target="_blank" rel="noopener noreferrer" className="underline">View on TikTok</a>
                            </div>
                            <iframe
                                src={`https://www.tiktok.com/embed/v2/${getTikTokId(creator.tiktokUrl)}`}
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: '1/1', background: '#000', minHeight: '0', borderRadius: '0.5rem' }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="rounded border w-full h-full object-cover"
                                title="TikTok Preview"
                            />
                        </div>
                    )}
                    {/* YouTube Preview */}
                    {creator.youtubeUrl && (
                        <div className="flex flex-col items-center w-64 h-64">
                            <div className="mb-1 flex items-center gap-2">
                                <FaYoutube className="text-red-500" />
                                <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="underline">View on YouTube</a>
                            </div>
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: '1/1', background: '#000', minHeight: '0', borderRadius: '0.5rem' }}
                                src={`https://www.youtube.com/embed/${getYouTubeId(creator.youtubeUrl)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded border w-full h-full object-cover"
                            />
                        </div>
                    )}
                    {/* Instagram Preview */}
                    {creator.instagramUrl && (
                        <div className="flex flex-col items-center w-64 h-64">
                            <div className="mb-1 flex items-center gap-2">
                                <FaInstagram className="text-pink-500" />
                                <a href={creator.instagramUrl} target="_blank" rel="noopener noreferrer" className="underline">View on Instagram</a>
                            </div>
                            <iframe
                                src={`https://www.instagram.com/p/${getInstagramId(creator.instagramUrl)}/embed`}
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: '1/1', background: '#000', minHeight: '0', borderRadius: '0.5rem' }}
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency={true}
                                allow="encrypted-media"
                                className="rounded border w-full h-full object-cover"
                                title="Instagram Preview"
                            />
                        </div>
                    )}
                </div>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/${encodeURIComponent(creator.name)}/edit`, { state: { creator } })}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};