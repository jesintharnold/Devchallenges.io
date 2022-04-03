import { Link } from 'react-router-dom';
import catwiki from '../../Assets/Catwiki.svg';
import catwikilight from '../../Assets/Catwiki_white.svg';

export const Header=()=>{
return(
<div className="py-2 pl-2 mb-5">
<Link to="/catwiki">
<img className='w-24 h-8' src={catwiki} alt="Cat-Wiki"/>
</Link>
</div>
);
};


export const Footer=()=>{
    return(
    <div className="py-3 mt-8  bg-black w-full flex items-center justify-between text-white overflow-hidden rounded-t-3xl">
    <img className='w-24 h-8 ml-5' src={catwikilight} alt="Cat-Wiki"/>
    <div className='flex items-center mr-5 gap-2'>&#169;<span className='text-xs'>created by jesinth</span></div>
    </div>
    );
    };