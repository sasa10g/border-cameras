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

export default function BosanskaRacaSremskaRaca() {
  const videoStreams = [
    {
      title: "Sremska Rača",
      element: "sremskaraca1",
      description: "ulaz u Srbiju",
      direction: "in",
      link: "http://77.46.142.211:8081/SremskaRaca/sremskaraca1.m3u8",
      blob: "blob:http://www.mup.gov.rs/c6f2ec93-f95c-4581-a025-caaa1c95f94c",
    },
  ];

  const photoStreams = [
    {
      title: "Rača",
      desctiption: "izlaz iz Bosne",
      direction: "out",
      image: "https://gp.satwork.net/AMSRS_02_GP_RA01/slika.jpg?v=",
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
