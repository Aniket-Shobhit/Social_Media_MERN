// color design tokens export
export const colorTokens = {
  // Update the grey color palette
  grey: {
    0: "#FFFFFF",
    10: "#F5F5F5",
    50: "#EDEDED",
    100: "#D8D8D8",
    200: "#BDBDBD",
    300: "#A1A1A1",
    400: "#848484",
    500: "#666666",
    600: "#4A4A4A",
    700: "#333333",
    800: "#1D1D1D",
    900: "#0E0E0E",
    1000: "#000000",
  },
  // Update the primary color palette
  primary: {
    50: "#E0F2F7",
    100: "#B3E0F1",
    200: "#80CCEB",
    300: "#4DABE5",
    400: "#1B89DF",
    500: "#0076D9",
    600: "#0057A7",
    700: "#003978",
    800: "#001C49",
    900: "#000B1D",
  },
};
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[100],
              },
              background: {
                default: colorTokens.grey[50],
                alt: colorTokens.grey[0],
                // set alt to very light blue
                // alt: colorTokens.primary[50],
              },
            }),
      },

      typography: {
        fontFamily: ['Kalam', 'cursive'].join(","),
        fontSize: 14,
        h1: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ['Kalam', 'cursive'].join(","),
          fontSize: 14,
        },
      },
    };
  };