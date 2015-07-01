Empty project template

### Note on the gulpfile CSS tasks
minify-less, minify-sass, merge-css do this:
1. Minify the less file into css
2. Minify the sass (style.scss) into css (the is only one file as the rest are imported in order at the top of style.scss)
3. Concat the resulting css files into style.min.css and link that from the index.html

