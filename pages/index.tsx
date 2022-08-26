import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Border Cameras</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>

      <main>
        <h1 className="title">
          Granične <a href="/">Kamere!</a>
        </h1>

        <p className="description">
          <img width="100px" src="/favicon.ico" />
        </p>

        <div className="grid">
          <Link href="/bosna" as="/bosna">
            <a className="card">
              <h3>
                <img src="/bih.png" />
                Bosna
              </h3>
              <p>&rarr; Gunja</p>
              <p>&rarr; Rača</p>
              <p>&rarr; Pavlović</p>
            </a>
          </Link>

          <Link href="/srbija" as="/srbija">
            <a className="card">
              <h3>
                <img src="/rs.png" /> Srbija
              </h3>
              <p>&rarr; Batrovci</p>
              <p>&rarr; Sremska Rača</p>
            </a>
          </Link>

          <Link href="/hrvatska" as="/hrvatska">
            <a className="card">
              <h3>
                <img src="/hr.png" /> Hrvatska
              </h3>
              <p>&rarr; Gunja</p>
              <p>&rarr; Bajakovo</p>
            </a>
          </Link>
        </div>

        <div className="grid-path">
          <Link href="/batrovci-bajakovo-gunja" as="/batrovci-bajakovo-gunja">
            <a className="card">
              <h3>
                <img src="/rs.png" />
                <img src="/hr.png" />
                <img src="/bih.png" /> Novi Sad &rarr; Brčko
              </h3>
              <p>Batrovci &rarr; Bajakovo &rarr; Gunja</p>
            </a>
          </Link>

          <Link href="/gunja-bajakovo-batrovci" as="/gunja-bajakovo-batrovci">
            <a className="card">
              <h3>
                <img src="/bih.png" />
                <img src="/hr.png" />
                <img src="/rs.png" /> Brčko &rarr; Novi Sad
              </h3>
              <p>Gunja &rarr; Bajakovo &rarr; Batrovci</p>
            </a>
          </Link>

          <Link
            href="/sremska-raca-bosanska-raca"
            as="/sremska-raca-bosanska-raca"
          >
            <a className="card">
              <h3>
                <img src="/rs.png" />
                <img src="/bih.png" /> Novi Sad &rarr; Brčko
              </h3>
              <p>Sremska Rača &rarr; Bosanska Rača</p>
            </a>
          </Link>

          <Link
            href="/bosanska-raca-sremska-raca"
            as="/bosanska-raca-sremska-raca"
          >
            <a className="card">
              <h3>
                <img src="/bih.png" />
                <img src="/rs.png" /> Brčko &rarr; Novi Sad
              </h3>
              <p>Bosanska Rača &rarr; Sremska Rača</p>
            </a>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/sasa10g"
          target="_blank"
          rel="noopener noreferrer"
        >
          sasa10g
        </a>
      </footer>
    </div>
  );
}
