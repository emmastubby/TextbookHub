import { IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

const SellBookCard = ({picture, title, edition, author, price, condition}) => {
    return (
      <div className="w-80 rounded-lg shadow-lg overflow-hidden bg-white mt-4">
        <img src={picture} className="w-full h-48 object-cover" />
        <div className="p-4 pb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-500 mt-1">{edition}th edition</p>
          <p className="text-gray-500 mt-1">by {author}</p>

          <p className="font-bold mt-2">Asking Price: ${price}</p>
          <hr />
          <p className="text-gray-500 mt-1">{condition} condition</p>
        </div>
        <div className="p-4 pt-2">
          <button
            className="w-full bg-yellow-500 text-white py-2 px-4 mr-1 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit Listing
          </button>
        </div>
      </div>
    );
  };

  export default SellBookCard;