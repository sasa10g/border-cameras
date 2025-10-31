import Head from "next/head";
import Link from "next/link";
import TravelTime from "../components/TravelTime";

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
            <span className="card">
              <h3>
                <img src="/bih.png" />
                <span>Bosna</span>
              </h3>
              <p>&rarr; Gunja</p>
              <p>&rarr; Rača</p>
              <p>&rarr; Pavlović</p>
            </span>
          </Link>

          <Link href="/srbija" as="/srbija">
            <span className="card">
              <h3>
                <img src="/rs.png" />
                <span>Srbija</span>
              </h3>
              <p>&rarr; Batrovci</p>
              <p>&rarr; Sremska Rača</p>
            </span>
          </Link>

          <Link href="/hrvatska" as="/hrvatska">
            <span className="card">
              <h3>
                <img src="/hr.png" />
                <span>Hrvatska</span>
              </h3>
              <p>&rarr; Gunja</p>
              <p>&rarr; Bajakovo</p>
            </span>
          </Link>
        </div>

        <div className="routes-section">
          <div className="route-group">
            <h2 className="route-group-title">&rarr; BRČKO</h2>
            <div className="route-cards">
              <Link
                href="/batrovci-bajakovo-gunja"
                as="/batrovci-bajakovo-gunja"
              >
                <span className="card">
                  <h3>
                    <div className="flag-icons">
                      <img src="/rs.png" />
                      <img src="/hr.png" />
                      <img src="/bih.png" />
                    </div>
                  </h3>
                  <p>Batrovci &rarr; Bajakovo &rarr; Gunja</p>
                  <TravelTime route="batrovci-bajakovo-gunja" />
                </span>
              </Link>

              <Link
                href="/sremska-raca-bosanska-raca"
                as="/sremska-raca-bosanska-raca"
              >
                <span className="card">
                  <h3>
                    <div className="flag-icons">
                      <img src="/rs.png" />
                      <img src="/bih.png" />
                    </div>
                  </h3>
                  <p>Sremska Rača &rarr; Bosanska Rača</p>
                  <TravelTime route="sremska-raca-bosanska-raca" />
                </span>
              </Link>
            </div>
          </div>

          <div className="route-group">
            <h2 className="route-group-title">&rarr; NOVI SAD</h2>
            <div className="route-cards">
              <Link
                href="/gunja-bajakovo-batrovci"
                as="/gunja-bajakovo-batrovci"
              >
                <span className="card">
                  <h3>
                    <div className="flag-icons">
                      <img src="/bih.png" />
                      <img src="/hr.png" />
                      <img src="/rs.png" />
                    </div>
                  </h3>
                  <p>Gunja &rarr; Bajakovo &rarr; Batrovci</p>
                  <TravelTime route="gunja-bajakovo-batrovci" />
                </span>
              </Link>

              <Link
                href="/bosanska-raca-sremska-raca"
                as="/bosanska-raca-sremska-raca"
              >
                <span className="card">
                  <h3>
                    <div className="flag-icons">
                      <img src="/bih.png" />
                      <img src="/rs.png" />
                    </div>
                  </h3>
                  <p>Bosanska Rača &rarr; Sremska Rača</p>
                  <TravelTime route="bosanska-raca-sremska-raca" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://instagram.com/sasa10g"
          target="_blank"
          rel="noopener noreferrer"
        >
          sasa10g
        </a>
      </footer>
    </div>
  );
}
