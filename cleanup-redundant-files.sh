#!/bin/bash
# Cleanup script for redundant status files

echo "🧹 Cleaning up redundant files..."

# Files to remove (duplicates and old status files)
FILES_TO_REMOVE=(
  "TRACK3-STATUS.md"  # Duplicate of docs/TRACK3-STATUS.md
  "docs/PROJECT-STATUS.md"  # Redundant with MVP-STATUS.md
  "docs/TRACK2-STATUS.md"  # Interim status, merged into MVP-STATUS.md
  "docs/TRACK3-STATUS.md"  # Interim status, merged into MVP-STATUS.md
  "docs/TRACK4-STATUS.md"  # Interim status, merged into MVP-STATUS.md
)

REMOVED=0
for file in "${FILES_TO_REMOVE[@]}"; do
  if [ -f "$file" ]; then
    echo "  ❌ Removing: $file"
    rm "$file"
    ((REMOVED++))
  fi
done

echo ""
echo "✅ Cleanup complete: $REMOVED files removed"
echo ""
echo "Remaining status files:"
ls -lh MVP-STATUS.md MAIN_BASELINE.md docs/design/STATUS.md 2>/dev/null | awk '{print "  ✓", $9, "-", $5}'
