import './App.css';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard from './Dashboard.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;