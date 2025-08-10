import { useState } from "react";
import Sidenav from "../Sidebar/Sidenav";

const Sidebar = () => {
  const [select, Setselect] = useState<Number>(0);

  const handlenavclick = (index: Number) => {
    Setselect(index);
  };
  return (
    <div className="w-[70px] lg:w-[270px] h-[671px] border-x   py-[30px] flex flex-col items-center space-y-7 overflow-y-hidden "style={{backgroundColor:"rgba(244,247,254,255)"}}>
      <Sidenav
        link="#"
        onclick={() => handlenavclick(1)}
        selected={select == 1}
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={select == 1 ? "white" : "black"}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="none"
            className="size-6 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>
        }
        name={"Dashboard"}
      />
      <Sidenav
      link="/admin/course"
        onclick={() => handlenavclick(2)}
        selected={select == 2}
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={select == 2 ? "white" : "black"}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
        }
        name={"course"}
      />

      <Sidenav
      link="/admin/category"
        onclick={() => handlenavclick(3)}
        selected={select == 3}
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={select == 3 ? "white" : "black"}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>
        }
        name={"Category"}
      />
    </div>
  );
};

export default Sidebar;
