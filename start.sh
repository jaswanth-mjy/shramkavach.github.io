#!/bin/bash

# ShramSetu Launch Script
# This script helps you quickly start the development server

echo "🚀 ShramSetu - Starting Development Server"
echo "=========================================="
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 detected"
    echo "📡 Starting server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start Python HTTP server
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python detected"
    echo "📡 Starting server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start Python HTTP server (Python 2.x fallback)
    python -m SimpleHTTPServer 8000
    
else
    echo "❌ Python not found!"
    echo ""
    echo "Please install Python or use an alternative:"
    echo "  1. Install Python: https://www.python.org/downloads/"
    echo "  2. Use VS Code Live Server extension"
    echo "  3. Use Node.js: npx http-server . -p 8000"
    echo ""
    exit 1
fi
