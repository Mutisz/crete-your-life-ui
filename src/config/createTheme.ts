import { Theme, createMuiTheme } from "@material-ui/core";

// Theme colors http://paletton.com/#uid=73n1g0ksTEB6VRgjRGIHktDP0kQ
const primary = "#179CBB";
const secondary = "#FF8B19";
const background = "#FFFDC8";

const createTheme = (): Theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      },
      background: {
        default: background
      }
    },
    mixins: {
      // Turns off responsive toolbar height
      toolbar: {
        minHeight: 48
      }
    },
    overrides: {
      // Turns off padding modification for card last child
      MuiCardContent: {
        root: {
          "&:last-child": {
            paddingBottom: 16
          }
        }
      }
    }
  });

export default createTheme;
