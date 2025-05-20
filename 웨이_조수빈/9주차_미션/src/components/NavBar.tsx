import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { useEffect } from 'react';
import { calculateTotal } from '../slices/cartSlice';


const NavBar = () => {
  const {amount, cartItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-5'>
      <h1 className='text-2xl font-semibold' onClick={() => {window.location.href = '/'}}>Way</h1>
      <div className='flex items-center space-x-2'>
        <FaShoppingCart className='text-2xl' />
        <span className='text-white text-xl'>{amount}</span>
      </div>
    </div>
  )
}

export default NavBar
