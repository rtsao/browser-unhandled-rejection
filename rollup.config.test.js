import babel from 'rollup-plugin-babel';

export default {
  entry: 'test/index.js',
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
    {dest: 'dist-test/index.js', format: 'cjs'}
  ]
};
