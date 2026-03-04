import { useContext, useState, useEffect } from 'react';
import CartContext from "../../context/CartContext";
import { Link } from 'react-router-dom';

const HomeSection = ({ part }) => {
  const [partImg, setPartImg] = useState(null);

  useEffect(() => {
    import(`../../assets/parts/${part.partName}.png`)
      .then(module => setPartImg(module.default))
      .catch(() => {
        import(`../../assets/unknown.png`)
          .then(module => setPartImg(module.default));
      });
  }, [part.partName]);

  const { addToCart } = useContext(CartContext);

  return (
    <li className='flex flex-col w-64 m-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-102 transition-shadow duration-300'>

        <div className='w-full h-48 flex items-center justify-center'>
          <img src={partImg} className='max-h-full max-w-full object-contain' alt={part.partName} />
        </div>

        <div className='flex flex-row flex-wrap justify-between items-center px-4 bg-gray-200 text-gray-600 w-full'>
            <h3 className='font-bold underline wrap-break-words'>{part.categoryName}</h3>
            <h3 className=''>{part.partName}</h3>
        </div>

        <div className='flex flex-col w-full justify-center bg-white px-2'>
            
            <p className='my-2 text-wrap text-black truncate'>{part.partDescription ? part.partDescription : "No description available"}</p>
            <p className='text-base mt-4 font-semibold text-gray-500'>{part.currentPrice} EGP</p>
            <button className='bg-indigo-500 m-4 text-white lg:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-15 disabled:cursor-default disabled:hover:bg-indigo-500' disabled={part.stockQuantity === 0} onClick={() => addToCart(part.partId)}>Add to Cart</button>
        </div>

    </li>
  )
}

export default HomeSection;