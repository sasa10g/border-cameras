import Layout from "components/Layout/Layout";
import PhotoItem from "components/Item/PhotoItem";

function Hrvatska() {
  const photoStreams = [
    {
      title: "Gunja",
      desctiption: "ulaz u Hrvatsku",
      direction: 'in',
      image: "https://www.hak.hr/info/kamere/431.jpg?v=",
      country: "hr",
    },
    {
      title: "Gunja",
      desctiption: "izlaz iz Hrvatske",
      direction: 'out',
      image: "https://www.hak.hr/info/kamere/432.jpg?v=",
      country: "hr",
    },
    {
      title: "Bajakovo",
      desctiption: "ulaz u Hrvatsku",
      direction: 'in',
      image: "https://www.hak.hr/info/kamere/2.jpg?v=",
      country: "hr",
    },
    {
      title: "Bajakovo",
      desctiption: "izlaz iz Hrvatske",
      direction: 'out',
      image: "https://www.hak.hr/info/kamere/3.jpg?v=",
      country: "hr",
    }
  ]

  return (
    <Layout title="Hrvatska">
      {photoStreams.map((item: any) => (
        <PhotoItem
          key={item.image}
          title={item.title}
          desctiption={item.desctiption}
          direction={item.direction}
          image={item.image}
          country={item.country} />
      ))}
    </Layout>
  );
}

export default Hrvatska;