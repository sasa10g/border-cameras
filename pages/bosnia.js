import Head from "next/head";

function Bosnia() {
  var newDate =
    "https://bihamk.ba/assets/video-surveillance/BRCKO.jpg?v=" + new Date();

  function onClick() {
    window.location.reload();
  }
  return (
    <div className="container">
      <Head>
        <title>Border Cameras</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main>
        <h1 className="title">
          Border <a href="/"> Bosnia!</a>
        </h1>
        <p className="description">
          <img width="100px" src="/favicon.ico" />

          <button className="reset-button" onClick={onClick}>
            Reset
          </button>
        </p>
        <div className="camera-container">
          <div className="flag-title">
            <img className="flags" src="/bih.png" />
            Gunja &rarr;
          </div>
          <img className="cameras" src={newDate} />
        </div>

        <div className="camera-container">
          <div className="flag-title">
            <img className="flags" src="/bih.png" />
            Rača &larr;
          </div>
          <img
            className="cameras"
            src="http://139.59.212.224/AMSRS_02_GP_RA02/slika.jpg"
          />
        </div>

        <div className="camera-container">
          <div className="flag-title">
            <img className="flags" src="/bih.png" />
            Rača &rarr;
          </div>
          <img
            className="cameras"
            src="http://139.59.212.224/AMSRS_02_GP_RA01/slika.jpg"
          />
        </div>

        <div className="camera-container">
          <div className="flag-title">
            <img className="flags" src="/bih.png" />
            Pavlović &larr;
          </div>
          <img
            className="cameras"
            src="http://139.59.212.224/AMSRS_05_GP_PM01/slika.jpg"
          />
        </div>

        <div className="camera-container">
          <div className="flag-title">
            <img className="flags" src="/bih.png" />
            Pavlović &rarr;
          </div>
          <img
            className="cameras"
            src="http://139.59.212.224/AMSRS_05_GP_PM02/slika.jpg"
          />
        </div>
      </main>

      <footer>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Dev
        </a>
      </footer>

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
          display: block;
          border: none;
          background-color: #0070f3;
          color: #fff;
          font-size: 16px;
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

        .flag-title {
          text-align: center;
          margin-bottom: 10px;
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
          font-size: 4rem;
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

export default Bosnia;
