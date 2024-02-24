export const getFlagImageUrl = (countryCode: string | undefined) => {
  return `https://flagcdn.com/16x12/${
    countryCode ? countryCode.toLowerCase() : ""
  }.png`;
};
