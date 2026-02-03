import Layout from "components/Layout/Layout";
import PhotoItem from "components/Item/PhotoItem";
import TravelTime from "components/TravelTime";

export default function PavlovicaMostBrcko() {
  const photoStreams = [
    {
      title: "Pavlovića most",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://gp.satwork.net/AMSRS_05_GP_PM01/slika.jpg?v=",
      country: "bih",
    },
    {
      title: "Pavlovića most",
      desctiption: "ulaz u Srbiju",
      direction: "in",
      image: "https://gp.satwork.net/AMSRS_05_GP_PM02/slika.jpg?v=",
      country: "rs",
    },
  ];

  return (
    <Layout title="Pavlovića most → Brčko">
      <div className="route-info">
        <TravelTime route="pavlovica-most-brcko" />
      </div>
      <div className="grid-container">
        {photoStreams.map((item: any) => (
          <PhotoItem
            key={item.image}
            title={item.title}
            desctiption={item.desctiption}
            direction={item.direction}
            image={item.image}
            country={item.country}
          />
        ))}
      </div>
    </Layout>
  );
}
