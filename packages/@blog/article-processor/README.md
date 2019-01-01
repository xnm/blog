# @blog/article

Article Processor


## Concepts

To convert single `*.md` files to to readable api object, we use this module to make markdown file processing.

## Process Overview

> The total process overview might look like below:

1. Create an empty `ArticleContext`
2. Read `ArticleProcessor.ProcessOptions` to determine which parse component should be use
3. Parse and fill `Article` Object and pass to next step. (might be `offline-api-generator`)




## ArticleProcessor.ProcessOptions


