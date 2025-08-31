import { PrismaClient } from "@prisma/client";

// Helper to generate simple ids for the mock fallback
const genId = () => Math.random().toString(36).slice(2, 10);

let prisma: any = null;

try {
  // Try to instantiate PrismaClient normally
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    // reuse global in dev to prevent hot-reload duplication
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma;
  }
} catch (err) {
  // If Prisma binary/engine fails to load (common on some platforms during build),
  // fall back to an in-memory mock so the app can build and run locally.
  console.warn(
    "PrismaClient instantiation failed, using in-memory mock. Error:",
    err
  );

  const mockTasks: any[] = [];

  prisma = {
    // minimal task API surface used by this app
    task: {
      findMany: async (_args?: any) => {
        return mockTasks;
      },
      create: async ({ data }: { data: any }) => {
        const item = {
          id: genId(),
          title: data.title,
          description: data.description,
          date: data.date,
          isCompleted: data.isCompleted ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: data.userId ?? "mock-user",
        };
        mockTasks.push(item);
        return item;
      },
      update: async ({ where, data }: { where: any; data: any }) => {
        const idx = mockTasks.findIndex((t) => t.id === where.id);
        if (idx === -1) throw new Error("Not found");
        mockTasks[idx] = {
          ...mockTasks[idx],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return mockTasks[idx];
      },
      delete: async ({ where }: { where: any }) => {
        const idx = mockTasks.findIndex((t) => t.id === where.id);
        if (idx === -1) throw new Error("Not found");
        const [deleted] = mockTasks.splice(idx, 1);
        return deleted;
      },
    },
    // expose $disconnect to match PrismaClient API
    $disconnect: async () => {},
  } as any;
}

export default prisma;
