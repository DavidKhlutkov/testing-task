import { AvailableCurrency, CurrencyDict } from "../api/types";

type DefineNormalisedValueProps = {
  normalisedIndex: 0 | 1;
  currentValue: [number, number];
  selectionCurrencies: [AvailableCurrency, AvailableCurrency];
  currencies: CurrencyDict;
};

function defineNormalisedValue({
  normalisedIndex,
  currentValue,
  currencies,
  selectionCurrencies,
}: DefineNormalisedValueProps): [number, number] {
  const [firstCurrency, secondCurrency] = selectionCurrencies;
  const [firstValue, secondValue] = [
    currencies[firstCurrency],
    currencies[secondCurrency],
  ];

  const normalizationFactor = currentValue[normalisedIndex];
  if (normalisedIndex === 0) {
    const relativeValue = (secondValue / firstValue) * normalizationFactor;
    return [normalizationFactor, relativeValue];
  } else {
    const relativeValue = (firstValue / secondValue) * normalizationFactor;
    return [relativeValue, normalizationFactor];
  }
}

export { defineNormalisedValue };
