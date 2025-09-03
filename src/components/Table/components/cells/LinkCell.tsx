import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type LinkProps = {
  link: string;
  value: string;
  openInNewTab?: boolean;
  showValueAsLinkIcon?: boolean;
};
const LinkCell: React.FC<LinkProps> = ({
  link,
  value,
  openInNewTab,
  showValueAsLinkIcon,
}) => {
  return (
    <a
      className="text-blue-500 cursor-pointer"
      href={link}
      target={openInNewTab ? "_blank" : "_self"}
    >
      {showValueAsLinkIcon ? <FaExternalLinkAlt /> : value}
    </a>
  );
};

export default LinkCell;
