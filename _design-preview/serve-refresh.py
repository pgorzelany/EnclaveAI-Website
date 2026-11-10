"""Build and serve the refreshed Jekyll site beside its saved baseline."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
from threading import Thread
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
PREVIEW = ROOT / '_design-preview'


class PreviewHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if self.server.server_port == 4174 and unquote(urlsplit(path).path).rstrip('/') == '/design-system':
            return str(PREVIEW / 'design-system.html')
        return super().translate_path(path)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Robots-Tag', 'noindex, nofollow')
        super().end_headers()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--skip-build', action='store_true')
    args = parser.parse_args()
    baseline_available = (PREVIEW / 'before/index.html').is_file()
    runtime = PREVIEW / 'runtime.yml'
    runtime.write_text(f'design_baseline: {str(baseline_available).lower()}\n')
    if not args.skip_build:
        subprocess.run(['npm', 'run', 'build:css'], cwd=ROOT, check=True)
        subprocess.run(['bundle', 'exec', 'jekyll', 'build', '--config', '_config.yml,_design-preview/config.yml,_design-preview/runtime.yml', '--destination', '_design-preview/site'], cwd=ROOT, check=True)
    if not (PREVIEW / 'site/index.html').is_file():
        parser.error('No preview build. Run without --skip-build.')
    servers = []
    try:
        outputs = [(4174, PREVIEW / 'site')]
        if baseline_available:
            outputs.append((4175, PREVIEW / 'before'))
        for port, directory in outputs:
            if not (directory / 'index.html').is_file():
                parser.error(f'Missing saved build: {directory}')
            server = ThreadingHTTPServer(('127.0.0.1', port), partial(PreviewHandler, directory=str(directory)))
            servers.append(server)
        if baseline_available:
            Thread(target=servers[1].serve_forever, daemon=True).start()
        print('Refreshed site: http://127.0.0.1:4174/', flush=True)
        if baseline_available:
            print('Saved original: http://127.0.0.1:4175/', flush=True)
        print('Design system: http://127.0.0.1:4174/design-system/', flush=True)
        servers[0].serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        if len(servers) > 1:
            servers[1].shutdown()
        for server in servers:
            server.server_close()
