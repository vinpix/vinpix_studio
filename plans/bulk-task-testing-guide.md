# Bulk Task System Testing Guide

This guide provides comprehensive testing instructions for the Bulk Task System.

## Prerequisites

1. **DynamoDB Tables Created**: Ensure both `BulkTaskBatches` and `BulkTasks` tables exist
2. **Lambda Deployed**: Backend code deployed with bulk task handlers
3. **User Authenticated**: Logged into the admin dashboard
4. **S3 Bucket Access**: Configured for image storage

---

## Manual Testing Checklist

### Step 1: Discovery & Navigation

**Test: Button in Smart Chat Interface**

- [ ] Navigate to `/tools/smart-chat`
- [ ] Verify "Create Bulk Task" button appears in header
- [ ] Button has Layers icon and correct styling
- [ ] Click button navigates to `/tools/bulk-tasks/create`

**Expected Behavior:**

- Button should be visible and responsive
- Routing should work without errors
- Page transition should be smooth

---

### Step 2: Create Page - Input Step

**Test: Markdown Input**

- [ ] Page loads without errors
- [ ] Step indicator shows "1. Input" as active
- [ ] Textarea is visible with placeholder text
- [ ] Example text is displayed correctly
- [ ] Can paste markdown into textarea

**Test: Parse with AI**

- [ ] Copy example from `plans/bulk-task-example-input.md`
- [ ] Paste into textarea
- [ ] Click "Parse with AI" button
- [ ] Loading state appears (button shows "Parsing..." with spinner)
- [ ] Wait for AI parsing to complete

**Expected Behavior:**

- Parsing should take 2-10 seconds
- No errors should appear in console
- Should advance to Step 2 automatically

**Common Errors:**

- "Failed to parse tasks" → Check Lambda logs, verify AI service is working
- Network timeout → Increase Lambda timeout settings
- Empty results → Verify markdown format matches examples

---

### Step 3: Parse Results - Review Tasks

**Test: Task Table Display**

- [ ] Tasks table renders with all parsed tasks
- [ ] Each task shows: order number, category, level, prompt
- [ ] Prefix prompts are displayed separately
- [ ] Can see full prompt on hover/click
- [ ] Task count matches expected number

**Test: Task Editing**

- [ ] Click Edit (pencil icon) on a task
- [ ] Textarea appears with current prompt
- [ ] Can modify the prompt text
- [ ] Click "Save" to apply changes
- [ ] Click "Cancel" to discard changes
- [ ] Changes persist in the table

**Test: Task Removal**

- [ ] Click Remove (trash icon) on a task
- [ ] Task is removed from list
- [ ] Task count updates correctly
- [ ] Can continue with remaining tasks

**Expected Behavior:**

- All parsed tasks should be editable
- UI should update immediately
- No duplicate tasks should appear

---

### Step 4: Configure Batch

**Test: Batch Information**

- [ ] Default batch name includes current date
- [ ] Can edit batch name
- [ ] Can add optional description
- [ ] Form validates required fields

**Test: Execution Settings**

- [ ] Delay slider works (500ms - 30s range)
- [ ] Delay value displays correctly
- [ ] Max retries slider works (0-10 range)
- [ ] Retry on failure checkbox toggles
- [ ] Auto resume checkbox toggles

**Test: Image Settings**

- [ ] Aspect ratio dropdown has all options (1:1, 16:9, 9:16, etc.)
- [ ] Resolution dropdown works (1K, 2K, 4K)
- [ ] Model dropdown shows all models (Imagen 4.0, Ultra, Gemini 3 Pro)
- [ ] Can change all settings
- [ ] Settings persist when switching steps

**Expected Behavior:**

- All form inputs should be responsive
- Default values should be reasonable
- No validation errors on valid input

---

### Step 5: Create Batch

**Test: Batch Creation**

- [ ] Click "Create Batch" button
- [ ] Loading spinner appears
- [ ] Shows "Creating Batch..." message
- [ ] Navigates to batch detail page after creation

**Expected Behavior:**

- Creation should take 1-3 seconds
- Should redirect to `/tools/bulk-tasks/{batchId}`
- No errors in console

**Common Errors:**

- "Failed to create batch" → Check Lambda permissions
- Timeout → Verify DynamoDB connection
- Navigation fails → Check router configuration

---

### Step 6: Batch Detail Page - Ready State

**Test: Batch Information Display**

- [ ] Batch title displays correctly
- [ ] Description shows if provided
- [ ] Created timestamp is accurate
- [ ] Status badge shows "READY"
- [ ] Configuration section displays all settings

**Test: Configuration Display**

- [ ] All config values match what was set
- [ ] Delay, retries, and boolean settings are correct
- [ ] Image settings (aspect ratio, resolution, model) are shown
- [ ] "Edit" button appears for draft/ready batches

**Test: Start Execution**

- [ ] Green "Start Execution" button appears
- [ ] Button has Play icon
- [ ] Click button starts execution
- [ ] Status changes to "RUNNING"
- [ ] Start execution section disappears

**Expected Behavior:**

- Page should load quickly
- All data should match the created batch
- Status should update without page reload

---

### Step 7: Task Execution View

**Test: Progress Display**

- [ ] Progress bar appears
- [ ] Shows current task number (e.g., "Task 1 of 10")
- [ ] Progress percentage updates
- [ ] Completed/Total counters update
- [ ] ETA displays (if available)

**Test: Task Status Updates**

- [ ] Current task shows "processing" status
- [ ] Completed tasks show green checkmark
- [ ] Failed tasks show red X
- [ ] Status icons match task states
- [ ] Updates happen in real-time

**Test: Execution Log**

- [ ] Log entries appear as tasks execute
- [ ] Each entry shows timestamp
- [ ] Entry types: task_started, task_completed, task_failed
- [ ] Entries are chronological
- [ ] Can scroll through log

**Test: Image Results**

- [ ] Completed task images load
- [ ] Thumbnails appear in task table
- [ ] Click thumbnail to view full image
- [ ] Images match the prompts
- [ ] Failed tasks show error messages

**Expected Behavior:**

- UI should update every 2-3 seconds
- No memory leaks from polling
- Images should load progressively
- Execution should respect delay settings

---

### Step 8: Execution Controls

**Test: Pause Execution**

- [ ] "Pause" button appears during execution
- [ ] Click to pause
- [ ] Status changes to "PAUSED"
- [ ] Current task completes before pausing
- [ ] Can resume from paused state

**Test: Cancel Execution**

- [ ] "Cancel" button is available
- [ ] Confirmation dialog appears
- [ ] Click confirm to cancel
- [ ] Status changes to "CANCELLED"
- [ ] Pending tasks are marked cancelled
- [ ] Completed tasks remain completed

**Test: Error Handling**

- [ ] Simulate network error (disconnect internet briefly)
- [ ] Error message appears
- [ ] Can retry failed operation
- [ ] Execution state is preserved
- [ ] No data loss occurs

**Expected Behavior:**

- Controls should respond immediately
- State changes should be persistent
- Errors should be user-friendly

---

### Step 9: Batch List Page

**Test: List Display**

- [ ] Navigate to `/tools/bulk-tasks`
- [ ] All batches are listed
- [ ] Each card shows: title, status, progress
- [ ] Progress bar reflects completion
- [ ] Status badges have correct colors
- [ ] Can see failed task count

**Test: Filtering**

- [ ] Filter buttons work (All, Draft, Ready, Running, etc.)
- [ ] Filtered results update immediately
- [ ] Count matches visible batches
- [ ] Can switch between filters

**Test: Batch Actions**

- [ ] Click batch card to view details
- [ ] Navigation works correctly
- [ ] Delete button (trash icon) works
- [ ] Confirmation dialog appears
- [ ] Deleted batch is removed from list

**Expected Behavior:**

- List should load within 1-2 seconds
- Filtering should be instant
- No pagination errors

---

## API Testing (with curl)

### Test Parse Prompts

```bash
curl -X POST https://your-lambda-url/prod \
  -H "Content-Type: application/json" \
  -d '{
    "function": "parseBulkPrompts",
    "params": {
      "userId": "test-user-123",
      "rawText": "# Test\n\nPrefix: Icon white background\n\n- Red sneakers with wings"
    }
  }'
```

**Expected Response:**

```json
{
  "statusCode": 200,
  "body": {
    "success": true,
    "tasks": [
      {
        "prompt": "Icon white background Red sneakers with wings",
        "specificPrompt": "Red sneakers with wings",
        "prefix": "Icon white background",
        "order": 0
      }
    ],
    "totalTasks": 1
  }
}
```

### Test Create Batch

```bash
curl -X POST https://your-lambda-url/prod \
  -H "Content-Type: application/json" \
  -d '{
    "function": "createBulkBatch",
    "params": {
      "userId": "test-user-123",
      "title": "Test Batch",
      "description": "API Test"
    }
  }'
```

### Test Execute Next Task

```bash
curl -X POST https://your-lambda-url/prod \
  -H "Content-Type: application/json" \
  -d '{
    "function": "executeNextBulkTask",
    "params": {
      "userId": "test-user-123",
      "batchId": "your-batch-id"
    }
  }'
```

---

## Troubleshooting Guide

### Issue: AI Parsing Returns Empty Tasks

**Possible Causes:**

- Markdown format doesn't match expected structure
- AI service API key invalid or quota exceeded
- Prompt too short or unclear

**Solutions:**

1. Check example markdown format in `plans/bulk-task-example-input.md`
2. Verify AI service credentials in Lambda environment variables
3. Test with simpler, clearer markdown

---

### Issue: Batch Stuck in "Running" State

**Possible Causes:**

- Frontend stopped polling (page closed)
- Lambda timeout during task execution
- DynamoDB write failure

**Solutions:**

1. Reload page to resume polling
2. Check CloudWatch logs for Lambda errors
3. Manually update batch status in DynamoDB if needed

---

### Issue: Images Not Loading

**Possible Causes:**

- S3 presigned URL expired
- CORS configuration issue
- Image generation failed but status shows complete

**Solutions:**

1. Check S3 bucket CORS settings
2. Verify image key exists in S3
3. Re-generate failed images

---

### Issue: TypeScript Compilation Errors

**Common Errors:**

1. **Type mismatch on task.id vs task.taskId**

   - Fixed in backend: tasks now have both `id` and `taskId`

2. **Import path errors**

   - Verify all imports use `@/` prefix
   - Check tsconfig.json paths configuration

3. **Framer Motion types**
   - Ensure `framer-motion` is installed
   - Check version compatibility

**Run Type Check:**

```bash
npm run build
# or
tsc --noEmit
```

---

## Performance Benchmarks

### Expected Performance

- **Parse 10 tasks**: 3-5 seconds
- **Create batch**: 1-2 seconds
- **Execute single task**: 5-10 seconds (image generation)
- **Load batch list**: <1 second
- **Load batch detail**: <1 second

### Optimization Tips

1. **Reduce polling frequency** if not actively monitoring
2. **Use auto-resume** for large batches
3. **Increase delay** between tasks to avoid rate limits
4. **Batch operations** when updating multiple tasks

---

## Known Limitations

1. **Sequential Execution Only**: `maxConcurrentTasks` is always 1
2. **No Pause Mid-Task**: Current task completes before pausing
3. **No Task Reordering**: Order is set during parsing
4. **No Partial Retry**: Must retry entire task, not individual steps
5. **No Progress Export**: Can't export execution logs or results bulk

---

## Success Criteria

✅ All integration points working
✅ No TypeScript compilation errors  
✅ All API endpoints responding correctly
✅ UI updates in real-time during execution
✅ Error handling graceful and informative
✅ Images generate and display correctly
✅ State persists across page reloads
✅ Documentation complete and accurate

---

## Next Steps for Production

1. **Add monitoring**: CloudWatch alarms for failures
2. **Implement cleanup**: Auto-delete old batches after 30 days
3. **Add analytics**: Track batch success rates, execution times
4. **Optimize polling**: Use WebSockets instead of polling
5. **Add export**: Allow downloading results as ZIP
6. **Improve AI parsing**: Fine-tune prompts for better accuracy
7. **Add templates**: Pre-made batch templates for common use cases
