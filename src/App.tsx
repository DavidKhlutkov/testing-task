import "./App.css";
import styled from "@emotion/styled";
import { Box, Button, Select, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useCurrencyApiRequestHandler } from "./hooks/useCurrencyApiRequestHandler";
import ReverseIcon from "./assets/reverse_icon.svg?react";
import SettingsIcon from "./assets/setting_icon.svg?react";
import ArrowIcon from "./assets/select_arrow.svg?react";
import { AvailableCurrency } from "./api/types";
import { CurrencyConfigIcons } from "./currencyConfigIcons";

function App() {
  // const [count, setCount] = useState(0)
  const {
    currencyOptions,
    selectionCurrency,
    definedValue,
    onValueChange,
    onSelect,
    onSwap,
  } = useCurrencyApiRequestHandler();

  return (
    <Layout>
      <CardWrapper>
        <Toolbar>
          <SubtitleTypography>Swap</SubtitleTypography>
          <Box>
            <SettingsIcon />
          </Box>
        </Toolbar>
        <CardListWrapper>
          <SwitchItem>
            <CurrencySelect
              IconComponent={ArrowIcon}
              renderValue={(e) => (
                <SelectIcon>
                  {CurrencyConfigIcons[selectionCurrency[0]]}
                  {e as string}
                </SelectIcon>
              )}
              value={selectionCurrency[0]}
            >
              {currencyOptions.map((option) => (
                <MenuItem
                  onClick={() => onSelect(option.value as AvailableCurrency, 0)}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </CurrencySelect>
            <CurrencyInput
              onChange={(e) => onValueChange(e.target.value, 0)}
              value={isNaN(definedValue[0]) ? undefined : definedValue[0]}
            />
          </SwitchItem>
          <SwitchItem>
            <CurrencySelect
              IconComponent={ArrowIcon}
              renderValue={(e) => (
                <SelectIcon>
                  {CurrencyConfigIcons[selectionCurrency[0]]}
                  {e as string}
                </SelectIcon>
              )}
              value={selectionCurrency[1]}
            >
              {currencyOptions.map((option) => (
                <MenuItem
                  onClick={() => onSelect(option.value as AvailableCurrency, 1)}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </CurrencySelect>
            <CurrencyInput
              onChange={(e) => onValueChange(e.target.value, 1)}
              value={isNaN(definedValue[1]) ? undefined : definedValue[1]}
            />
          </SwitchItem>
        </CardListWrapper>
        <ReverseButton onClick={onSwap}>
          <ReverseIcon />
        </ReverseButton>
        <CalculationResult>
          <ResultsTypography>
            {" "}
            {`${definedValue[0].toFixed(2)} ${
              selectionCurrency[0]
            } = ${definedValue[1].toFixed(2)} ${selectionCurrency[1]}`}
          </ResultsTypography>
        </CalculationResult>
        <SwapButton onClick={onSwap}>Swap</SwapButton>
      </CardWrapper>
    </Layout>
  );
}

const Layout = styled(Box)({
  backgroundColor: "1B202A",
  width: "100%",
  height: "100%",
});

const SelectIcon = styled(Box)({
  display: "flex",
  gap: "10px",
});

const SwapButton = styled(Button)({
  background: "#C4B454",
  borderRadius: "12px",
  fontFamily: "Montserrat",
  padding: "16px",
  width: "109%",
  color: "white",
});

const CurrencySelect = styled(Select)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    // borderRadius: '12px',
  },
  "& .MuiSelect-select": {
    background: "#252B36",
    borderRadius: "12px",
    padding: "6px 10px",
  },
});

const CalculationResult = styled(Box)({
  display: "flex",
  justifyContent: "end",
  color: "#717A8C",
  width: "100%",
  padding: "12px 0",
});

const CardWrapper = styled(Box)({
  position: "relative",
  background: "#252B36",
  width: "414px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 26px",
});

const SwitchItem = styled(Box)({
  background: "#2B3342",
  width: "109%",
  display: "flex",
  borderRadius: "12px",
  justifyContent: "space-between",
  padding: "0px 18px 42px 18px;",
});

const Toolbar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const CardListWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "92%",
  height: "100%",
  gap: "6px",
});

const CurrencyInput = styled(TextField)({
  "& .MuiInputBase-root": {
    fontFamily: "Montserrat",
    color: "#717A8C",
    textAlign: "end",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    textAlign: "end",
  },
});

const ReverseButton = styled(Button)({
  background: "#2B3342",
  borderRadius: "50%",
  position: "absolute",
  width: "56px",
  height: "56px",
  border: "6px solid #252B36",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  left: 0,
  right: 0,
  top: "31%",
  bottom: 0,
  margin: "0 auto",
});

const SubtitleTypography = styled(Typography)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  lineHeight: "17px",
  color: "#717A8C",
});

const ResultsTypography = styled(Typography)({
  fontFamily: "Montserrat",
  fontSize: "12px",
  lineHeight: "17px",
  color: "#717A8C",
});

/* Swap */

// width: 44px;
// height: 18px;

// font-family: 'Montserrat';
// font-style: normal;
// font-weight: 400;
// font-size: 16px;
// line-height: 17px;
// /* identical to box height, or 107% */
// letter-spacing: -0.205333px;

// color: #717A8C;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

export default App;
