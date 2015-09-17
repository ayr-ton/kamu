for file in $(find ./app/scripts -name '*.js');
do
  dest=${file/\.\/app\//\.tmp/}
  mkdir -p `dirname $dest`
  ng-annotate -ar $file > $dest
done

uglifyjs -c -m \
  -o ./dist/scripts/app.min.js \
  --source-map=./dist/scripts/app.min.js.map \
  --source-map-url=./app.min.js.map \
  --source-map-include-sources \
  -- .tmp/scripts/config.js .tmp/scripts/app.js .tmp/scripts/**/*.js
