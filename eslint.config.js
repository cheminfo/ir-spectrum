import { defineConfig, globalIgnores } from 'eslint/config';
import cheminfo from 'eslint-config-cheminfo-typescript';

export default defineConfig(globalIgnores(['coverage', 'lib']), cheminfo, {
  files: ['**/*.test.ts'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
});
