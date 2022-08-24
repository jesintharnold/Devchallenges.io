import { Link } from 'react-router-dom';
import catwiki from '../../Assets/Catwiki.svg';
import catwikilight from '../../Assets/Catwiki_white.svg';
import {LogoutComp} from '../../utils/components/LogoutComp';
export const Header=()=>{
return(
<div className="py-2 pl-2 mb-5 border-2 border-black flex items-center justify-between ">
<Link to="/catwiki">
<img className='w-24 h-8' src={catwiki} alt="Cat-Wiki"/>
</Link>
<div className='flex items-center font-quick text-black text-lg font-bold'>
    <LogoutComp bottom={false} bg={false}/>
</div>
</div>
);
};


export const Footer=()=>{
    return(
    <div className="py-3 bg-black w-full flex items-center justify-between text-white overflow-hidden rounded-t-3xl">
    <img className='w-24 h-8 ml-5' src={catwikilight} alt="Cat-Wiki"/>
    <div className='flex items-center mr-5 gap-2'>&#169;<span className='text-xs'>created by jesinth</span></div>
    </div>
    );
    };