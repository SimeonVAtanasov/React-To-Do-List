import './App.css';
import TaskForm from "./TaskForm"

function App() {
  return (
    <div className="container" id="container">
      <h1>TO DO LIST</h1>
      <header id="header">
        <div className="box">
          <h2>Your tasks To Do:</h2>

        </div>
      </header>

      <TaskForm />

      <footer>
        <h3>By Simo.Atanasov</h3>
      </footer>
    </div>
  );
}

export default App;
