# Direct Edit Feature Architecture

## 1. Overview

The "Direct Edit" feature allows users to modify a message in-place, effectively "correcting" a turn in the conversation. Unlike the existing "Save & Branch" behavior which creates a sibling node and preserves history, "Direct Edit" is a destructive action that updates the current node's content and removes only the immediate AI response (first child node), while preserving all subsequent messages in the conversation chain, then triggers a regeneration.

## 2. Data Model Changes

### `src/types/smartChat.ts`

We need to track when a node was modified.

```typescript
export interface ChatNode {
  // ... existing fields
  updatedAt?: number; // Timestamp of the last direct edit
}
```

## 3. Component Architecture

### `src/components/smart-chat/ChatMessage.tsx`

The edit interface will be expanded to support two distinct save actions.

**Current State:**

- Single "Save & Branch" button.

**New State:**

- **"Save & Branch"**: Preserves current behavior (creates sibling).
- **"Direct Edit"**: New destructive action.
  - Visuals: Should be distinct (e.g., specific icon or warning color).
  - interaction: Clicking this replaces the content in-place and wipes children.

**Props Update:**

```typescript
interface ChatMessageProps {
  // ... existing props
  onDirectEdit?: (nodeId: string, newContent: string) => void;
}
```

### `src/components/smart-chat/SmartChatInterface.tsx`

Will implement the core logic for the direct edit flow.

## 4. Logic Flow: `handleDirectEditMessage`

This function will manage the destructive update process.

### Pseudocode

```typescript
const handleDirectEditMessage = async (nodeId: string, newContent: string) => {
  // 1. Validation & Confirmation
  const node = tree.nodes[nodeId];
  if (!node) return;

  const hasChildren = node.childrenIds.length > 0;
  if (hasChildren) {
    const confirm = await confirmDestructiveAction(
      "This will permanently delete all subsequent messages in this thread. Are you sure?"
    );
    if (!confirm) return;
  }

  setLoading(true);

  try {
    // 2. Identify Resources to Clean Up
    // We only delete the immediate child node (first AI response) to preserve
    // the rest of the conversation chain. This allows subsequent messages to remain intact.
    const immediateChildId = node.childrenIds[0];
    const assetKeys: string[] = [];

    if (immediateChildId) {
      const childNode = tree.nodes[immediateChildId];
      if (childNode?.attachments) {
        childNode.attachments.forEach((att) => {
          if (att.key) assetKeys.push(att.key);
        });
      }
    }

    // 3. Delete Assets (Backend)
    // We do this first or in parallel. If it fails, we log but proceed
    // to ensure UI consistency.
    if (assetKeys.length > 0) {
      try {
        await deleteSmartChatImages(userId, assetKeys);
      } catch (e) {
        console.warn("Failed to clean up assets during direct edit", e);
      }
    }

    // 4. Update Tree State (Client-Side)
    const newTree = clone(tree);

    // 4a. Update the target node
    // Preserve children from position 1 onwards (keep all except immediate AI response)
    const preservedChildren = node.childrenIds.slice(1);
    newTree.nodes[nodeId] = {
      ...node,
      content: newContent,
      childrenIds: preservedChildren, // Keep subsequent messages
      updatedAt: Date.now()
    };

    // 4b. Remove only the immediate child node from the lookup map
    if (immediateChildId) {
      delete newTree.nodes[immediateChildId];
    }

    // 4c. Update Selection
    newTree.currentNodeId = nodeId;

    setTree(newTree);

    // 5. Persist State
    await saveSmartChatState(..., newTree, ...);

    // 6. Trigger Regeneration (If User Message)
    if (node.role === 'user') {
      // Reuse existing regeneration logic
      // We can refactor `handleSendMessage` or `handleRegenerate`
      // to accept a `contextNodeId` to generate FROM.
      await triggerGenerationFromNode(nodeId, newTree);
    }

  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};
```

### Helper: Direct Edit Child Identification

The direct edit operation only targets the immediate child node (first child), not all descendants. This preserves the conversation flow while allowing correction of the AI response.

**Example Flow:**

- Before: `User[1] → AI[2] → User[3] → AI[4]`
- Editing User[1]: Deletes AI[2], keeps User[3] and AI[4]
- After regeneration: `User[1-edited] → AI[2-new] → User[3] → AI[4]`

**Key Implementation Points:**

1. Only delete the first child node (immediate AI response)
2. Preserve `childrenIds` from index 1 onwards
3. Only collect and delete S3 assets from the immediate child
4. Maintain conversation chain integrity

## 5. UI/UX Specifications

### Edit Mode UI (`ChatMessage.tsx`)

Inside the editing view (`isEditing` state):

- **Layout**:
  - Textarea for content (existing)
  - Action Bar (Bottom right)
    - `Cancel` (Gray)
    - `Save & Branch` (Black/Primary) - _Existing behavior_
    - `Direct Edit` (Red/Destructive) - _New behavior_
      - Tooltip: "Overwrites message and deletes response history"

### Visual Cues

- Edited nodes could display a small `(edited)` label next to the timestamp or role name, using the `updatedAt` field.

## 6. Implementation Strategy

### Phase 1: Refactoring (Recommended)

Before adding the feature, extract the "Generate Response" logic from `handleSendMessage` into a reusable function `generateResponseForNode(nodeId: string, tree: ChatTree)`.

- Currently, `handleSendMessage` is tightly coupled with creating a _new_ user node.
- `handleRegenerate` replicates much of this logic but for replacing an assistant node.
- `handleDirectEdit` will need to generate a response for an _existing_ user node.

### Phase 2: Implementation

1.  Add `updatedAt` to types.
2.  Implement `getAllDescendants` helper.
3.  Implement `handleDirectEditMessage` in `SmartChatInterface`.
4.  Update `ChatMessage` UI to expose the new option.
5.  Wire it all together.

## 7. Edge Case Handling

- **Editing Assistant Messages**:
  - If a user Direct Edits an _Assistant_ message, we simply update the content and delete any _User_ follow-ups (children) that might have been based on the old content. We do _not_ regenerate the assistant message (since the user manually provided the content).
- **Network Failures**:
  - If `deleteSmartChatImages` fails, we proceed with the tree update to ensure the UI is responsive. The orphaned images in S3 are acceptable technical debt for UX fluidity (can be cleaned up by a separate cron job later if needed).
  - If `saveSmartChatState` fails, we revert the local tree state (optimistic UI update management).

## 8. Backend Considerations

No new backend endpoints are strictly required. The existing `deleteSmartChatImages` and `saveSmartChatState` endpoints are sufficient to handle the resource cleanup and state persistence. The logic is primarily client-side state management.
