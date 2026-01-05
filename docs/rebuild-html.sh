#!/bin/bash

# Properly rebuild HTML files with full template structure
# This creates beautiful, navigable documentation pages

echo "🔨 Rebuilding HTML documentation pages..."
echo ""

cd "$(dirname "$0")"

# Function to create full HTML page
create_html_page() {
    local md_file="$1"
    local html_file="$2"
    local title="$3"
    
    echo "Converting ${md_file} → ${html_file}..."
    
    # Convert markdown to HTML body
    pandoc "${md_file}" -f gfm -t html --no-highlight > /tmp/body.html
    
    # Create full HTML with template
    cat > "${html_file}" << 'HTMLTEMPLATE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TITLE_PLACEHOLDER | EvolveU Documentation</title>
    <meta name="description" content="EvolveU Full-Stack Bootcamp Documentation">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="doc-style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
</head>
<body class="doc-page">
    <!-- Navigation -->
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
        <!-- Sidebar -->
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

        <!-- Main Content -->
        <main class="doc-content">
            <article class="markdown-body">
HTMLTEMPLATE

    # Insert the converted markdown
    cat /tmp/body.html >> "${html_file}"
    
    # Close the template
    cat >> "${html_file}" << 'HTMLFOOTER'
            </article>
        </main>
    </div>

    <!-- Footer -->
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/python.min.js"></script>
    <script src="script.js"></script>
    <script>hljs.highlightAll();</script>
</body>
</html>
HTMLFOOTER

    # Replace title placeholder
    sed -i '' "s/TITLE_PLACEHOLDER/${title}/g" "${html_file}"
    
    echo "✓ Created ${html_file}"
}

# Convert all module files (NOTE: index.html is the hero landing page - DO NOT overwrite)
create_html_page "README.md" "README.html" "Getting Started"
create_html_page "INDEX.md" "INDEX.html" "Documentation Index"
create_html_page "00-testing.md" "00-testing.html" "Module 00: Testing Fundamentals"
create_html_page "01-getting-started.md" "01-getting-started.html" "Module 01: Getting Started"
create_html_page "02-dom.md" "02-dom.html" "Module 02: DOM Manipulation"
create_html_page "03-objects.md" "03-objects.html" "Module 03: Objects & APIs"
create_html_page "04-react.md" "04-react.html" "Module 04: React Applications"
create_html_page "05-api.md" "05-api.html" "Module 05: Flask API Server"
create_html_page "06-python.md" "06-python.html" "Module 06: Python Fundamentals"
create_html_page "07-flask.md" "07-flask.html" "Module 07: Flask Full-Stack"

# Cleanup
rm -f /tmp/body.html

echo ""
echo "✅ All HTML files rebuilt with proper styling and navigation!"
echo ""
