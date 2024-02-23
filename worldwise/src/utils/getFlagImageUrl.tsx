import countryCodes from "../../data/countryCodes.json";

export interface CountryCodes {
  [key: string]: string;
}

export const getFlagImageUrl = (countryName: string) => {
  const countryCode = (countryCodes as CountryCodes)[countryName];

  return `https://flagcdn.com/16x12/${countryCode}.png`;
};
