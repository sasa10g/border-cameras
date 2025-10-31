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

export default function GunjaIlokBackaPalanka() {
  const videoStreams: any[] = [];

  const photoStreams = [
    {
      title: "Gunja",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://video-nadzor.bihamk.ba/videosurveillence/BRCKO.jpg?",
      country: "bih",
    },
    {
      title: "Gunja",
      desctiption: "ulaz u Hrvatsku",
      direction: "in",
      image: "https://www.hak.hr/info/kamere/431.jpg?v=",
      country: "hr",
    },
    {
      title: "Ilok",
      desctiption: "izlaz iz Hrvatske",
      direction: "out",
      image: "https://m.hak.hr/cam.asp?id=417&t=",
      country: "hr",
    },
    {
      title: "Bačka Palanka",
      desctiption: "ulaz u Srbiju",
      direction: "in",
      image: "",
      country: "rs",
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
      </div>
    </Layout>
  );
}
