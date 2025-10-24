import fetch from "node-fetch";

async function getObjectFromUrl(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Eroare HTTP: ${response.status} - ${response.statusText}`);
    }

    const text = await response.text();

    if (!text || text === "null") {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("Eroare la parsarea JSON. Raspunsul primit nu a fost JSON valid.");
        console.error("URL:", url);
        console.error("Text primit:", text.substring(0, 100) + "...");
        throw e;
    }
}

async function getCountryBounds(country) {
    const url = `https://nominatim.openstreetmap.org/search?country=${country}&format=json&limit=1`;
    
    const response = await fetch(url, {
        headers: { 'User-Agent': 'ExempluApp/1.0 (contact@exemplu.com)' }
    });

    if (!response.ok) {
        throw new Error(`Eroare HTTP la Nominatim: ${response.status}`);
    }

    const object = await response.json();

    if (!object || object.length === 0) {
        throw new Error(`Nu s-au gasit coordonate pentru tara: ${country}`);
    }

    return {
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3]
    };
}

async function getFlightsOverCountry(countryName) {
    
    try {
        console.log(`Se obtin coordonatele pentru ${countryName}...`);
        const bounds = await getCountryBounds(countryName);

        const API_URL = `https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`;

        console.log(`Se preiau zborurile deasupra ${countryName}...`);
        const data = await getObjectFromUrl(API_URL);

        if (!data || !data.states) {
            console.log(`Nu s-au gasit zboruri active in zona ${countryName}.`);
            return [];
        }

        const flights = data.states.map(state => {
            return {
                icao24: state[0],
                callsign: state[1] ? state[1].trim() : 'N/A',
                country: state[2],
                longitude: state[5],
                latitude: state[6],
                altitude: state[7]
            };
        });

        return flights;

    } catch (err) {
        console.error(`Eroare in procesul getFlightsOverCountry pentru ${countryName}:`, err.message);
        return [];
    }
}

getFlightsOverCountry('Romania').then(flights => {
    if (flights.length > 0) {
        console.log(`\n--- SUCCES! S-au gasit ${flights.length} avioane deasupra Romaniei! ---`);
        console.log(flights);
    } else {
        console.log("\n--- Nu s-au gasit avioane deasupra Romaniei (sau a aparut o eroare). ---");
    }
});

