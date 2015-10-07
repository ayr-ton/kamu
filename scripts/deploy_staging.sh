ssh administrator@kamu-staging.corporate.thoughtworks.com <<EOF
  exports NODE_ENV=staging
  cd /var/www/kamu
  git checkout master
  git pull origin master
  git checkout -f ${GIT_REV}
  npm install --production
  npm run build
  npm run forever
  exit
EOF
