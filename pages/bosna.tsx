import Layout from "components/Layout/Layout";
import PhotoItem from "components/Item/PhotoItem";

export default function Bosna() {
  const photoStreams = [
    {
      title: "Gunja",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://video-nadzor.bihamk.ba/videosurveillence/BRCKO.jpg?",
      country: "bih",
    },
    {
      title: "Rača",
      desctiption: "ulaz u Bosne",
      direction: "in",
      image: "https://gp.satwork.net/AMSRS_02_GP_RA02/slika.jpg?v=",
      country: "bih",
    },
    {
      title: "Rača",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://gp.satwork.net/AMSRS_02_GP_RA01/slika.jpg?v=",
      country: "bih",
    },
    {
      title: "Pavlovića most",
      desctiption: "ulaz u Bosne",
      direction: "in",
      image: "https://gp.satwork.net/AMSRS_05_GP_PM02/slika.jpg?v=",
      country: "bih",
    },
    {
      title: "Pavlovića most",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://gp.satwork.net/AMSRS_05_GP_PM01/slika.jpg?v=",
      country: "bih",
    },
  ];

  return (
    <Layout title="Bosna">
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
    </Layout>
  );
}
