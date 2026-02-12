import { IoMdInformationCircleOutline } from "react-icons/io";

const ToolTip = () => {
  return (
    <IoMdInformationCircleOutline
      className="absolute top-0 -right-5 text-white"
      title="Message cannot be more than 600 characters!"
    />
  );
};

export default ToolTip;
