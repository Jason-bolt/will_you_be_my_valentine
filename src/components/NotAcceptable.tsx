import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { BsHeartbreakFill } from "react-icons/bs";
import gsap from "gsap";

const NotAcceptable = ({
  setUnacceptableResponse,
}: {
  setUnacceptableResponse: (showModal: boolean) => void;
}) => {
  useEffect(() => {
    const id = setTimeout(() => {
      setUnacceptableResponse(false);
    }, 1000 * 2);

    return () => clearTimeout(id);
  }, [setUnacceptableResponse]);

  useGSAP(
    () => {
      gsap.from("#badResponse", {
        y: -40,
        opacity: 0,
        duration: 1,
      });
    },
    { dependencies: [] },
  );

  return (
    // <div
    //   className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    //   onClick={() => setUnacceptableResponse(false)}
    // >
    //   <div className="rounded-xl border-2 border-red-700 bg-white px-10 py-14 text-center text-3xl font-bold text-red-700 shadow-xl">
    //     <h1>Sorry that is unacceptable...🙂‍↔️</h1>
    //     <h1>Try again! 🙂</h1>
    //   </div>
    // </div>

    <div
      id="badResponse"
      className="flex flex-col items-center justify-center gap-5 rounded-xl px-10 py-48 text-center text-3xl font-bold text-white"
    >
      <BsHeartbreakFill className="size-14" />
      <div>
        <h1>Sorry that is unacceptable...🙂‍↔️</h1>
        <h1>Try again! 🙂</h1>
      </div>
    </div>
  );
};

export default NotAcceptable;
