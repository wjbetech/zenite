import Tasks from "./components/TasksGroup/Tasks";

export default function Home() {
  return (
    <div>
      <h1 className="underline underline-offset-[8px] decoration-blue-500 decoration-[8px]">All Tasks</h1>
      <Tasks />
    </div>
  );
}
