import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useLocalStorage from 'use-local-storage';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Detail from './pages/DetailsPage';
import TESTING from './pages/componentTESTPAGE';

function App() {

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
<main className='App' data-theme={isDark ? "dark" : "light"}>
  <Navbar isChecked={isDark} handleChange={() => setIsDark(!isDark)}/>
<BrowserRouter>
  <Routes>
    <Route
    path="/invoice-app-vite/"
    element={<Home />}
    />

<Route
    path="/invoice-app-vite/details/:code"
    element={<Detail />}
    />
  </Routes>
</BrowserRouter>
</main>
  )
}

export default App
