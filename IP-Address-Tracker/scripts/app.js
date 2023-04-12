const searchForm = document.querySelector(".search");
const searchField = document.querySelector(".search__field");
const notifications = document.querySelector("#notifications");

const ipData = document.querySelector("#ip");
const locationData = document.querySelector("#location");
const timezoneData = document.querySelector("#timezone");
const ispData = document.querySelector("#isp");

const alertTemplate = document.querySelector("template#alert-template");

const ipValidator =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const domainValidator =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

// Map
let zoomLevel = 15;
const map = L.map("map").setView([0, 0], zoomLevel);
const defaultLayer = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    },
);
const satelliteLayer = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    },
);
const LeafIcon = L.Icon.extend({
    options: {
        iconSize: [45, 55],
    },
});
const MarkerIcon = new LeafIcon({
    iconUrl: "./assets/icons/location.svg",
});
const marker = L.marker([0, 0], { icon: MarkerIcon }).addTo(map);

map.addLayer(defaultLayer);

async function getData(type, data) {
    let params = "";
    if (type === "ip") {
        params = `&ipAddress=${data}`;
    } else if (type === "domain") {
        params = `&domain=${data}`;
    }

    const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_e6RQql0IHihju19MgwyGQ4atD9qXV${params}`,
    );
    if (res.ok) {
        const data = await res.json();
        renderInfo(data);
    } else {
        const data = await res.json();
        pushNotification("Not Found", `IP: '${domain}' Not Found`);
    }
}

function renderInfo(data) {
    const {
        ip,
        location: { city, region, country, timezone, lat, lng },
        isp,
    } = data;

    ipData.textContent = ip;
    locationData.textContent = `${city}, ${region}, ${country}`;
    timezoneData.textContent = `UTC ${timezone}`;
    ispData.textContent = isp;

    map.setView([lat, lng], zoomLevel);
    marker.setLatLng([lat, lng]);
}

function pushNotification(title, details) {
    const alert = alertTemplate.content.cloneNode(true);
    const notification = alert.querySelector(".notification");
    const alertTitle = alert.querySelector(".notification__title");
    const alertDetails = alert.querySelector(".notification__details");
    alertTitle.textContent = title;
    alertDetails.innerHTML = details;
    notifications.appendChild(alert);
    setTimeout(() => notification.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    getData("user");
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchField.value;

    if (ipValidator.test(value)) {
        getData("ip", value);
        searchField.value = "";
    } else if (domainValidator.test(value)) {
        getData("domain", value);
    } else {
        pushNotification(
            `Invalid IP/Domain`,
            `IP should follow: <b>x . x . x . x</b><br/>Domain should follow: <b>example.com</b>`,
        );
        return;
    }

    searchField.value = "";
});
