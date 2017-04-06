# https://devcenter.heroku.com/articles/profiled

# add xmlsec1 binary and libraries to the appropriate paths
LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/app/.heroku/xmlsec1-1.2/lib/"
PATH="$PATH:/app/.heroku/xmlsec1-1.2/bin/"