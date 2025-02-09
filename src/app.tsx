import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map, useMapsLibrary, useMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

function App() {
    return (
        <APIProvider apiKey={'AIzaSyAU_XhSbMMas1jeY3kF_xuttKnIf1v7P_U'}>
            <div>
                <h2>Route from Hunt Library to Engineering Building II</h2>
            </div>

            <Map
                defaultZoom={18}
                fullscreenControl={false}
                options={{
                    mapId: 'a6e674d18fe3b980',
                }}
            >
                <Directions />
                <UserLocationMarker />
            </Map>
        </APIProvider>
    );
};

function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService.route({
            origin: "1070 Partners Way, Raleigh, NC 27606",
            destination: "890 Oval Dr, Raleigh, NC 27606",
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });
    }, [directionsService, directionsRenderer]);

    if (!leg) return null;

    return <div>
        <h2>{selected.summary}</h2>
    </div>;
}

function UserLocationMarker() {
    const map = useMap();
    const [position, setPosition] = useState<google.maps.LatLng | null>(null);

    useEffect(() => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setPosition(new google.maps.LatLng(latitude, longitude));
        });
    }, [map]);

    if (!position) return null;

    return <AdvancedMarker position={position} map={map} />;
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
