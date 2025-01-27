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

export default function BatrovciBajakovoGunja() {
  const videoStreams = [
    {
      title: "Batrovci",
      element: "batrovci2",
      description: "izlaz iz Srbije",
      direction: "out",
      link: "https://kamere.amss.org.rs/batrovci2/batrovci2.m3u8",
      blob: "blob:https://kamere.amss.org.rs/6e1c1dad-2302-4e44-a3a7-ab67842e7ad5",
    },
  ];

  const photoStreams = [
    {
      title: "Bajakovo",
      desctiption: "ulaz u Hrvatsku",
      direction: "in",
      image: "https://www.hak.hr/info/kamere/2.jpg?v=",
      country: "hr",
    },
    {
      title: "Gunja",
      desctiption: "izlaz iz Hrvatske",
      direction: "out",
      image: "https://www.hak.hr/info/kamere/432.jpg?v=",
      country: "hr",
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
