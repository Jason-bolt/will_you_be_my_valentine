import { useState } from "react";
import Question from "../components/Question";
import NotAcceptable from "../components/NotAcceptable";
import AcceptableResponse from "../components/AcceptableResponse";

const ValentineDisplay = () => {
  const [showUnacceptableResponse, setShowUnacceptableResponse] =
    useState(false);
  const [isAcceptableResponse, setIsAcceptableResponse] = useState(false);
  const [senderMessage, setSenderMessage] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");

  const setUnacceptableResponse = (showModal: boolean) => {
    setShowUnacceptableResponse(showModal);
  };

  const setAcceptableResponse = (isAcceptable: boolean) => {
    setIsAcceptableResponse(isAcceptable);
  };

  const setSenderInfo = (message: string, name: string) => {
    setSenderName(name);
    setSenderMessage(message);
  };

  return (
    <section className="min-h-screen">
      {showUnacceptableResponse && (
        <NotAcceptable setUnacceptableResponse={setUnacceptableResponse} />
      )}

      {isAcceptableResponse && (
        <AcceptableResponse
          senderMessage={senderMessage}
          senderName={senderName}
        />
      )}

      {!showUnacceptableResponse && !isAcceptableResponse && (
        <Question
          setUnacceptableResponse={setUnacceptableResponse}
          setSenderInfo={setSenderInfo}
          setAcceptableResponse={setAcceptableResponse}
        />
      )}
    </section>
  );
};

export default ValentineDisplay;
