import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { StockOption } from "@/constants/stock-info";
import SearchIcon from "@/components/SearchIcon";

interface AutocompleteProps {
  options: StockOption[];
  onChange: (option: StockOption) => void;
}

export default function AutocompleteComponent({
  options,
  onChange,
}: AutocompleteProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            key={`${option.label} (${option.id})`}
          >{`${option.label} (${option.id})`}</li>
        );
      }}
      filterOptions={(options, { inputValue }) => {
        return options.filter(
          ({ label, id }) =>
            label.toLowerCase().includes(inputValue.toLowerCase()) ||
            id.toLowerCase().includes(inputValue.toLowerCase())
        );
      }}
      sx={{
        width: 400,
        backgroundColor: "#FAFAFA",
        "& .MuiOutlinedInput-root": {
          padding: "0 0px 0 8px",
          boxShadow: "inset 0 0 3px 1px #E9E9E9",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "3px",
          borderColor: "#DFDFDF",
        },
        [`& .${autocompleteClasses.popupIndicator}`]: {
          transform: "none",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            input: {
              color: "#434343",
              fontWeight: 600,
              fontSize: 15,
              "&::placeholder": {
                opacity: 1,
              },
            },
          }}
          placeholder={"輸入台股代號，查看公司價值"}
        />
      )}
      popupIcon={<SearchIcon />}
      onChange={(_, value) => {
        if (value) {
          onChange(value);
        }
      }}
    />
  );
}
