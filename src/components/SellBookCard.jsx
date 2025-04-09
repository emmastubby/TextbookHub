import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SellBookCard = ({
  picture,
  title,
  edition,
  author,
  price,
  condition,
  bookId,
}) => {
  const navigate = useNavigate();
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
        <p className="text-gray-500 mt-1">{condition} condition</p>
      </div>
      <div className="p-4 pt-2">
        <button
          className="w-full bg-yellow-500 text-white py-2 px-4 mr-1 rounded-lg hover:bg-yellow-600 transition"
          onClick={() => {
            navigate(`edit?bookId=${bookId}`);
          }}
        >
          Edit Listing
          <Edit className="ml-4 mb-1"></Edit>
        </button>
      </div>
    </div>
  );
};

export default SellBookCard;
