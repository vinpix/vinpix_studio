/**
 * Typed client for the /team lambda functions.
 * callLambdaFunction already unwraps the `body`, so each wrapper just casts.
 */
import { callLambdaFunction } from "./auth";
import type {
  Task,
  Member,
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
