import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdvertisementsListPage } from "./pages/AdvertisementsListPage/AdvertisementsListPage";
import { AdvertisementsItemPage } from "./pages/AdvertisementsItemPage/AdvertisementsItemPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdvertisementsListPage />} />
        <Route path="/list" element={<AdvertisementsListPage />} />
        <Route path="/item/:id" element={<AdvertisementsItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
