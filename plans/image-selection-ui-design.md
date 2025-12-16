# Image Selection UI & Workflow Design Document

## 1. UI/UX Flow

### 1.1 Button Placement & Activation

**Primary Button Location:**

- Position: Header area of [`SmartChatInterface`](../src/components/smart-chat/SmartChatInterface.tsx#L3792-L3814), next to the "Create Bulk Task" button
- Button Label: "Select Images" with a selection icon (CheckSquare or ImageIcon)
- Visual State:
  - **Inactive**: Gray background, neutral icon
  - **Active**: Indigo/purple background, white icon (matching app theme)
  - Badge indicator showing count of selected images when > 0

**Alternative Locations Considered:**

- Floating action button (bottom-right) - May conflict with bulk progress indicator
- Input area toolbar - Too crowded with existing controls
- **Recommendation**: Header placement for better visibility and separation from input controls

### 1.2 Selection Mode Visual Design

**When Selection Mode is Active:**

1. **Visual Overlay on Chat Messages:**

   - Semi-transparent indigo overlay on hoverable images (opacity: 10%)
   - Cursor changes to pointer with selection indicator
   - Smooth transition effects (200ms)

2. **Selection Indicators:**

   - **Unselected Images**:
     - Border: 2px dashed border-gray-300
     - Hover: border-indigo-400, subtle scale (1.02)
   - **Selected Images**:
     - Border: 3px solid border-indigo-500
     - Background overlay: bg-indigo-500/20
     - Checkmark icon in top-left corner (white, bg-indigo-600 circle)
     - Subtle glow effect: ring-4 ring-indigo-200

3. **Global UI Changes:**
   - Sticky toolbar appears below header showing:
     - Selected count badge
     - "Download Selected (N)" button (primary CTA)
     - "Clear Selection" button
     - "Exit Selection Mode" button
   - Disable other image interactions (zoom, download individual) to avoid confusion
   - Subtle banner message: "Click images to select • Click Download when ready"

### 1.3 Download Button Behavior

**Toolbar Design:**

```
┌─────────────────────────────────────────────────────┐
│ [✓ 5 Selected] [Download ZIP] [Clear] [Exit Mode]  │
└─────────────────────────────────────────────────────┘
```

**Download Button States:**

- **Disabled** (0 images): Gray, cursor-not-allowed, tooltip "Select images first"
- **Enabled** (≥1 images): Indigo gradient, hover effects
- **Processing**: Loader icon, "Creating ZIP..." text, disabled

**Progress Feedback:**

- Show progress modal/toast with:
  - Processing step (1/3: Fetching images, 2/3: Converting to WebP, 3/3: Creating ZIP)
  - Progress bar (0-100%)
  - Current image being processed (e.g., "Processing image 3 of 5")
  - Cancel button (optional - aborts operation)

### 1.4 Exit Selection Mode

**Multiple Exit Methods:**

1. **Exit Button** in toolbar (primary)
2. **ESC key** keyboard shortcut
3. **Click "Select Images" button again** (toggle)

**Exit Behavior:**

- Fade out selection indicators (300ms transition)
- Clear selection state
- Remove toolbar
- Restore normal image interactions
- Optional: Confirm dialog if user has selected images but hasn't downloaded

---

## 2. State Management Design

### 2.1 New State Variables in SmartChatInterface

```typescript
// Selection mode state
const [isSelectionMode, setIsSelectionMode] = useState(false);

// Selected images: Map<messageNodeId, Set<attachmentIndex>>
// This structure allows efficient lookup and tracks which images from which messages
const [selectedImages, setSelectedImages] = useState<Map<string, Set<number>>>(
  new Map()
);

// Download progress state
const [downloadProgress, setDownloadProgress] = useState<{
  isDownloading: boolean;
  currentStep: "fetching" | "converting" | "zipping";
  current: number;
  total: number;
  currentFileName?: string;
} | null>(null);
```

### 2.2 State Management Functions

```typescript
// Toggle selection mode
const toggleSelectionMode = () => {
  if (isSelectionMode && selectedImages.size > 0) {
    // Confirm exit if images are selected
    if (confirm("Exit without downloading? Selected images will be cleared.")) {
      setIsSelectionMode(false);
      setSelectedImages(new Map());
    }
  } else {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) setSelectedImages(new Map()); // Clear on exit
  }
};

// Toggle individual image selection
const toggleImageSelection = (nodeId: string, attachmentIndex: number) => {
  setSelectedImages((prev) => {
    const newMap = new Map(prev);
    const nodeSet = newMap.get(nodeId) || new Set();

    if (nodeSet.has(attachmentIndex)) {
      nodeSet.delete(attachmentIndex);
      if (nodeSet.size === 0) {
        newMap.delete(nodeId);
      } else {
        newMap.set(nodeId, nodeSet);
      }
    } else {
      nodeSet.add(attachmentIndex);
      newMap.set(nodeId, nodeSet);
    }

    return newMap;
  });
};

// Clear all selections
const clearAllSelections = () => {
  setSelectedImages(new Map());
};

// Get total selected count
const getTotalSelectedCount = () => {
  let count = 0;
  selectedImages.forEach((set) => {
    count += set.size;
  });
  return count;
};

// Check if specific image is selected
const isImageSelected = (nodeId: string, attachmentIndex: number): boolean => {
  return selectedImages.get(nodeId)?.has(attachmentIndex) || false;
};
```

### 2.3 Keyboard Shortcuts

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isSelectionMode) {
      toggleSelectionMode();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isSelectionMode]);
```

---

## 3. Component Architecture

### 3.1 Modified Props for ChatMessage

```typescript
interface ChatMessageProps {
  // ... existing props

  // Selection mode props
  isSelectionMode?: boolean;
  selectedAttachments?: Set<number>; // Indices of selected attachments
  onToggleImageSelection?: (attachmentIndex: number) => void;
}
```

### 3.2 ChatMessage Component Changes

**In the image rendering section** ([`ChatMessage.tsx:464-574`](../src/components/smart-chat/ChatMessage.tsx#L464-L574)):

```typescript
// Update the image container click handler
<div
  key={idx}
  onClick={() => {
    if (isSelectionMode && onToggleImageSelection) {
      onToggleImageSelection(idx);
    } else {
      onImageClick(att);
    }
  }}
  className={cn(
    "relative group/image rounded-lg overflow-hidden cursor-pointer transition-all shrink-0",
    isSelectionMode && "hover:scale-102",
    selectedAttachments?.has(idx)
      ? "border-3 border-indigo-500 ring-4 ring-indigo-200 bg-indigo-500/10"
      : isSelectionMode
        ? "border-2 border-dashed border-gray-300 hover:border-indigo-400"
        : "border border-gray-200"
  )}
>
  <SecureImage ... />

  {/* Selection Indicator */}
  {isSelectionMode && (
    <div className="absolute top-2 left-2 z-20">
      {selectedAttachments?.has(idx) ? (
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
          <Check size={16} className="text-white" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm" />
      )}
    </div>
  )}

  {/* Hide other overlays in selection mode */}
  {!isSelectionMode && (
    <>
      {/* Existing prompt popover */}
      {/* Existing download buttons */}
    </>
  )}
</div>
```

### 3.3 New SelectionToolbar Component

Create a new component: `src/components/smart-chat/SelectionToolbar.tsx`

```typescript
interface SelectionToolbarProps {
  selectedCount: number;
  onDownload: () => void;
  onClear: () => void;
  onExit: () => void;
  isDownloading: boolean;
}

export function SelectionToolbar({
  selectedCount,
  onDownload,
  onClear,
  onExit,
  isDownloading,
}: SelectionToolbarProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="sticky top-16 z-20 bg-indigo-50 border-b border-indigo-200 shadow-sm"
    >
      <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-indigo-100 px-3 py-1.5 rounded-full">
            <CheckSquare size={16} className="text-indigo-700" />
            <span className="text-sm font-semibold text-indigo-900">
              {selectedCount} Selected
            </span>
          </div>
          <p className="text-xs text-indigo-600">
            Click images to select • ESC to exit
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            disabled={selectedCount === 0 || isDownloading}
            className="px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Clear
          </button>

          <button
            onClick={onDownload}
            disabled={selectedCount === 0 || isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            {isDownloading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating ZIP...
              </>
            ) : (
              <>
                <Download size={16} />
                Download ZIP ({selectedCount})
              </>
            )}
          </button>

          <button
            onClick={onExit}
            disabled={isDownloading}
            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
            title="Exit Selection Mode"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

---

## 4. Download Workflow

### 4.1 Step-by-Step Process

```typescript
const handleDownloadSelectedImages = async () => {
  if (selectedImages.size === 0) return;

  // Calculate total images
  let totalImages = 0;
  selectedImages.forEach((set) => {
    totalImages += set.size;
  });

  setDownloadProgress({
    isDownloading: true,
    currentStep: "fetching",
    current: 0,
    total: totalImages,
  });

  try {
    const zip = new JSZip();
    let processedCount = 0;

    // Step 1: Collect all selected attachments with metadata
    const imagesToProcess: Array<{
      attachment: ChatAttachment;
      nodeId: string;
      index: number;
    }> = [];

    for (const [nodeId, indices] of selectedImages.entries()) {
      const node = tree.nodes[nodeId];
      if (!node?.attachments) continue;

      for (const idx of indices) {
        const att = node.attachments[idx];
        if (att) {
          imagesToProcess.push({ attachment: att, nodeId, index: idx });
        }
      }
    }

    // Step 2: Process images sequentially (to show progress)
    for (const { attachment, nodeId, index } of imagesToProcess) {
      setDownloadProgress((prev) =>
        prev
          ? {
              ...prev,
              currentStep: "fetching",
              current: processedCount,
              currentFileName: attachment.name || `image-${index}`,
            }
          : null
      );

      // Fetch image URL
      let url = attachment.url;
      if (attachment.key && !url?.startsWith("data:")) {
        url = await getPresignedUrl(attachment.key);
      }

      if (!url) {
        console.warn(`Skipping image without URL: ${attachment.name}`);
        continue;
      }

      // Fetch image blob via proxy
      setDownloadProgress((prev) =>
        prev
          ? {
              ...prev,
              currentStep: "converting",
            }
          : null
      );

      const proxyUrl = url.startsWith("data:")
        ? url
        : `/api/proxy-image?url=${encodeURIComponent(url)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) {
        console.warn(`Failed to fetch image: ${attachment.name}`);
        continue;
      }

      const blob = await response.blob();

      // Convert to WebP
      const webpBlob = await convertBlobToWebP(blob);

      // Generate unique filename
      const fileName = generateUniqueFileName(
        attachment,
        nodeId,
        index,
        processedCount
      );

      // Add to ZIP
      setDownloadProgress((prev) =>
        prev
          ? {
              ...prev,
              currentStep: "zipping",
            }
          : null
      );

      zip.file(fileName, webpBlob);
      processedCount++;
    }

    // Step 3: Generate and download ZIP
    setDownloadProgress((prev) =>
      prev
        ? {
            ...prev,
            currentStep: "zipping",
            current: totalImages,
          }
        : null
    );

    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    // Download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = `smart-chat-images-${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    // Success: Clear selections and exit mode
    setSelectedImages(new Map());
    setIsSelectionMode(false);
  } catch (error) {
    console.error("Failed to create ZIP:", error);
    alert("Failed to download images. Please try again.");
  } finally {
    setDownloadProgress(null);
  }
};
```

### 4.2 Helper Functions

```typescript
// Convert blob to WebP using canvas
const convertBlobToWebP = (blob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(img.src);
        reject(new Error("Canvas context unavailable"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (webpBlob) => {
          URL.revokeObjectURL(img.src);
          if (webpBlob) {
            resolve(webpBlob);
          } else {
            reject(new Error("WebP conversion failed"));
          }
        },
        "image/webp",
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Image load failed"));
    };
  });
};

// Generate unique filename with incremental numbering
const generateUniqueFileName = (
  attachment: ChatAttachment,
  nodeId: string,
  index: number,
  counter: number
): string => {
  // Use attachment name or generate from prompt
  let baseName = attachment.name || attachment.prompt?.slice(0, 30) || "image";

  // Remove existing extension
  baseName = baseName.replace(/\.[^/.]+$/, "");

  // Sanitize filename (remove invalid characters)
  baseName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");

  // Add counter prefix for ordering
  const paddedCounter = String(counter + 1).padStart(3, "0");

  // Format: 001_description.webp
  return `${paddedCounter}_${baseName}.webp`;
};
```

### 4.3 Image Fetching Strategy

**Use Proxy API** (`/api/proxy-image`) for all remote URLs:

- ✅ Avoids CORS issues
- ✅ Consistent fetch behavior
- ✅ Already implemented and tested
- ⚠️ May be slower for large batches (sequential processing recommended)

**Direct blob URLs** for `data:` URIs:

- ✅ No network request needed
- ✅ Immediate access
- Use directly without proxy

### 4.4 ZIP File Naming Convention

**Format:** `smart-chat-images-{timestamp}.zip`

**Example:** `smart-chat-images-1702658400000.zip`

**Alternative (more descriptive):**

- `{session-title}-images-{count}-{timestamp}.zip`
- Example: `Product Design-images-12-2023-12-15.zip`

**Recommendation:** Use timestamp-based naming for uniqueness and sorting

---

## 5. Edge Cases & Error Handling

### 5.1 No Images Selected

**Prevention:**

- Disable "Download ZIP" button when `selectedCount === 0`
- Show tooltip: "Select images first"

**UI Feedback:**

- Gray out button
- Cursor: not-allowed

### 5.2 Failed Image Fetches

**Handling:**

1. **Individual Failures:**

   - Log warning to console
   - Skip failed image
   - Continue processing remaining images
   - Show summary at end: "Downloaded 8 of 10 images (2 failed)"

2. **Complete Failure:**
   - Show error alert with retry option
   - Preserve selection state
   - Allow user to try again

**Error Modal:**

```typescript
if (failedCount > 0) {
  const message =
    failedCount === totalImages
      ? "Failed to download any images. Please check your connection and try again."
      : `Downloaded ${
          totalImages - failedCount
        } of ${totalImages} images. ${failedCount} failed to download.`;

  alert(message);
}
```

### 5.3 Selection Limit

**Recommendation:** No hard limit, but warn for large selections

```typescript
const MAX_RECOMMENDED = 50;

const handleDownload = () => {
  const count = getTotalSelectedCount();

  if (count > MAX_RECOMMENDED) {
    if (
      !confirm(
        `You've selected ${count} images. This may take a while to process. Continue?`
      )
    ) {
      return;
    }
  }

  handleDownloadSelectedImages();
};
```

### 5.4 Loading States During ZIP Creation

**Progress Modal Component:**

```typescript
{
  downloadProgress && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Creating ZIP Archive</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {downloadProgress.currentStep === "fetching" &&
                "Fetching images..."}
              {downloadProgress.currentStep === "converting" &&
                "Converting to WebP..."}
              {downloadProgress.currentStep === "zipping" &&
                "Creating ZIP file..."}
            </span>
            <span className="font-mono font-semibold">
              {downloadProgress.current} / {downloadProgress.total}
            </span>
          </div>

          {downloadProgress.currentFileName && (
            <p className="text-xs text-gray-500 truncate">
              {downloadProgress.currentFileName}
            </p>
          )}

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (downloadProgress.current / downloadProgress.total) * 100
                }%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Please don't close this window
        </p>
      </div>
    </motion.div>
  );
}
```

### 5.5 User Leaves Selection Mode Accidentally

**Confirmation Dialog:**

```typescript
const handleExitSelectionMode = () => {
  const count = getTotalSelectedCount();

  if (count > 0) {
    if (
      confirm(
        `Exit without downloading? You have ${count} image${
          count > 1 ? "s" : ""
        } selected.`
      )
    ) {
      exitSelectionMode();
    }
  } else {
    exitSelectionMode();
  }
};
```

### 5.6 Images with No URL or Key

**Skip Gracefully:**

```typescript
if (!attachment.url && !attachment.key) {
  console.warn(`Skipping invalid attachment at node ${nodeId}, index ${index}`);
  continue;
}
```

### 5.7 Browser Memory Limits

**For Very Large Selections (100+ images):**

- Process in batches of 20-30
- Clear blob URLs after adding to ZIP
- Use streaming ZIP generation if available
- Show memory warning for 100+ selections

---

## 6. Implementation Summary

### 6.1 Files to Modify

1. **`src/components/smart-chat/SmartChatInterface.tsx`**

   - Add state variables
   - Add selection mode toggle button
   - Implement download logic
   - Pass props to ChatMessage components

2. **`src/components/smart-chat/ChatMessage.tsx`**

   - Add selection mode props
   - Update image click handlers
   - Add selection visual indicators

3. **Create `src/components/smart-chat/SelectionToolbar.tsx`** (new file)
   - Toolbar component for selection controls

### 6.2 Dependencies

- ✅ JSZip - Already imported
- ✅ getPresignedUrl - Already available
- ✅ Proxy API - Already implemented
- ✅ Motion/Framer - Already imported

### 6.3 Estimated Complexity

- **State Management:** Medium - Map-based selection tracking
- **UI Changes:** Low-Medium - Mostly styling and conditional rendering
- **Download Logic:** Medium-High - Async processing, error handling, progress tracking
- **Testing Surface:** High - Multiple edge cases and user flows

**Total Estimated Effort:** Medium-Large feature

---

## 7. Future Enhancements

1. **Bulk Image Actions:**

   - Delete selected images
   - Move to different session
   - Apply transformations (resize, filter)

2. **Smart Selection:**

   - "Select All in Message" button
   - "Select All Generated Images" option
   - Filter by prompt keyword

3. **Advanced ZIP Options:**

   - Choose compression level
   - Include metadata file (prompts, timestamps)
   - Organize into folders by message/date

4. **Keyboard Shortcuts:**
   - `Ctrl/Cmd + A` - Select all visible
   - `Ctrl/Cmd + D` - Download selected
   - `Ctrl/Cmd + Shift + A` - Clear selection

---

This design provides a comprehensive, production-ready blueprint for implementing the image selection feature while maintaining consistency with the existing codebase and design patterns.
