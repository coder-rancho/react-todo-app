import Todos from './components/Todos';
import './App.css';

/**
 * App component serves as the main entry point for the Todo application.
 *
 * @returns {JSX.Element} The rendered App component
 */
const App = () => {
  return (
    <div className='todo-app'>
      <Todos />
    </div>
  );
};

export default App;
