import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  "palette": {
    "primary": {
      "main": "#2652cf",
      "contrastText": "#f2f5fc"
    },
    "secondary": {
      "main": "#6363c6",
      "contrastText": "#f3f4fc"
    },
    "success": {
      "main": "#009843",
      "contrastText": "#ecf9ee"
    },
    "warning": {
      "main": "#da9600",
      "contrastText": "#211300"
    },
    "error": {
      "main": "#df2225",
      "contrastText": "#fff0ee"
    },
    "info": {
      "main": "#0081d0",
      "contrastText": "#eaf7ff"
    },
    "background": {
      "default": "#FEF3E2",
      "paper": "#f1f2f4"
    },
    "text": {
      "primary": "#0e141f",
      "secondary": "#545861"
    },
    "divider": "#dfe1e6",
    "mode": "light"
  },
  "spacing": 8,
  "shape": {
    "borderRadius": 4
  }
});

export default theme;