import { useEffect, useState } from "react";
import { Advertisement } from "./entities/Advertisement/UI/Advertisement";
import type { IAdvertisement } from "./entities/Advertisement/types/Advertisement";
import "./App.css";

function App() {
  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/ads")
      .then((response) => response.json())
      .then((data) => setAdvertisements(data.ads));
  }, []);

  return (
    <>
      {advertisements.map((advertisement) => (
        <Advertisement
          key={advertisement.id}
          id={advertisement.id}
          title={advertisement.title}
          price={advertisement.price}
          category={advertisement.category}
          createdAt={advertisement.createdAt}
        />
      ))}
    </>
  );
}

export default App;
