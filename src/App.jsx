import Clock from "./components/Clock";
import ThemeToggle from "./components/ThemeToggle";
import TaskList from "./components/TaskList";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productivity Dashboard</h1>
        <div className="flex gap-4 items-center">
          <Clock />
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList />
        <Notes />
      </main>
    </div>
  );
}

export default App;
