import { useState } from "react";
import { CiHeart, CiLink } from "react-icons/ci";
import ToolTip from "../components/ToolTip";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCheck, FaHeart } from "react-icons/fa";
import sign from "jwt-encode";
import { AiOutlineLoading } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";

const Home = () => {
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageLink, setMessageLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name.trim() || !recipient.trim() || !message.trim()) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    const data = {
      name,
      recipient,
      message,
      iat: Date.now() / 1000,
    };
    const secret = "your-client-side-secret"; // WARNING: Not for sensitive use

    const jwt = sign(data, secret);
    setMessageLink(`http://localhost:5173/valentine/${jwt}`);
    setIsLoading(false);
  };

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useGSAP(() => {
    const fullHeart = document.getElementById("fullHeart");
    const emptyHeart = document.getElementById("emptyHeart");

    gsap.set(fullHeart, {
      pointerEvents: "none",
    });

    gsap.set(emptyHeart, {
      pointerEvents: "none",
    });

    gsap.fromTo(
      fullHeart,
      {
        scale: 1,
      },
      {
        scale: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
      },
    );

    gsap.fromTo(
      emptyHeart,
      {
        scale: 1,
      },
      {
        scale: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
      },
    );
  });

  return (
    <section className="min-h-screen w-full bg-radial-[at_25%_25%] from-red-700 to-red-900 to-75% text-white">
      <div className="relative container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-20">
        <h1 className="flex items-center justify-center gap-2 text-center text-4xl font-bold">
          Ask the Question <FaHeart className="size-7 text-white" />
        </h1>
        <p className="text-center text-lg">
          Ask that crush of yours to be your Valentine!
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-lg flex-col items-center justify-center gap-5 rounded-xl border-5 border-white/60 bg-red-900 p-5 md:p-10"
        >
          <div className="flex w-full flex-col items-start justify-center gap-2">
            <label htmlFor="name" className="text-sm text-white">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-md bg-white p-2 text-sm text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-2">
            <label htmlFor="recipient" className="text-sm text-white">
              Recipient Name
            </label>
            <input
              id="recipient"
              type="text"
              placeholder="Enter the name of the recipient"
              className="w-full rounded-md bg-white p-2 text-sm text-black"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-2">
            <label htmlFor="message" className="relative text-sm text-white">
              Message to the recipient
              <ToolTip />
            </label>
            <textarea
              id="message"
              rows={8}
              maxLength={600}
              minLength={1}
              placeholder="Enter the message to the recipient"
              className="w-full rounded-md bg-white p-2 text-sm text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-md border-2 bg-white px-4 py-3 text-red-700 hover:cursor-pointer hover:border-2 hover:border-white/60 hover:bg-red-700 hover:text-white"
          >
            Generate link
            {isLoading ? (
              <AiOutlineLoading className="size-6 animate-spin text-red-700 group-hover:text-white" />
            ) : (
              <CiLink className="size-6 text-red-700 group-hover:text-white" />
            )}
          </button>
        </form>

        {messageLink && (
          <button
            onClick={() => handleCopy(messageLink)}
            className="group mt-2 flex w-full max-w-md items-center justify-center gap-2 rounded-md border-2 bg-white px-4 py-3 text-red-700 hover:cursor-pointer hover:border-2 hover:border-white/60 hover:bg-red-700 hover:text-white"
          >
            {isCopied ? "Copied!" : "Copy link"}
            {isCopied ? (
              <FaCheck className="size-6 text-red-700 group-hover:text-white" />
            ) : (
              <BiCopyAlt className="size-6 text-red-700 group-hover:text-white" />
            )}
          </button>
        )}

        <FaHeart
          id="fullHeart"
          className="absolute left-30 hidden size-10 overflow-hidden text-white lg:block"
        />
        <CiHeart
          id="emptyHeart"
          className="absolute right-30 hidden size-10 overflow-hidden text-white lg:block"
        />
      </div>
    </section>
  );
};

export default Home;
