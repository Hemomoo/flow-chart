module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['vue', 'tailwindcss'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [0, { 'packageDir ': './src/' }],
    'max-len': ['error', {
      code: 160,
      ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"', // ignore classes or svg draw attributes
      ignoreUrls: true,
    }],
    'linebreak-style': [0, 'error', 'windows'], // 声明这是windows操作系统即可。
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
  },
  parser: 'vue-eslint-parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
        map: [['@', './src']],
      },
    },
  },
};
