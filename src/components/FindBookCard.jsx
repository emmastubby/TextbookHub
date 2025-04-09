import { IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindBookCard = ({ picture, title, edition, author, price, condition }) => {

    const [isFavorited, setIsFavorited] = useState(false);

    const navigate = useNavigate();

    const toggleFavorite = () => {
        setIsFavorited((prev) => !prev);
    };

    // edition is a number, convert to string. If 1st, 2nd, 3rd, else add "th"
    const editionString = (edition) => {
        if (edition === 1) {
            return "1st";
        } else if (edition === 2) {
            return "2nd";
        } else if (edition === 3) {
            return "3rd";
        } else {
            return `${edition}th`;
        }
    };

    return (
        <div className="min-w-[320px] w-[320px] max-w-[320px] min-h-[429px] h-[429px] rounded-lg shadow-lg overflow-hidden bg-white mt-4">
            <img src={picture} className="w-full h-48 object-cover" />
            <div className="p-4 pb-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-500 mt-1">{editionString(edition)} edition</p>
                <p className="text-gray-500 mt-1">by {author}</p>

                <p className="font-bold mt-2">Asking Price: ${price}</p>
                <hr />
                <p className="text-gray-500 mt-1">Condition:  {condition}</p>
            </div>
            <div className="p-4 pt-2">
                {/* TODO: Navigate to chat with specifc seller */}
                <button
                    className="w-4/5 bg-blue-500 text-white py-2 px-4 mr-1 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate("/messages/")}
                >
                    Message
                    <ChatBubbleOutline className="ml-4"></ChatBubbleOutline>
                </button>
                {/* TODO: Add Book object to favorites list */}
                <IconButton
                    size="large"
                    onClick={toggleFavorite}
                    sx={{ color: isFavorited ? "#F6678A" : "gray" }} // Change color
                >
                    {isFavorited ? <Favorite fontSize="inherit" /> : <FavoriteBorder fontSize="inherit" />}
                </IconButton>
            </div>
        </div>
    );
};

export default FindBookCard;