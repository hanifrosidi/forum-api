import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import daStyle, { rules } from 'eslint-config-dicodingacademy';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

export default defineConfig([
  {
    plugins: {
      vitest,
    },
  },
  rules: {
    quotes: {
      avoidEscape: true,
    }
  },

  daStyle,
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: { ...vitest.environments.env.globals, ...globals.node } } },
]);