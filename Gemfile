source "https://rubygems.org"

# Use github-pages gem to match GitHub Pages environment
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.7"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end 