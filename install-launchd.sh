#!/bin/bash

# Morning Brief - launchd Installation Script
# This script installs the morning brief as a daily scheduled job on macOS

set -e

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PLIST_TEMPLATE="$SCRIPT_DIR/com.morning-brief.daily.plist.template"
PLIST_DEST="$HOME/Library/LaunchAgents/com.morning-brief.daily.plist"
CRON_SCRIPT="$SCRIPT_DIR/cron.sh"

echo "🌅 Installing Morning Brief Daily Job"
echo "======================================"
echo "Project directory: $SCRIPT_DIR"
echo ""

# Check if template exists
if [ ! -f "$PLIST_TEMPLATE" ]; then
    echo "❌ Error: plist template not found at $PLIST_TEMPLATE"
    exit 1
fi

# Check if cron.sh is executable
if [ ! -x "$CRON_SCRIPT" ]; then
    echo "⚠️  Making cron.sh executable..."
    chmod +x "$CRON_SCRIPT"
fi

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$HOME/Library/LaunchAgents"

# Unload existing job if present
if launchctl list | grep -q com.morning-brief.daily; then
    echo "⚠️  Unloading existing job..."
    launchctl unload "$PLIST_DEST" 2>/dev/null || true
fi

# Generate plist from template with actual paths
echo "📋 Generating plist with current paths..."
sed "s|{{PROJECT_DIR}}|$SCRIPT_DIR|g" "$PLIST_TEMPLATE" > "$PLIST_DEST"

# Validate plist syntax
echo "✅ Validating plist syntax..."
plutil -lint "$PLIST_DEST"

# Load the job
echo "🚀 Loading job..."
launchctl load "$PLIST_DEST"

# Verify it's loaded
if launchctl list | grep -q com.morning-brief.daily; then
    echo ""
    echo "✅ Success! Morning Brief is now scheduled to run daily at 5:00 AM"
    echo ""
    echo "Project location: $SCRIPT_DIR"
    echo ""
    echo "Next steps:"
    echo "  • Test now: launchctl start com.morning-brief.daily"
    echo "  • View logs: tail -f $SCRIPT_DIR/logs/launchd.log"
    echo "  • Check status: launchctl list | grep morning-brief"
    echo "  • Uninstall: launchctl unload $PLIST_DEST"
else
    echo ""
    echo "❌ Error: Job loaded but not found in launchctl list"
    exit 1
fi
