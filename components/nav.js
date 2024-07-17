import {FiLock} from 'react-icons/fi';
import { NavLinks } from '@/components/links';

export const Header = ()=>{
  return(
    <header className="bg-slate-900 sticky top-0 z-[20] mx-auto flex w-full flex-wrap items-center justify-between border-b border-gray-800 p-6 transition-all">
      <div className='flex gap-3 justify-center items-center'>
        <FiLock className="h-6 w-6 text-yellow-500"/>
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AUTH</span>
      </div>
      <NavLinks/>
    </header>
  )
}