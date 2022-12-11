pnpm create vite . --template react-swc-ts
pnpm i sass -D

pnpm i stylelint stylelint-config-standard stylelint-order postcss-html postcss-scss postcss-less sass -D 

pnpm i @babel/core @babel/eslint-parser @babel/preset-react eslint eslint-config-standard eslint-plugin-html eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks -D 


pnpm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-config-standard-with-typescript

pnpm i eslint-config-prettier eslint-plugin-prettier -D

pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D



pnpm i husky -D

pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D

pnpm i -D lint-staged

npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"