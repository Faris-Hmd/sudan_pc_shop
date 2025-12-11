import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="h-70 w-full bg-[#0006] relative translate-y-[-30px]">
      <Image
        className="object-cover   blur-xs z-[-999]"
        fill
        alt="Hero"
        src={
          "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/istockphoto-519502072-612x612.jpg"
        }
      />
      <div className="ps-2  pt-20 text-white text-2xl drop-shadow-2xl  flex flex-wrap justify-center items-center ">
        <div className=" w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div className="text-xs w-full text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
          deleniti.
        </div>
        <div
          className=" text-white text-sm p-2 
        rounded
        mt-5
         bg-gradient-to-br from-sky-700 to-sky-400
        "
        >
          <Link href={"/"}>Order Now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
