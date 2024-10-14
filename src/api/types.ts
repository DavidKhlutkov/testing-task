type AvailableCurrency = "BTC" | "ETH" | "EUR" | "PLN" | "RUB" | "USD";

type CurrencyDict = Record<AvailableCurrency, number>;

export type { CurrencyDict, AvailableCurrency };
