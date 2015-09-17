#!/bin/bash
npm run build:clean \
  && npm run build:env \
  && npm run build:uglify \
  && npm run build:copy
