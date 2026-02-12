import { FaHeart } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoveImage from "../assets/undraw_happy_fsrv.svg";

const AcceptableResponse = ({
  senderName,
  senderMessage,
}: {
  senderName: string;
  senderMessage: string;
}) => {
  useGSAP(
    () => {
      gsap.from("#greatResponse", {
        y: -40,
        opacity: 0,
        duration: 1,
      });
      gsap.from("#loveImage", {
        y: 40,
        opacity: 0,
        scale: 0.5,
        duration: 2,
      });
    },
    { dependencies: [] },
  );

  return (
    <>
      <div
        id="greatResponse"
        className="flex flex-col items-center justify-center gap-5 rounded-xl px-10 pt-32 pb-10 md:py-32"
      >
        <h1 className="mb-5 text-5xl font-black text-white text-nowrap whitespace-nowrap">Yayyyyy!!!! 😍</h1>
        <div className="w-full max-w-lg skew-2 bg-amber-100 p-5 text-red-700">
          <p className="text-sm">{senderMessage}</p>
          <p className="flex items-center justify-end-safe gap-2 text-xs font-bold text-nowrap whitespace-nowrap">
            {senderName} <FaHeart />
          </p>
        </div>
      </div>
      <img
        id="loveImage"
        src={LoveImage}
        className="h-94 w-full"
        alt="Love illustration"
      />
    </>
  );
};

export default AcceptableResponse;
