// all creators list


import { Link } from "react-router-dom";
import {CreatorCard} from "@/components/CreatorCard";

export const ShowCreators = ({ data }: ShowCreatorsProps) => {
    return (
        <>
            {data && data.length > 0 ? (
                                // creators grid
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {data.map((creator) => (
                                    <Link
                                        key={creator.name}
                                        to={`/${encodeURIComponent(creator.name)}`}
                                        state={{ creator }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <CreatorCard creator={creator} />
                                    </Link>
                                ))}
                                </div>
            ) : (
                <div>
                    <h2>No creators found 🤨.</h2>
                    <p> Click "Add Creator" to add your favorite content creators😀👍</p>
                </div>
            )}
        </>
    );
};
export default ShowCreators;