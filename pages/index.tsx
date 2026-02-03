import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import TravelTime from "../components/TravelTime";

export default function Home() {
  const [brckoExpanded, setBrckoExpanded] = useState(true);
  const [noviSadExpanded, setNoviSadExpanded] = useState(true);
  const [sveKamereExpanded, setSveKamereExpanded] = useState(true);

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

        <div className="routes-section">
          <div className="route-group">
            <h2
              className="route-group-title collapsible"
              onClick={() => setBrckoExpanded(!brckoExpanded)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <span></span> &rarr; BRČKO
            </h2>
            {brckoExpanded && (
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

                <Link
                  href="/backapalanka-ilok-gunja"
                  as="/backapalanka-ilok-gunja"
                >
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/rs.png" />
                        <img src="/hr.png" />
                        <img src="/bih.png" />
                      </div>
                    </h3>
                    <p>Bačka Palanka &rarr; Ilok &rarr; Gunja</p>
                    <TravelTime route="backapalanka-ilok-gunja" />
                  </span>
                </Link>

                <Link
                  href="/pavlovica-most-brcko"
                  as="/pavlovica-most-brcko"
                >
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/rs.png" />
                        <img src="/bih.png" />
                      </div>
                    </h3>
                    <p>Pavlovića most</p>
                    <TravelTime route="pavlovica-most-brcko" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="route-group">
            <h2
              className="route-group-title collapsible"
              onClick={() => setNoviSadExpanded(!noviSadExpanded)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <span></span> &rarr; NOVI SAD
            </h2>
            {noviSadExpanded && (
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

                <Link
                  href="/gunja-ilok-backapalanka"
                  as="/gunja-ilok-backapalanka"
                >
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/bih.png" />
                        <img src="/hr.png" />
                        <img src="/rs.png" />
                      </div>
                    </h3>
                    <p>Gunja &rarr; Ilok &rarr; Bačka Palanka</p>
                    <TravelTime route="gunja-ilok-backapalanka" />
                  </span>
                </Link>

                <Link
                  href="/pavlovica-most-novisad"
                  as="/pavlovica-most-novisad"
                >
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/bih.png" />
                        <img src="/rs.png" />
                      </div>
                    </h3>
                    <p>Pavlovića most</p>
                    <TravelTime route="pavlovica-most-novisad" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="route-group">
            <h2
              className="route-group-title collapsible"
              onClick={() => setSveKamereExpanded(!sveKamereExpanded)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <span></span> Sve kamere
            </h2>

            {sveKamereExpanded && (
              <div className="route-cards">
                <Link href="/bosna" as="/bosna">
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/bih.png" />
                      </div>
                    </h3>
                    <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                      Bosna
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Gunja
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Rača
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Pavlović
                    </p>
                  </span>
                </Link>

                <Link href="/srbija" as="/srbija">
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/rs.png" />
                      </div>
                    </h3>
                    <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                      Srbija
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Batrovci
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Sremska Rača
                    </p>
                  </span>
                </Link>

                <Link href="/hrvatska" as="/hrvatska">
                  <span className="card">
                    <h3>
                      <div className="flag-icons">
                        <img src="/hr.png" />
                      </div>
                    </h3>
                    <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                      Hrvatska
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Gunja
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      &rarr; Bajakovo
                    </p>
                  </span>
                </Link>
              </div>
            )}
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
