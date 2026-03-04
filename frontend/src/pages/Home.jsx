import { useContext } from 'react';
import HomeFeed from '../components/Home/HomeFeed.jsx';
import PartContext from '../context/PartContext.jsx';
import Loading from '../components/General/Loading.jsx';
import Missing from '../components/General/Missing.jsx';

const Home = () => {
    const { parts } = useContext(PartContext);

  return (
    <main className='flex flex-col bg-[#f7f7f8] grow w-full mt-20 dark:bg-[#0e0e10] z-50 font-family-poppins'>
      <HomeFeed parts={parts}/>
    </main>
  )
}

export default Home;