import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  plugins: [
    babel({
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              ie: 9
            }
          }
        ]
      ]
    })
  ],
  targets: [
    {dest: 'dist/bundle.cjs.js', format: 'cjs'},
    {dest: 'dist/bundle.es.js', format: 'es'}
  ]
};
