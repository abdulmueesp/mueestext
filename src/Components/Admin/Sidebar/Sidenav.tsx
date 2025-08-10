import React from "react"
import { Link } from "react-router-dom";

interface Sidenavprops {
    logo:React.ReactNode;
    name:string;
    onclick:()=>void
    selected:Boolean
    link:string;
}

const Sidenav:React.FC<Sidenavprops>=({logo,name,onclick,selected,link}) => {
  return (
    <div>
      <Link to={link}>
      <div className={`w-[55px] lg:w-[220px] h-[50px]  hover:border-2 flex pl-4 items-center space-x-[10px] border rounded-lg ${selected ? "bg-blue-700 text-white":"bg-white text-black"}`} onClick={onclick}>
        {/* logo    */}
        <div>
          {logo}
        </div>
        {/* name  */}

        <div className="hidden lg:block">
          <h1>{name}</h1>
        </div>   
      </div>
      </Link>
    </div>
  )
}

export default Sidenav
