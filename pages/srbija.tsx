// @ts-nocheck
import { useEffect } from "react";

import isSupported from 'hls.js'
import Hls from 'hls.js'

import Layout from 'components/Layout/Layout'
import VideoItem from 'components/Item/VideoItem'

declare global {
  interface Document {
    querySelector: any
  }
}

export default function Srbija() {

  const videoStreams = [
    {
      title: 'Batrovci',
      element: 'batrovci1',
      description: "ulaz u Srbiju",
      direction: "in",
      link: "http://77.46.142.211:8081/Batrovci/batrovci1.m3u8",
      blob: "blob:http://www.mup.gov.rs/daa85222-3945-4281-9128-0566bb7f88c9"
    },


    {
      title: 'Batrovci',
      element: 'batrovci2',
      description: "izlaz iz Srbije",
      direction: "out",
      link: "http://77.46.142.211:8081/Batrovci/batrovci2.m3u8",
      blob: "blob:http://www.mup.gov.rs/c1f7b8e7-bd5e-4559-bb53-a3cb69cb49a9"
    },
    {
      title: 'Sremska Rača',
      element: 'sremskaraca1',
      description: "ulaz u Srbiju",
      direction: "in",
      link: "http://77.46.142.211:8081/SremskaRaca/sremskaraca1.m3u8",
      blob: "blob:http://www.mup.gov.rs/c6f2ec93-f95c-4581-a025-caaa1c95f94c"
    },
    {
      title: 'Sremska Rača',
      element: 'sremskaraca2',
      description: "izlaz iz Srbije",
      direction: "out",
      link: "http://77.46.142.211:8081/SremskaRaca/sremskaraca2.m3u8",
      blob: "blob:http://www.mup.gov.rs/ca633ecf-9b83-45a1-9150-114ced982e22"
    },
  ]

  const exportVideo = (element: string, link: any) => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById(element)
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
  }

  const onContextMenu = () => { return false }

  useEffect(() => {
    videoStreams.map((item: any) => {
      exportVideo(item.element, item.link)
    })

  }, [])

  return (
    <Layout title='Srbija'>
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

      </div>
    </Layout>
  );
}
