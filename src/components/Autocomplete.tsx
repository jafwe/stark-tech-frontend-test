import SearchIcon from "@/components/SearchIcon";
import { StockOption } from "@/constants/stock-info";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutocompleteProps {
  options: StockOption[];
  onChange: (option: StockOption) => void;
  placeholder?: string;
}

export default function AutocompleteComponent({
  options,
  placeholder,
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
          placeholder={placeholder}
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
