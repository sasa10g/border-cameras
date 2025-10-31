// @ts-nocheck
import { useEffect } from "react";

import isSupported from "hls.js";
import Hls from "hls.js";

import Layout from "components/Layout/Layout";
import VideoItem from "components/Item/VideoItem";
import PhotoItem from "components/Item/PhotoItem";

declare global {
  interface Document {
    querySelector: any;
  }
}

export default function BackaPalankaIlokGunja() {
  const videoStreams: any[] = [];

  const photoStreams = [
    {
      title: "Bačka Palanka",
      desctiption: "izlaz iz Srbije",
      direction: "out",
      image: "",
      country: "rs",
    },
    {
      title: "Ilok",
      desctiption: "ulaz u Hrvatsku",
      direction: "in",
      image: "https://m.hak.hr/cam.asp?id=418&t=",
      country: "hr",
    },
    {
      title: "Gunja",
      desctiption: "izlaz iz Hrvatske",
      direction: "out",
      image: "https://www.hak.hr/info/kamere/432.jpg?v=",
      country: "hr",
    },
    {
      title: "Gunja",
      desctiption: "ulaz u Bosni",
      direction: "in",
      image: "",
      country: "bih",
    },
  ];

  const exportVideo = (element: string, link: any) => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById(element);
    video.style.visibility = "visible";

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(link);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = link;
      video.addEventListener("canplay", function () {
        video.play();
      });
    }
  };

  const onContextMenu = () => {
    return false;
  };

  useEffect(() => {
    videoStreams.map((item: any) => {
      exportVideo(item.element, item.link);
    });
  }, []);

  return (
    <Layout title="Srbija">
      <div className="grid-container">
        {videoStreams.map((item: any) => (
          <VideoItem
            key={item.element}
            title={item.title}
            desctiption={item.description}
            direction={item.direction}
            element={item.element}
            blob={item.blob}
          />
        ))}

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
