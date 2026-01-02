#!/bin/bash

# Firebase View Counter Upgrade Script
# This script updates all article HTML files to use Firebase instead of localStorage

echo "🔥 Firebase View Counter Upgrade Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo -e "${RED}Error: Please run this script from the root of your project${NC}"
    exit 1
fi

# Step 1: Add Firebase SDK to all article HTML files
echo -e "${YELLOW}Step 1: Adding Firebase SDK to article files...${NC}"

articles=(
    "UPI-2026.HTML"
    "freelancer-tax-2025.html"
    "year-end-2025.html"
    "gratuity-rule-2025.html"
    "platform-fees-2025.html"
    "health-insurance-2025.html"
    "epfo-gig-workers-2025.html"
    "social-security-2025.html"
    "financial-calculators-2025.html"
    "section-44ada-2025.html"
    "gst-threshold-2025.html"
    "minimum-wage-2025.html"
    "december-31-2025.html"
    "bond-markets-2026.html"
)

updated_count=0
skipped_count=0

for article in "${articles[@]}"; do
    if [ -f "$article" ]; then
        # Check if Firebase SDK already added
        if grep -q "firebase-app-compat.js" "$article"; then
            echo -e "  ${YELLOW}⊘${NC} Skipped: $article (Firebase already added)"
            ((skipped_count++))
        else
            # Add Firebase SDK before </head>
            sed -i '' '/<\/head>/i\
    <!-- Firebase SDK -->\
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>\
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>\
    <script src="js/firebase-config.js"></script>
' "$article"
            echo -e "  ${GREEN}✓${NC} Updated: $article"
            ((updated_count++))
        fi
    else
        echo -e "  ${RED}✗${NC} Not found: $article"
    fi
done

echo ""
echo -e "${GREEN}Firebase SDK added to $updated_count files${NC}"
echo -e "${YELLOW}Skipped $skipped_count files (already updated)${NC}"
echo ""

# Step 2: Switch from view-counter.js to view-counter-firebase.js
echo -e "${YELLOW}Step 2: Switching to Firebase view counter...${NC}"

switched_count=0
already_count=0

for article in "${articles[@]}"; do
    if [ -f "$article" ]; then
        # Check if already using Firebase version
        if grep -q "view-counter-firebase.js" "$article"; then
            echo -e "  ${YELLOW}⊘${NC} Already using Firebase: $article"
            ((already_count++))
        else
            # Replace view-counter.js with view-counter-firebase.js
            sed -i '' 's|view-counter\.js|view-counter-firebase.js|g' "$article"
            echo -e "  ${GREEN}✓${NC} Switched: $article"
            ((switched_count++))
        fi
    fi
done

echo ""
echo -e "${GREEN}Switched $switched_count files to Firebase view counter${NC}"
echo -e "${YELLOW}Already using Firebase: $already_count files${NC}"
echo ""

# Step 3: Summary
echo "========================================"
echo -e "${GREEN}✓ Upgrade Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Edit js/firebase-config.js with your Firebase credentials"
echo "2. Test locally: open any article and check browser console"
echo "3. Commit changes: git add -A && git commit -m 'Upgrade to Firebase view tracking'"
echo "4. Push to GitHub: git push"
echo ""
echo "📖 See FIREBASE-SETUP-GUIDE.md for detailed setup instructions"
echo ""
