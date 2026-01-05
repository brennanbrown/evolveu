#!/bin/bash
# Update all React project dependencies to latest secure versions

echo "🔒 Updating React project dependencies for security..."

# List of React projects to update
projects=("04-react/react-00" "04-react/react-01" "04-react/react-02" "04-react/react-03")

for project in "${projects[@]}"; do
    echo ""
    echo "Updating $project..."
    cd "$project"
    
    # Remove old lock files
    rm -f package-lock.json yarn.lock
    
    # Install fresh dependencies
    npm install --package-lock-only
    
    cd - > /dev/null
done

echo ""
echo "✅ All dependencies updated!"
