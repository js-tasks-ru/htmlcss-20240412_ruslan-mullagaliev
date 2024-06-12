module.exports = {
  syntax: 'postcss-scss',
  map: { inline: true },
  plugins: [
    require('precss')({
      lookup: { disable: true },
      stage: false,
      properties: {
        // Чтобы работали CSS custom properties, а не заменялись на статическое значение.
        disable: true,
        preserve: true,
      },
      path: ['./'],
    }),
    require('postcss-import')({ path: ['./'] }),
    require('postcss-map-get'),
    // require('postcss-nested'),
    // require('autoprefixer'),
    // require('cssnano'),
  ],
};
