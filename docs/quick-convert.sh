#!/bin/bash

# Quick markdown to HTML converter
# Converts all documentation markdown files to standalone HTML

echo "Converting markdown files to HTML..."

cd "$(dirname "$0")"

# List of files to convert
files=(
    "README"
    "INDEX"
    "00-testing"
    "01-getting-started"
    "02-dom"
    "03-objects"
    "04-react"
    "05-api"
    "06-python"
    "07-flask"
)

# Convert each file
for file in "${files[@]}"; do
    if [ -f "${file}.md" ]; then
        echo "Converting ${file}.md..."
        
        # Use pandoc with GitHub-flavored markdown
        pandoc "${file}.md" \
            -f gfm \
            -t html5 \
            -o "${file}.html" \
            --standalone \
            --css="style.css" \
            --css="doc-style.css" \
            --highlight-style=atom-one-dark \
            --metadata title="${file} | EvolveU Documentation" \
            --include-in-header=<(cat <<'EOF'
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
EOF
) \
            --include-before-body=<(cat <<'EOF'
<body class="doc-page">
<nav class="navbar">
    <div class="container">
        <div class="nav-brand">
            <a href="index.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
                <span class="logo">📚</span>
                <span class="brand-text">EvolveU Docs</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="index.html" class="nav-link">Home</a>
            <a href="INDEX.html" class="nav-link">All Modules</a>
            <a href="https://github.com/brennanbrown/evolveu" target="_blank" class="nav-link">GitHub</a>
            <a href="https://brennanbrown.ca" target="_blank" class="btn btn-primary">Portfolio</a>
        </div>
    </div>
</nav>
<div class="doc-container">
    <aside class="doc-sidebar">
        <h3>Modules</h3>
        <nav class="doc-nav">
            <a href="00-testing.html" class="doc-nav-link">00 - Testing Fundamentals</a>
            <a href="01-getting-started.html" class="doc-nav-link">01 - Getting Started</a>
            <a href="02-dom.html" class="doc-nav-link">02 - DOM Manipulation</a>
            <a href="03-objects.html" class="doc-nav-link">03 - Objects & APIs</a>
            <a href="04-react.html" class="doc-nav-link">04 - React Applications</a>
            <a href="05-api.html" class="doc-nav-link">05 - Flask API Server</a>
            <a href="06-python.html" class="doc-nav-link">06 - Python Fundamentals</a>
            <a href="07-flask.html" class="doc-nav-link">07 - Flask Full-Stack</a>
        </nav>
        <h3 style="margin-top: 2rem;">Resources</h3>
        <nav class="doc-nav">
            <a href="README.html" class="doc-nav-link">Getting Started</a>
            <a href="INDEX.html" class="doc-nav-link">Documentation Index</a>
        </nav>
    </aside>
    <main class="doc-content">
        <article class="markdown-body">
EOF
) \
            --include-after-body=<(cat <<'EOF'
        </article>
    </main>
</div>
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <h4>EvolveU Documentation</h4>
                <p>Comprehensive full-stack web development bootcamp documentation.</p>
            </div>
            <div class="footer-col">
                <h4>Links</h4>
                <ul class="footer-links">
                    <li><a href="https://brennanbrown.ca" target="_blank">Portfolio</a></li>
                    <li><a href="https://brennanbrown.ca/Resume.pdf" target="_blank">Resume</a></li>
                    <li><a href="https://github.com/brennanbrown" target="_blank">GitHub</a></li>
                    <li><a href="https://berryhouse.ca" target="_blank">BerryHouse</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Brennan Brown. Built with ❤️ for the developer community.</p>
        </div>
    </div>
</footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="script.js"></script>
<script>hljs.highlightAll();</script>
</body>
EOF
)
        
        echo "✓ Created ${file}.html"
    else
        echo "⚠ Skipping ${file}.md (not found)"
    fi
done

echo ""
echo "✅ Conversion complete!"
echo ""
echo "HTML files created for all modules."
echo "You can now commit and push these files."
