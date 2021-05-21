// @ts-nocheck
import { useEffect } from "react";
import Head from "next/head";

import isSupported from 'hls.js'
import Hls from 'hls.js'

declare global {
  interface Document {
    querySelector: any
  }
}
export default function Srbija() {
  useEffect(() => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById("batrovci1");
    video.style.visibility = "visible";

    var source = "http://77.46.142.211:8081/Batrovci/batrovci1.m3u8";

    if (isSupported) {
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("canplay", function() {
        video.play();
      });
    }
  }, []);

  useEffect(() => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById("batrovci2");
    video.style.visibility = "visible";

    var source = "http://77.46.142.211:8081/Batrovci/batrovci2.m3u8";

    if (isSupported) {
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("canplay", function() {
        video.play();
      });
    }
  }, []);

  useEffect(() => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById("sremskaraca1");
    video.style.visibility = "visible";

    var source = "http://77.46.142.211:8081/SremskaRaca/sremskaraca1.m3u8";

    if (isSupported) {
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("canplay", function() {
        video.play();
      });
    }
  }, []);

  useEffect(() => {
    //  Za kameru koja je odabrana, priprema i pusta video
    var video = document.getElementById("sremskaraca2");
    video.style.visibility = "visible";

    var source = "http://77.46.142.211:8081/SremskaRaca/sremskaraca2.m3u8";

    if (isSupported) {
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("canplay", function() {
        video.play();
      });
    }
  }, []);

  function onClick() {
    window.location.reload();
  }

  return (
    <div className="container">
      <Head>
        <title>Srbija - Granica kamere</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      </Head>

      <main>
      <div className="main-title">
        <a href="/"><img style={{width: '50px'}} src="left-arrow.png" /></a> 
        <h1 className="title">🇷🇸 Srbija</h1>
        </div>
        <p className="description">
          <img width="100px" src="/favicon.ico" />
          <button className="reset-button" onClick={onClick}>
            Reset
          </button>
        </p>

        <div className="grid-container">
        <div className="camera-container">
          <div className="flag-title">
            <span className="flag-title-span">
              <img className="flags" src="/rs.png" />
              &larr;
            </span>
            <span className="title-span"><strong>Batrovci</strong> ulaz u Srbiju</span>
          </div>

          <video
            className="kamera"
            id="batrovci1"
            controls="controls"
            src="blob:https://kamere.amss.org.rs/d658f909-c459-403d-a50e-e9fcbabbf1ad"
          ></video>
        </div>

        <div className="camera-container">
        <div className="flag-title">
            <span className="flag-title-span">
              <img className="flags" src="/rs.png" />
              &rarr;
            </span>
            <span className="title-span"><strong>Batrovci</strong> izlaz iz Srbije</span>
          </div>

          <video
            className="kamera"
            id="batrovci2"
            controls="controls"
            src="blob:http://www.mup.gov.rs/e802a5f1-2605-404f-bc6d-b8a9bfacdab6"
          ></video>
        </div>
        </div>

        <div className="camera-container">
        <div className="flag-title">
            <span className="flag-title-span">
              <img className="flags" src="/rs.png" />
              &rarr;
            </span>
            <span className="title-span"><strong>Rača</strong> ulaz u Srbiju</span>
          </div>

          <video
            className="kamera"
            id="sremskaraca1"
            controls="controls"
            src="blob:http://www.mup.gov.rs/3b61d786-255c-4df1-bd3e-db412f1596c5"
          ></video>
        </div>

        <div className="camera-container">
        <div className="flag-title">
            <span className="flag-title-span">
              <img className="flags" src="/rs.png" />
              &rarr;
            </span>
            <span className="title-span"><strong>Rača</strong> izlaz iz Srbije</span>
          </div>

          <video
            className="kamera"
            id="sremskaraca2"
            controls="controls"
            src="blob:http://www.mup.gov.rs/263d792a-1a00-462f-8e18-561ddaffad55"
            
          ></video>
        </div>
      </main>

      <footer>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Dev
        </a>
      </footer>

      <style jsx global>{`
        .imageContainer {
          border-radius: 20px;
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .reset-button {
          width: 200px;
          height: 50px;
          border-radius: 20px;
          display: block;
          border: none;
          background-color: #0070f3;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
        video {
          width: 1200px !important;
          max-width: 100%;
          height: auto !important;
          border-radius: 20px;
        }
        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .camera-container {
          margin-bottom: 20px;
        }
        .cameras {
          width: 100%;
        }
        .main-title {
          display: grid;
          grid-template-columns: 20% 80%;
          align-items: center;
          justify-items: center;
          padding: 0;
          width: 100%;
        }
        .flag-title {
          display: grid;
          grid-template-columns: 30% 70%;
          align-items: center;
          padding: 0;

          text-align: center;
          margin-bottom: 10px;

          background-color: #f9f9f9;
          border-radius: 20px;
        }
        .flag-title-span {
          margin-right: 10px;
          padding: 10px;
          border-radius: 20px;
          background-color: #eef0f2;
        }
        .title-span {
          justify-self: right;
          padding-right: 20px;
        }
        .flags {
          width: 20px;
          margin-right: 5px;
          vertical-align: bottom;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          justify-self: right;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card {
          margin: 1rem;
          width: fill-available;
          width: -webkit-fill-available;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}