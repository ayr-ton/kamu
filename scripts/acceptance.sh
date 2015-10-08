# start selenium
./node_modules/protractor/bin/webdriver-manager update;
./node_modules/protractor/bin/webdriver-manager start > /dev/null 2>&1 &

# run the build
npm run test:protractor
