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

  const getStockBadge = (qty) => {
    if (qty === 0)  return { label: "Out of Stock", className: "bg-red-100 text-red-600 border border-red-300" };
    if (qty <= 5)   return { label: `Only ${qty} left`, className: "bg-orange-100 text-orange-600 border border-orange-300" };
    if (qty <= 20)  return { label: `${qty} in stock`, className: "bg-yellow-100 text-yellow-600 border border-yellow-300" };
    return          { label: `${qty} in stock`, className: "bg-green-100 text-green-600 border border-green-300" };
  };
  const stockBadge = getStockBadge(part.stockQuantity);

  return (
    <li className='flex flex-col w-64 m-4 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:scale-102 transition-shadow duration-300'>

        <div className='w-full h-48 flex items-center justify-center'>
          <img src={partImg} className='max-h-full max-w-full object-contain' alt={part.partName} />
        </div>

        <div className='flex flex-row flex-wrap justify-between items-center px-4 bg-gray-200 text-gray-600 w-full'>
            <h3 className='font-bold underline wrap-break-words'>{part.categoryName}</h3>
            <h3 className=''>{part.partName}</h3>
        </div>

        <div className='flex flex-col w-full justify-center bg-white dark:bg-black px-2'>  
          <p className='my-2 text-wrap text-black dark:text-white truncate'>
            {part.partDescription ? part.partDescription : "No description available"}
          </p>

          <div className='flex items-center justify-between mt-4 px-2'>
            <p className='text-base font-semibold text-gray-500 dark:text-white'>{part.currentPrice} EGP</p>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stockBadge.className}`}>
              {stockBadge.label}
            </span>
          </div>

          <button className='bg-indigo-500 dark:bg-white m-4 text-white dark:text-black lg:px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-200 transition-colors cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:dark:bg-white' disabled={part.stockQuantity === 0} onClick={() => addToCart(part.partId)}>{part.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}</button>
        </div>

    </li>
  )
}

export default HomeSection;