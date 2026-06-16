/**
 * Typed client for the /team lambda functions.
 * callLambdaFunction already unwraps the `body`, so each wrapper just casts.
 */
import { callLambdaFunction } from "./auth";
import type {
  Task,
  Member,
  Note,
  Bug,
  TaskStatus,
  CreateTaskInput,
} from "@/types/team";

export async function listTasks(filter?: {
  status?: TaskStatus;
  assigneeId?: string;
}): Promise<Task[]> {
  const r = (await callLambdaFunction("listTasks", filter ?? {})) as {
    tasks: Task[];
  };
  return r.tasks ?? [];
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const r = (await callLambdaFunction("createTask", input)) as { task: Task };
  return r.task;
}

export async function updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<Task> {
  const r = (await callLambdaFunction("updateTask", { taskId, updates })) as {
    task: Task;
  };
  return r.task;
}

export async function reorderTask(
  taskId: string,
  status: TaskStatus,
  order: number
): Promise<Task> {
  const r = (await callLambdaFunction("reorderTask", {
    taskId,
    status,
    order,
  })) as { task: Task };
  return r.task;
}

export async function deleteTask(taskId: string): Promise<void> {
  await callLambdaFunction("deleteTask", { taskId });
}

export async function listMembers(): Promise<Member[]> {
  const r = (await callLambdaFunction("listMembers", {})) as {
    members: Member[];
  };
  return r.members ?? [];
}

export async function createMember(
  input: Partial<Member> & { name: string }
): Promise<Member> {
  const r = (await callLambdaFunction("createMember", input)) as {
    member: Member;
  };
  return r.member;
}

export async function updateMember(
  memberId: string,
  updates: Partial<Member>
): Promise<Member> {
  const r = (await callLambdaFunction("updateMember", {
    memberId,
    updates,
  })) as { member: Member };
  return r.member;
}

export async function deleteMember(memberId: string): Promise<void> {
  await callLambdaFunction("deleteMember", { memberId });
}

// ----- notes -----
export async function listNotes(): Promise<Note[]> {
  const r = (await callLambdaFunction("listNotes", {})) as { notes: Note[] };
  return r.notes ?? [];
}

export async function createNote(
  input: Partial<Note> & { title: string }
): Promise<Note> {
  const r = (await callLambdaFunction("createNote", input)) as { note: Note };
  return r.note;
}

export async function updateNote(
  noteId: string,
  updates: Partial<Note>
): Promise<Note> {
  const r = (await callLambdaFunction("updateNote", { noteId, updates })) as {
    note: Note;
  };
  return r.note;
}

export async function deleteNote(noteId: string): Promise<void> {
  await callLambdaFunction("deleteNote", { noteId });
}

export async function uploadNotePdf(
  base64: string,
  filename: string
): Promise<{ pdfKey: string; pdfName: string }> {
  return (await callLambdaFunction("uploadNotePdf", {
    base64,
    filename,
  })) as { pdfKey: string; pdfName: string };
}

export async function getPdfUrl(key: string): Promise<string> {
  const r = (await callLambdaFunction("getPresignedUrl", { key })) as {
    url: string;
  };
  return r.url;
}

// ----- bugs -----
export async function listBugs(): Promise<Bug[]> {
  const r = (await callLambdaFunction("listBugs", {})) as { bugs: Bug[] };
  return r.bugs ?? [];
}

export async function createBug(
  input: Partial<Bug> & { title: string }
): Promise<Bug> {
  const r = (await callLambdaFunction("createBug", input)) as { bug: Bug };
  return r.bug;
}

export async function updateBug(
  bugId: string,
  updates: Partial<Bug>
): Promise<Bug> {
  const r = (await callLambdaFunction("updateBug", { bugId, updates })) as {
    bug: Bug;
  };
  return r.bug;
}

export async function deleteBug(bugId: string): Promise<void> {
  await callLambdaFunction("deleteBug", { bugId });
}
