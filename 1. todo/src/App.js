import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './Page/MainPage';
import DetailPage from './Page/DetailPage';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
