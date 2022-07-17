import bottle from '../../Assets/bottle.svg';
import womenCart from '../../Assets/women_with_cart.svg';
import heart from '../../Assets/heart.svg';
import { Link, NavLink } from 'react-router-dom';

const Navbar_icons=[
  {
  "path":"/shop",
  "icon":"list",
  "tooltip":"Items"
  },
  {
  "path":"/shop/history",
  "icon":"history",
  "tooltip":"History"
  },
  {
  "path":"/shop/analytics",
  "icon":"insert_chart_outlined",
  "tooltip":"Analytics"
  }
];

export const Shopnav=()=>{
  return (
  <div className="min-h-full flex-shrink-0 w-16 md:w-20 flex-col flex justify-between items-center bg-white shadow-md">
  
  <Link className='block my-8'>
  <img src={heart} alt="not found" className='w-12 aspect-square' loading='lazy'/>
  </Link>

  <ul className='flex flex-col box-border w-full p-0 m-0'>
   
   {Navbar_icons.map(({path,icon,tooltip},index)=>(
    <NavLink to={`${path}`} exact className="group md:my-8 my-5 relative before:m-0 before:p-0 before:content-[''] before:absolute before:min-h-full before:w-2 before:bg-shop-orange before:-left-1 before:opacity-0 before:rounded-lg" key={index} activeClassName="before:opacity-100">
    <span className='material-icons  text-shop-tooltip relative text-4xl md:text-3xl py-1 md:py-2 font-thin block text-center'>{icon}</span>
    <span data-text={`${tooltip}`} className="absolute text-sm top-[30%] left-[95%]  bg-shop-tooltip text-white rounded-sm before:absolute before:content-[''] before:aspect-square before:h-[60%] px-1 before:-left-1 before:top-1 before:-z-10 before:rotate-45 before:bg-shop-tooltip hidden group-hover:block after:content-[attr(data-text)]"></span>
    </NavLink>
   ))}

  </ul>

  <Link className='block my-8' to="/">
  <span class="material-icons-outlined">logout</span>
  </Link>
  </div>
  );
};