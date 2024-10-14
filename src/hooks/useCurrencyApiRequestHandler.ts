// const defineNeededCurrency = ["BTC", "ETH", "EUR", "PLN", "RUB", "USD"];
const initialCurrencyState: CurrencyDict = {
  BTC: 0,
  ETH: 0,
  EUR: 0,
  PLN: 0,
  RUB: 0,
  USD: 0,
};

import { useEffect, useMemo, useRef, useState } from "react";
import { AvailableCurrency, CurrencyDict } from "../api/types";
import { defineNormalisedValue } from "../handlers/defineNormalisedValue";

const tenMinutes = 10 * 60 * 1000;
const pollInterval = 3000;

function useCurrencyApiRequestHandler() {
  const [pollingState, setPollingState] = useState(tenMinutes);
  const saveDefinedValueRef = useRef<[number, number]>([1, 1]);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState(initialCurrencyState);
  const [selectionCurrency, setSelectionCurrency] = useState<
    [AvailableCurrency, AvailableCurrency]
  >(["BTC", "ETH"]);
  const [definedValue, setDefinedValue] = useState<[number, number]>([1, 1]);

  const currencyOptions = useMemo(
    () =>
      Object.keys(currency).map((currencyKey) => ({
        value: currencyKey,
        label: currencyKey,
      })),
    [currency]
  );

  useEffect(() => {
    saveDefinedValueRef.current = definedValue;
  }, [definedValue]);

  useEffect(() => {
    if (!isLoading) {
      setDefinedValue(
        defineNormalisedValue({
          normalisedIndex: 0,
          currentValue: saveDefinedValueRef.current,
          currencies: currency,
          selectionCurrencies: selectionCurrency,
        })
      );
    }
  }, [selectionCurrency, currency, isLoading]);

  useEffect(() => {
    const polling = setInterval(() => {
      setPollingState((prev) => {
        const newTime = prev - pollInterval;

        return newTime <= 0 ? 0 : newTime;
      });
    }, pollInterval);

    return () => {
      clearInterval(polling);
    };
  }, []);

  useEffect(() => {
    const timeChecker = localStorage.getItem("currencies");
    const timestamp = timeChecker ? JSON.parse(timeChecker).timestamp : 0;
    const expiresTime = Date.now() - timestamp;

    setPollingState((prev) => {
      const newTime = prev - expiresTime;

      return newTime <= 0 ? 0 : newTime;
    });
  }, []);

  useEffect(() => {
    const timeChecker = localStorage.getItem("currencies");
    const timestamp = timeChecker ? JSON.parse(timeChecker).timestamp : 0;

    const isTimeExpired = !timestamp || Date.now() - timestamp > tenMinutes;

    if (isTimeExpired || pollingState === 0) {
      setIsLoading(true);
      fetch("https://api.coinbase.com/v2/exchange-rates")
        .then((res) => res.json())
        .then(({ data }) => {
          setCurrency((prev) => {
            const updatedDict = Object.keys(prev).reduce(
              (acc: CurrencyDict, key) => {
                const typedKey = key as keyof CurrencyDict;
                acc[typedKey] = +data?.rates?.[key] || 0;
                return acc;
              },
              {} as CurrencyDict
            );

            localStorage.setItem(
              "currencies",
              JSON.stringify({
                timestamp: Date.now(),
                value: updatedDict,
              })
            );

            return updatedDict;
          });

          setPollingState(tenMinutes);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
          setIsLoading(false);
        });
    } else if (timeChecker) {
      const storedData = JSON.parse(timeChecker);
      setCurrency(storedData.value);
    }
  }, [pollingState]);

  const onSwap = () => {
    setSelectionCurrency((prev) => {
      const clone = [...prev];
      clone.reverse();

      return clone as [AvailableCurrency, AvailableCurrency];
    });

    setDefinedValue((prev) => {
      const clone = [...prev];
      clone.reverse();

      return clone as [number, number];
    });
  };

  const onSelect = (key: AvailableCurrency, index: 0 | 1) => {
    setSelectionCurrency((prev) => {
      const clone = [...prev];
      clone[index] = key;
      return clone as [AvailableCurrency, AvailableCurrency];
    });
  };

  const onValueChange = (value: string, index: 0 | 1) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setDefinedValue((prev) => {
        const clone: [number, number] = [...prev];
        clone[index] = Number(value);

        const newValue = defineNormalisedValue({
          normalisedIndex: index,
          currentValue: clone,
          currencies: currency,
          selectionCurrencies: selectionCurrency,
        });

        return newValue;
      });
    }
  };

  return {
    currencyOptions,
    selectionCurrency,
    onSwap,
    onSelect,
    definedValue,
    onValueChange,
  };
}

export { useCurrencyApiRequestHandler };
