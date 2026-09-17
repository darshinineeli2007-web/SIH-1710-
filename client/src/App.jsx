import { useState } from "react";
import "./App.css";

function App() {
  const [destination, setDestination] = useState("");
  const [accessible, setAccessible] = useState(false);
  const [route, setRoute] = useState([]);

  const facilities = [
    "Platform 1",
    "Platform 2",
    "Ticket Counter",
    "Restroom",
    "Food Court",
    "Waiting Hall",
    "ATM",
    "Lift",
    "Escalator",
  ];

  // Station map positions
  const positions = {
    "Platform 1": { x: 18, y: 82 },
    "Platform 2": { x: 82, y: 82 },
    "Ticket Counter": { x: 18, y: 18 },
    "Waiting Hall": { x: 82, y: 18 },
    "Restroom": { x: 78, y: 48 },
    "Food Court": { x: 22, y: 48 },
    ATM: { x: 65, y: 30 },
    Lift: { x: 50, y: 65 },
    Escalator: { x: 35, y: 65 },
  };

  const currentLocation = {
    x: 50,
    y: 88,
  };

  // Find route
  const findRoute = () => {
    if (!destination) {
      alert("Please select a destination");
      return;
    }

    const destinationPoint = positions[destination];

    if (!destinationPoint) {
      return;
    }

    if (accessible) {
      setRoute([
        currentLocation,
        positions["Lift"],
        destinationPoint,
      ]);
    } else {
      setRoute([
        currentLocation,
        { x: 50, y: 60 },
        destinationPoint,
      ]);
    }
  };

  // Facility card navigation
  const navigateFacility = (facility) => {
    setDestination(facility);

    const destinationPoint = positions[facility];

    if (!destinationPoint) {
      return;
    }

    if (accessible) {
      setRoute([
        currentLocation,
        positions["Lift"],
        destinationPoint,
      ]);
    } else {
      setRoute([
        currentLocation,
        { x: 50, y: 60 },
        destinationPoint,
      ]);
    }

    // Scroll to map
    document
      .getElementById("navigation")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="logo">
          🚆 RailNav
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#navigation">Navigation</a>
          <a href="#facilities">Facilities</a>
          <a href="#features">Features</a>
        </nav>

      </header>


      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="tag">
            SMART RAILWAY NAVIGATION
          </p>

          <h1>
            Navigate Railway Stations
            <span>with Ease</span>
          </h1>

          <p className="description">
            Find platforms, ticket counters, restrooms,
            food courts and other facilities with simple
            and accessible navigation.
          </p>


          {/* Navigation Box */}

          <div className="navigation-box">

            <label>
              Select your destination
            </label>

            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setRoute([]);
              }}
            >

              <option value="">
                Choose a facility or platform
              </option>

              {facilities.map((facility) => (
                <option
                  key={facility}
                  value={facility}
                >
                  {facility}
                </option>
              ))}

            </select>


            {/* Accessibility */}

            <label className="checkbox">

              <input
                type="checkbox"
                checked={accessible}
                onChange={(e) => {
                  setAccessible(e.target.checked);
                  setRoute([]);
                }}
              />

              ♿ Accessible route

            </label>


            {/* Find Route Button */}

            <button onClick={findRoute}>
              🧭 Find Route
            </button>

          </div>

        </div>

      </section>


      {/* ================= MAP ================= */}

      <section
        className="map-section"
        id="navigation"
      >

        <div className="section-heading">

          <p>
            LIVE STATION MAP
          </p>

          <h2>
            Interactive Station Map
          </h2>

          <span>
            Select a destination to find your route.
          </span>

        </div>


        {/* Station Map */}

        <div className="station-map">


          {/* Route Line */}

          {route.length > 0 && (

            <svg
              className="route-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >

              <polyline
                points={route
                  .map(
                    (point) =>
                      `${point.x},${point.y}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#2563eb"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

            </svg>

          )}


          {/* Main Entrance */}

          <div className="map-label entrance">
            🚪 Main Entrance
          </div>


          {/* Ticket Counter */}

          <div className="map-label ticket">
            🎫 Ticket Counter
          </div>


          {/* Waiting Hall */}

          <div className="map-label waiting">
            🪑 Waiting Hall
          </div>


          {/* Food Court */}

          <div className="map-label food">
            🍴 Food Court
          </div>


          {/* Restroom */}

          <div className="map-label toilet">
            🚻 Restroom
          </div>


          {/* Lift */}

          <div className="map-label lift">
            ♿ Lift
          </div>


          {/* ATM */}

          <div
            className="map-label"
            style={{
              top: "25%",
              left: "60%",
            }}
          >
            🏧 ATM
          </div>


          {/* Escalator */}

          <div
            className="map-label"
            style={{
              bottom: "20%",
              left: "25%",
            }}
          >
            🛗 Escalator
          </div>


          {/* Platform 1 */}

          <div className="platform platform-one">
            PLATFORM 1
          </div>


          {/* Platform 2 */}

          <div className="platform platform-two">
            PLATFORM 2
          </div>


          {/* Current Location */}

          <div className="you">
            📍 YOU ARE HERE
          </div>


          {/* Destination Marker */}

          {destination &&
            positions[destination] && (

              <div
                className="destination-marker"
                style={{
                  left: `${positions[destination].x}%`,
                  top: `${positions[destination].y}%`,
                }}
              >
                🎯
              </div>

            )}

        </div>


        {/* ================= ROUTE INFORMATION ================= */}

        {route.length > 0 && (

          <div className="route-info">

            <h3>
              🧭 Route Found
            </h3>

            <p>
              <strong>
                Destination:
              </strong>{" "}
              {destination}
            </p>

            <p>
              <strong>
                Route:
              </strong>{" "}
              {accessible
                ? `Main Entrance → Lift → ${destination}`
                : `Main Entrance → Central Path → ${destination}`}
            </p>

            <p>
              {accessible
                ? "♿ Accessible route using Lift"
                : "🚶 Shortest available route"}
            </p>

          </div>

        )}

      </section>


      {/* ================= FACILITIES ================= */}

      <section
        className="facilities"
        id="facilities"
      >

        <div className="section-heading">

          <p>
            EXPLORE
          </p>

          <h2>
            Station Facilities
          </h2>

          <span>
            Quickly find important facilities inside
            the station.
          </span>

        </div>


        <div className="facility-grid">

          {facilities.map((facility) => (

            <div
              className="facility-card"
              key={facility}
            >

              <div className="facility-icon">
                📍
              </div>

              <h3>
                {facility}
              </h3>

              <p>
                Available inside the railway station
              </p>

              <button
                onClick={() =>
                  navigateFacility(facility)
                }
              >
                Navigate
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="features"
      >

        <div className="section-heading">

          <p>
            KEY FEATURES
          </p>

          <h2>
            Smart & Accessible
          </h2>

        </div>


        <div className="feature-grid">


          {/* Interactive Map */}

          <div className="feature-card">

            <div>
              🗺️
            </div>

            <h3>
              Interactive Map
            </h3>

            <p>
              View platforms, facilities and
              important locations.
            </p>

          </div>


          {/* Smart Navigation */}

          <div className="feature-card">

            <div>
              🧭
            </div>

            <h3>
              Smart Navigation
            </h3>

            <p>
              Find suitable routes to your
              destination.
            </p>

          </div>


          {/* Voice Guidance */}

          <div className="feature-card">

            <div>
              🔊
            </div>

            <h3>
              Voice Guidance
            </h3>

            <p>
              Voice instructions can assist
              passengers.
            </p>

          </div>


          {/* Accessibility */}

          <div className="feature-card">

            <div>
              ♿
            </div>

            <h3>
              Accessibility
            </h3>

            <p>
              Routes can prioritize lifts, ramps
              and accessible paths.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <h3>
          🚆 RailNav
        </h3>

        <p>
          Smart Railway Station Navigation System
        </p>

        <small>
          SIH 1710 | Ministry of Railways
        </small>

      </footer>

    </div>
  );
}

export default App;