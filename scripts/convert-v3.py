#!/usr/bin/env python3
"""Convert design-handoff-v3 pages/<name>/code.html into Next.js App Router page.tsx files."""
import json
import os
import re
from pathlib import Path
from bs4 import BeautifulSoup, Comment

REPO = Path('/home/ubuntu/fancy-text-site')
DESIGN_DIR = REPO / 'design-handoff-v3'
APP_DIR = REPO / 'app'
ROUTE_MAPPING = DESIGN_DIR / 'route-mapping.json'


def route_to_app_dir(route: str) -> Path:
    if route == '/':
        return APP_DIR
    return APP_DIR / route.lstrip('/')


def kebab_to_camel(name: str) -> str:
    parts = name.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])


ATTR_MAP = {
    'class': 'className',
    'for': 'htmlFor',
    'viewbox': 'viewBox',
    'preserveaspectratio': 'preserveAspectRatio',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'clip-path': 'clipPath',
    'tabindex': 'tabIndex',
    'maxlength': 'maxLength',
    'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus',
    'readonly': 'readOnly',
    'contenteditable': 'contentEditable',
    'spellcheck': 'spellCheck',
    'crossorigin': 'crossOrigin',
    'playsinline': 'playsInline',
    'http-equiv': 'httpEquiv',
    'accept-charset': 'acceptCharset',
    'checked': 'defaultChecked',
    'selected': 'defaultSelected',
    'value': 'defaultValue',
}

BOOL_ATTRS = {
    'checked', 'selected', 'disabled', 'hidden', 'required', 'multiple',
    'autofocus', 'readonly', 'contenteditable', 'spellcheck', 'playsinline',
}

SELF_CLOSING = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
    'meta', 'param', 'source', 'track', 'wbr',
}


def css_property_to_js(name: str) -> str:
    if name.startswith('--'):
        return name
    return kebab_to_camel(name)


def parse_style(style: str) -> dict:
    result = {}
    for decl in style.split(';'):
        decl = decl.strip()
        if not decl or ':' not in decl:
            continue
        prop, val = decl.split(':', 1)
        prop = prop.strip()
        val = val.strip()
        if not prop:
            continue
        result[css_property_to_js(prop)] = val
    return result


def escape_attr_value(value: str) -> str:
    # Escape for double-quoted JSX attribute
    return value.replace('\\', '\\\\').replace('"', '&quot;')


def attr_to_jsx(name: str, value) -> str:
    if name in ATTR_MAP:
        name = ATTR_MAP[name]
    if isinstance(value, list):
        value = ' '.join(value)
    if value is None:
        return f' {name}'
    if name in ATTR_MAP.values() and name in ('defaultChecked', 'defaultSelected'):
        if value == '' or str(value).lower() == name.replace('default', '').lower():
            return f' {name}'
        if str(value).lower() in ('false', '0'):
            return f' {name}={{false}}'
        return f' {name}={{true}}'
    if name.lower() in BOOL_ATTRS or (name.startswith('default') and name in ('defaultChecked', 'defaultSelected')):
        if value == '' or str(value).lower() == name.lower().replace('default', '') or str(value).lower() == name.lower():
            return f' {name}'
        if str(value).lower() in ('false', '0'):
            return f' {name}={{false}}'
        return f' {name}={{true}}'
    escaped = escape_attr_value(str(value))
    return f' {name}="{escaped}"'


def style_to_jsx(value: str) -> str:
    d = parse_style(value)
    if not d:
        return ''
    items = []
    for k, v in d.items():
        val = v.replace('\\', '\\\\').replace("'", "\\'")
        items.append(f"{k}: '{val}'")
    inner = ", ".join(items)
    return ' style={{' + inner + '}}'


def render_node(node) -> str:
    if isinstance(node, Comment):
        text = str(node).strip()
        return f'{{/* {text} */}}'
    if isinstance(node, str):
        text = node
        text = text.replace('{', '&#123;').replace('}', '&#125;')
        text = text.replace('<', '&lt;').replace('>', '&gt;')
        return text
    if not hasattr(node, 'name') or node.name is None:
        return ''
    tag = node.name
    if tag in ('script', 'style'):
        return ''
    if tag == 'header':
        return ''
    if tag == 'footer':
        return ''

    attrs = []
    for attr, val in node.attrs.items():
        if attr == 'style':
            style_jsx = style_to_jsx(val)
            if style_jsx:
                attrs.append(style_jsx)
        else:
            attrs.append(attr_to_jsx(attr, val))
    attr_str = ''.join(attrs)

    if tag in SELF_CLOSING:
        return f'<{tag}{attr_str} />'

    children = ''.join(render_node(child) for child in node.children)
    return f'<{tag}{attr_str}>{children}</{tag}>'


def convert_page(screen: dict) -> dict:
    route = screen['route']
    file_path = DESIGN_DIR / screen['file']
    html = file_path.read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    head = soup.head
    title = ''
    description = ''
    canonical = ''
    schema = None
    if head:
        title_tag = head.find('title')
        if title_tag:
            title = title_tag.get_text()
        meta_desc = head.find('meta', attrs={'name': 'description'})
        if meta_desc:
            description = meta_desc.get('content', '')
        link_canonical = head.find('link', attrs={'rel': 'canonical'})
        if link_canonical:
            canonical = link_canonical.get('href', '')
        schema_script = head.find('script', attrs={'type': 'application/ld+json'})
        if schema_script and schema_script.string:
            try:
                schema = json.loads(schema_script.string)
            except Exception:
                schema = schema_script.string

    body = soup.body
    if body:
        body_children = ''.join(render_node(child) for child in body.children)
    else:
        body_children = ''.join(render_node(child) for child in soup.children)

    body_children = re.sub(r'>\s+<', '><', body_children)
    body_children = re.sub(r'\n\s*\n', '\n', body_children)

    return {
        'route': route,
        'title': title,
        'description': description,
        'canonical': canonical,
        'schema': schema,
        'body_children': body_children,
    }


def quote_jsx_string(s: str) -> str:
    # Use JSON-like single quoting for JSX string literals
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('\n', '\\n')
    return f"'{s}'"


def write_page(page: dict, indexable: bool) -> None:
    route = page['route']
    app_dir = route_to_app_dir(route)
    app_dir.mkdir(parents=True, exist_ok=True)
    page_path = app_dir / 'page.tsx'

    parts = []
    parts.append("import type { Metadata } from 'next';\n")

    parts.append('export const metadata: Metadata = {')
    if page['title']:
        parts.append(f'  title: {quote_jsx_string(page["title"])},')
    if page['description']:
        parts.append(f'  description: {quote_jsx_string(page["description"])},')
    if page['canonical']:
        parts.append('  alternates: {')
        parts.append(f'    canonical: {quote_jsx_string(page["canonical"])},')
        parts.append('  },')
    if not indexable:
        parts.append('  robots: {')
        parts.append('    index: false,')
        parts.append('  },')
    parts.append('};\n')

    parts.append('export default function Page() {')
    parts.append('  return (')
    parts.append('    <>')
    if page['schema']:
        schema_json = json.dumps(page['schema'], ensure_ascii=False)
        parts.append(f'      <script type="application/ld+json" dangerouslySetInnerHTML={{{{__html: {quote_jsx_string(schema_json)}}}}} />')
    parts.append(page['body_children'])
    parts.append('    </>')
    parts.append('  );')
    parts.append('}\n')

    page_path.write_text('\n'.join(parts), encoding='utf-8')


def main() -> None:
    mapping = json.loads(ROUTE_MAPPING.read_text(encoding='utf-8'))
    if not isinstance(mapping, list):
        mapping = mapping.get('screens', [])
    for screen in mapping:
        route = screen['route']
        indexable = screen.get('indexable', True)
        page = convert_page(screen)
        write_page(page, indexable)
        print(f'Wrote {route} -> app/{route.lstrip("/") or "(home)"}/page.tsx')


if __name__ == '__main__':
    main()
