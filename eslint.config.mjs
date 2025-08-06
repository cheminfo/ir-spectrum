import cheminfo from 'eslint-config-cheminfo';

export default [
  ...cheminfo,
  {
    rules: {
      'import/extensions': ['error', 'always'],
    },
  },
];
