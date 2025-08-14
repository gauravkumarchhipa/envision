// let map, placesService, clusterer;
// const markers = [];
// const seen = new Set();
// let fetchTimer = null;

// // make initMap global so Google loader can call it
// window.initMap = function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 39.8283, lng: -98.5795 }, // USA center
//     zoom: 5,
//     mapTypeControl: false,
//     streetViewControl: false,
//   });

//   placesService = new google.maps.places.PlacesService(map);
//   clusterer = new markerClusterer.MarkerClusterer({ map, markers });

//   map.addListener("idle", () => {
//     if (map.getZoom() < 5) return;       // avoid spamming API at very wide zooms
//     clearTimeout(fetchTimer);
//     fetchTimer = setTimeout(fetchStationsInView, 300);
//   });

//   fetchStationsInView();
// };

// function fetchStationsInView() {
//   const bounds = map.getBounds();
//   if (!bounds) return;

//   const request = {
//     location: bounds.getCenter(),
//     radius: 50000,
//     type: "electric_vehicle_charging_station",
//   };

//   const centers = samplePointsAcrossBounds(bounds, 5);
//   centers.forEach((pt, idx) => {
//     setTimeout(() => doNearbySearch({ ...request, location: pt }), idx * 350);
//   });
// }

// function doNearbySearch(req) {
//   placesService.nearbySearch(req, (results, status, pagination) => {
//     if (status !== google.maps.places.PlacesServiceStatus.OK || !results) return;

//     const newMarkers = [];
//     for (const place of results) {
//       if (!place.place_id || seen.has(place.place_id)) continue;
//       seen.add(place.place_id);

//       const marker = new google.maps.Marker({
//         position: place.geometry.location,
//         title: place.name,
//       });

//       const iw = new google.maps.InfoWindow({
//         content: `
//           <div style="max-width:240px">
//             <strong>${place.name || "Charging Station"}</strong><br/>
//             ${place.vicinity || ""}<br/>
//             <small>Rating: ${place.rating || "N/A"}</small>
//           </div>`
//       });
//       marker.addListener("click", () => iw.open({ map, anchor: marker }));
//       newMarkers.push(marker);
//     }

//     if (newMarkers.length) {
//       markers.push(...newMarkers);
//       clusterer.addMarkers(newMarkers);
//     }

//     if (pagination && pagination.hasNextPage) {
//       setTimeout(() => pagination.nextPage(), 800);
//     }
//   });
// }

// function samplePointsAcrossBounds(bounds, n) {
//   const pts = [];
//   const sw = bounds.getSouthWest();
//   const ne = bounds.getNorthEast();
//   for (let i = 0; i < n; i++) {
//     const lat = sw.lat() + Math.random() * (ne.lat() - sw.lat());
//     const lng = sw.lng() + Math.random() * (ne.lng() - sw.lng());
//     pts.push(new google.maps.LatLng(lat, lng));
//   }
//   pts.push(bounds.getCenter());
//   return pts;
// }

// /src/js/pages/map.js



const USA_BOUNDS = { north: 49.38, south: 24.52, west: -124.77, east: -66.95 };

// OpenChargeMap (no key, but can be rate limited on some hosts)
const OCM_URL =
  "https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=10000&compact=true&verbose=false";

// (Optional, very reliable) NREL — get a free key and replace YOUR_NREL_KEY below
// Docs: https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/
// const NREL_BASE = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json";
// const NREL_PARAMS = "&fuel_type=ELEC&country=US&status=E&limit=2000&api_key=YOUR_NREL_KEY";

window.initMap = async function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) {
    console.error("#map element not found");
    return;
  }

  const map = new google.maps.Map(mapEl, {
    center: { lat: 39.5, lng: -98.35 },
    zoom: 4,
    mapTypeControl: false,
    streetViewControl: false,
  });

  // Fit to USA
  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(USA_BOUNDS.south, USA_BOUNDS.west),
    new google.maps.LatLng(USA_BOUNDS.north, USA_BOUNDS.east)
  );
  map.fitBounds(bounds);

  // ---- Load data ----
  let stations = [];
  try {
    stations = await fetchOCM(); // or: stations = await fetchNREL();
    console.log("Stations loaded:", stations.length);
  } catch (err) {
    console.error("Station fetch failed:", err);
    showToast(map, "Failed to load EV stations (check console).");
    // Fallback: draw nothing
    return;
  }

  if (!Array.isArray(stations) || stations.length === 0) {
    console.warn("No stations returned");
    showToast(map, "No stations found from the API.");
    return;
  }

  // ---- Make markers ----
  const markers = [];
  for (const s of stations) {
    const lat = s?.AddressInfo?.Latitude ?? s?.latitude ?? s?.Location?.lat;
    const lng = s?.AddressInfo?.Longitude ?? s?.longitude ?? s?.Location?.lng;
    if (typeof lat !== "number" || typeof lng !== "number") continue;

    const name = s?.AddressInfo?.Title || s?.station_name || "EV Station";
    const addr = s?.AddressInfo?.AddressLine1 || s?.street_address || "";

    const m = new google.maps.Marker({
      position: { lat, lng },
      title: name,
    });

    const info = new google.maps.InfoWindow({
      content: `<div style="max-width:220px"><strong>${escapeHtml(
        name
      )}</strong><br/><small>${escapeHtml(addr)}</small></div>`,
    });
    m.addListener("click", () => info.open({ anchor: m, map }));
    markers.push(m);
  }

  console.log("Markers created:", markers.length);
  if (!markers.length) {
    showToast(map, "No mappable stations (missing coordinates).");
    return;
  }

  // ---- Cluster ----
  if (!window.markerClusterer || !markerClusterer.MarkerClusterer) {
    console.error("MarkerClusterer not loaded");
    showToast(map, "Clustering library missing.");
    return;
  }
  new markerClusterer.MarkerClusterer({ map, markers });
};

// ----- Fetchers -----
async function fetchOCM() {
  const res = await fetch(OCM_URL, { method: "GET" });
  if (!res.ok) throw new Error(`OCM ${res.status}`);
  return res.json();
}

/*
// NREL version (uncomment and set your key):
async function fetchNREL() {
  let results = [];
  let offset = 0;
  const pageSize = 2000;
  while (true) {
    const url = `${NREL_BASE}?format=json&offset=${offset}&limit=${pageSize}${NREL_PARAMS}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`NREL ${res.status}`);
    const data = await res.json();
    const items = data?.fuel_stations || [];
    results = results.concat(items);
    if (items.length < pageSize) break;
    offset += pageSize;
  }
  return results;
}
*/

// ----- Helpers -----
function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ])
  );
}

function showToast(map, msg) {
  const div = document.createElement("div");
  div.textContent = msg;
  div.style.cssText =
    "position:absolute;top:10px;left:10px;z-index:5;background:#222;color:#fff;padding:8px 10px;border-radius:6px;font:12px/1.4 sans-serif;opacity:.9";
  map.getDiv().appendChild(div);
  setTimeout(() => div.remove(), 4000);
}
