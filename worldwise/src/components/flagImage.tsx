import React from "react";
import { getFlagImageUrl } from "../utils/getFlagImageUrl";

interface FlagImageProps {
  countryCode: string;
}

const FlagImage: React.FC<FlagImageProps> = ({ countryCode }) => {
  const flagImageUrl = getFlagImageUrl(countryCode);

  return (
    <div>
      <img
        src={flagImageUrl}
        srcSet={`${flagImageUrl} 2x, ${flagImageUrl} 3x`}
        width="23"
        height="16"
        alt={countryCode}
      />
    </div>
  );
};

export default FlagImage;
