#!/bin/bash

# Simple script to convert markdown files to HTML for GitHub Pages
# This creates standalone HTML files that can be directly viewed

echo "Converting markdown files to HTML..."

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed."
    echo "Install it with: brew install pandoc (macOS) or apt-get install pandoc (Linux)"
    exit 1
fi

# Array of markdown files to convert
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
            --include-before-body=<(cat <<'EOF'
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
EOF
)
        
        echo "✓ Created ${file}.html"
    else
        echo "⚠ Skipping ${file}.md (not found)"
    fi
done

echo ""
echo "Conversion complete!"
echo "You can now open index.html in your browser to preview the site."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Commit and push all files to GitHub"
echo "2. Go to Settings > Pages"
echo "3. Select 'main' branch and '/docs' folder"
echo "4. Click Save"
