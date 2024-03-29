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

export default function SremskaRacaBosanskaRaca() {
  const videoStreams = [
    {
      title: "Sremska Rača",
      element: "sremskaraca2",
      description: "izlaz iz Srbije",
      direction: "out",
      link: "http://77.46.142.211:8081/SremskaRaca/sremskaraca2.m3u8",
      blob: "blob:http://www.mup.gov.rs/ca633ecf-9b83-45a1-9150-114ced982e22",
    },
  ];

  const photoStreams = [
    {
      title: "Rača",
      desctiption: "ulaz u Bosne",
      direction: "in",
      image: "https://gp.satwork.net/AMSRS_02_GP_RA02/slika.jpg?v=",
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
