import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { BsHeartbreakFill } from "react-icons/bs";
import { GiRose } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DeclarationOfLove from "../assets/undraw_declaration-of-love_8v0n.svg";

const Question = ({
  setUnacceptableResponse,
  setSenderInfo,
  setAcceptableResponse,
}: {
  setUnacceptableResponse: (showModal: boolean) => void;
  setSenderInfo: (message: string, name: string) => void;
  setAcceptableResponse: (isAcceptable: boolean) => void;
}) => {
  const { messageToken } = useParams();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [areButtonsActive, setAreButtonsActive] = useState(false);

  useEffect(() => {
    const validateAndDecodeToken = () => {
      try {
        // Check if token exists
        if (!messageToken) {
          navigate("/", { replace: true });
          return;
        }

        // Decode token
        const decodedToken = jwtDecode<{
          name: string;
          recipient: string;
          message: string;
          iat: number;
        }>(messageToken);

        // Validate token structure
        if (
          !decodedToken.name ||
          !decodedToken.recipient ||
          !decodedToken.message
        ) {
          throw new Error("Invalid token structure");
        }

        // Set state
        setRecipient(decodedToken.recipient);
        setSenderInfo(decodedToken.message, decodedToken.name);
        setError(null);
      } catch (err) {
        console.error("Token validation error:", err);
        setError(err instanceof Error ? err.message : "Invalid token");

        // Redirect to home after a brief delay to show error
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    validateAndDecodeToken();
  }, [messageToken, navigate]);

  useGSAP(
    () => {
      if (!isLoading && !error) {
        gsap.from("#question", {
          y: -40,
          opacity: 0,
          duration: 2,
          onComplete: () => {
            setAreButtonsActive(true);
          },
        });
        
        gsap.from("#questionIllustration", {
          y: 40,
          opacity: 0,
          duration: 2.5,
          onComplete: () => {
            setAreButtonsActive(true);
          },
        });
      }
    },
    { dependencies: [isLoading, error] },
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <AiOutlineLoading className="size-6 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return <div className="text-white">Error: {error}. Redirecting...</div>;
  }

  console.log(areButtonsActive);

  return (
    <>
      <div
        id="question"
        className="relative container mx-auto flex flex-col items-center justify-center gap-6 px-4 pt-28 pb-10 md:py-28"
      >
        <GiRose className="size-16 text-white" />
        <h1 className="rounded-md border border-dashed border-white p-5 text-center text-2xl font-bold">
          {recipient}, will you be my Valentine?
        </h1>
        <div className="mt-10 flex w-full max-w-xs items-center justify-between gap-2 md:max-w-md">
          <button
            className={`flex items-center justify-center gap-2 rounded-md border-2 border-white bg-white px-8 py-2 text-xl text-red-700 ${areButtonsActive ? "hover:cursor-pointer hover:border-white hover:bg-red-700 hover:text-white" : "hover:cursor-not-allowed"}`}
            disabled={!areButtonsActive}
            onClick={() => setAcceptableResponse(true)}
          >
            Yes <BiHeart className="size-6" />
          </button>
          <button
            className={`flex items-center justify-center gap-2 rounded-md border-2 border-white bg-white px-8 py-2 text-xl text-red-700 ${areButtonsActive ? "hover:cursor-pointer hover:border-white hover:bg-red-700 hover:text-white" : "hover:cursor-not-allowed"}`}
            disabled={!areButtonsActive}
            onClick={() => setUnacceptableResponse(true)}
          >
            No <BsHeartbreakFill className="size-5" />
          </button>
        </div>
      </div>
      <div id="questionIllustration" className="flex w-full items-center justify-center">
        <img src={DeclarationOfLove} className="h-96 w-full" alt="Declaration of love" />
      </div>
    </>
  );
};

export default Question;
