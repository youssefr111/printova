import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import QuantitySelector from '../ui/QuantitySelector';

const CartItem = ({ item, updateCartItemQuantity, removeCartItem }) => {
    const [partImg, setPartImg] = useState(null);

    useEffect(() => {
        if (!item) return;

        import(`../../assets/parts/${item.partName}.png`)
        .then(module => setPartImg(module.default))
        .catch(() => {
            import(`../../assets/unknown.png`)
            .then(module => setPartImg(module.default));
        });
    }, [item]);

  return (
    <>
        <li className="flex flex-col lg:flex-row gap-4 mb-4">
            <img src={partImg} alt="" className="size-22 lg:size-32 self-center lg:self-start rounded-sm object-contain" />

            <div className='flex flex-col lg:flex-row justify-center lg:items-center lg:justify-evenly'>
                <div className='text-sm lg:text-base lg:mr-10 self-center lg:self-start items-center lg:items-start'>
                    <h3 className=" text-gray-900">{item.partName}</h3>

                    <dl className="mt-0.5 space-y-px text-gray-600">
                        <div className='text-xs lg:text-sm'>
                            <dt className="inline">Price: </dt>
                            <dd className="inline">{item.unitPrice} EGP</dd>
                        </div>

                        <div className='mt-1 text-xs lg:text-sm'>
                            <dt className="inline">Total: </dt>
                            <dd className="inline">{item.totalPrice} EGP</dd>
                        </div>
                    </dl>
                </div>

                <div className="flex mt-4 lg:mt-0 lg:flex-row items-center gap-2 lg:ml-20">
                    <QuantitySelector
                        value={item.quantity}
                        onChange={(newQty) => updateCartItemQuantity(item.partId, newQty)}
                        min={1}
                    />
                    <MdDelete
                        className="text-gray-600 transition hover:text-red-600 cursor-pointer size-5"
                        onClick={() => removeCartItem(item.partId)}
                    />
                </div>
            </div>
        </li>
    </>
  )
}

export default CartItem;