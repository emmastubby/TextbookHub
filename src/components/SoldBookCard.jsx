import { IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';
import { FavoriteBorder } from '@mui/icons-material';

const SoldBookCard = ({picture, title, edition, author, price, condition}) => {
    return (
      <div className="w-80 rounded-lg shadow-lg overflow-hidden bg-white mt-4">
        <img src={picture} className="w-full h-48 object-cover" />
        <div className="p-4 pb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-500 mt-1">{edition}th edition</p>
          <p className="text-gray-500 mt-1">by {author}</p>

          <p className="font-bold mt-2">Asking Price: ${price}</p>
          <hr />
          <p className="text-gray-500 mt-1">Condition: {condition}</p>
        </div>
        <div className="p-4 pt-2">
        <h2 className="text-xl font-bold">
            Sold
            <Check className="ml-4 mb-1"></Check>
            </h2>
        </div>
      </div>
    );
  };

  export default SoldBookCard;