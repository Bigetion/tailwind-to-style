const fontFamily = {
  fontCustom: {
    regex: /^font-\[([^\]]+)\]$/,
    cssProp: "font-family",
    formatter: (value) => {
      // Decode URL-encoded value first (in case it comes from bracket encoding)
      const decodedValue = decodeURIComponent(
        value.replace(/__P__/g, "(").replace(/__C__/g, ")")
      );

      // Split by comma and process each font
      const fonts = decodedValue.split(",").map((font) => {
        let trimmedFont = font.trim();
        
        // Replace underscores with spaces (Tailwind convention)
        trimmedFont = trimmedFont.replace(/_/g, " ");

        // If font contains spaces and is not already quoted, add quotes
        if (
          trimmedFont.includes(" ") &&
          !trimmedFont.startsWith('"') &&
          !trimmedFont.startsWith("'")
        ) {
          return `"${trimmedFont}"`;
        }

        return trimmedFont;
      });

      return fonts.join(", ");
    },
  },
};

export default fontFamily;
