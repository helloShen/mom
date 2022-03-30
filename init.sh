!/bin/zsh

# git
git init
touch .gitignore
ignoreScript='# vscode\n.vscode/\n# npm\npackage-lock.json\nnode_modules/'
echo $ignoreScript > .gitignore

# project
mkdir dist
mkdir -p src/js
mkdir -p src/css
mkdir -p src/assets/img
touch index.html

# dependencies
npm init -y
npm install --save-dev webpack webpack-cli style-loader css-loader inline-source-map html-webpack-plugin babel-loader @babel/core @babel/preset-env

# eslint & airbnb base config
npx install-peerdeps --dev eslint-config-airbnb-base


