#!/usr/bin/env python3
"""Remove broken calculator bar + Latest Updates banner from Privacy pages."""
import re, os, glob

root = '/Users/mjaswanth/shram'
count = 0

for fpath in sorted(glob.glob(os.path.join(root, 'Privacy', '*.html'))):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Global Strategic Assessment' not in content and '🧮' not in content:
        continue
    
    original = content
    
    # Remove the broken calculator/notification bar between </header> and <!-- Latest Updates Banner -->
    # Pattern: after </header> there's junk HTML (</div>, container, 🧮, broken button, etc.)
    content = re.sub(
        r'(</header>)\s*\n\s*</div>\s*\n\s*<div class="container mx-auto relative z-10">[\s\S]*?</div>\s*\n\s*</div>\s*\n\s*</div>',
        r'\1',
        content
    )
    
    # Remove the Latest Updates Banner
    content = re.sub(
        r'\s*<!-- Latest Updates Banner -->[\s\S]*?</div>\s*\n\s*</div>\s*\n\s*</div>\s*\n',
        '\n',
        content
    )
    
    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"  Cleaned: {os.path.relpath(fpath, root)}")

print(f"\nCleaned {count} files")
