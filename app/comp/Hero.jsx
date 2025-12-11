import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="bg-white relative shadow translate-y-[-30px]">
      <svg
        wstrokewidth="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 490"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150 absolute top-0"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#0693e3"></stop>
            <stop offset="95%" stopColor="#8ED1FC"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,500 L 0,125 C 97.92857142857142,95.125 195.85714285714283,65.24999999999999 321,68 C 446.14285714285717,70.75000000000001 598.5000000000001,106.12500000000003 732,160 C 865.4999999999999,213.87499999999997 980.1428571428571,286.25 1095,321 C 1209.857142857143,355.75 1324.9285714285716,352.875 1440,350 L 1440,500 L 0,500 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 250)"
        ></path>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#0693e3"></stop>
            <stop offset="95%" stopColor="#8ED1FC"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,500 L 0,291 C 143.57142857142858,266.55357142857144 287.14285714285717,242.10714285714283 390,257 C 492.85714285714283,271.89285714285717 555,326.12499999999994 674,365 C 793,403.87500000000006 968.8571428571429,427.3928571428572 1106,450 C 1243.142857142857,472.6071428571428 1341.5714285714284,494.3035714285714 1440,516 L 1440,500 L 0,500 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
          transform="rotate(-180 720 250)"
        ></path>
      </svg>
      <div className="p-2 py-5 pt-18 text-2xl drop-shadow-2xl  flex flex-wrap justify-center items-center ">
        <div className=" w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div className="text-sm w-full text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
          deleniti.
        </div>
        <div
          className=" text-white text-sm p-2 
        rounded
        mt-5
         bg-gradient-to-br from-sky-700 to-sky-500
        "
        >
          <Link href={"/"}>Order Now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
