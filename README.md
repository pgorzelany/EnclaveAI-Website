# EnclaveAI-Website
Website for the Enclave AI apps

## Setup Instructions

### Prerequisites
- Ruby (check version with `ruby --version`)
- RubyGems (included with Ruby)
- GCC and Make (for some gem installations)

### Installation

1. Install Jekyll and Bundler:

```bash
gem install jekyll
```

2. Install project dependencies:

```bash
bundle install
```

### Running the Website

Start the development server:
```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

### Development Options

- Live reload (automatically refresh on changes):
```bash
bundle exec jekyll serve --livereload
```

- Include draft posts:
```bash
bundle exec jekyll serve --draft
```

### Troubleshooting

- If `bundle install` fails, try:
  - Deleting `Gemfile.lock` and running `bundle install` again
  - Running `gem update --system`
  - Installing missing dependencies with your system's package manager

- For port conflicts, specify a different port:
```bash
bundle exec jekyll serve --port 4001
```
