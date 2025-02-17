import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map, useMapsLibrary, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import userImageUrl from './proto/userImage.png';

function App() {
    const [isInitialPosition, setIsInitialPosition] = useState(true);
    const [mapHeading, setMapHeading] = useState(0);
    const map = useMap();
    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                setMapHeading(event.alpha);
            }
        };

        window.addEventListener('deviceorientation', handleDeviceOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, []);

    function MapControls() {
        const map = useMap();
    
        const zoomIn = () => {
            if (map) {
                map.setZoom(map.getZoom() + 1);
            }
        };
    
        const zoomOut = () => {
            if (map) {
                map.setZoom(map.getZoom() - 1);
            }
        };
    
        return (
            <div style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', gap: '10px' }}>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <APIProvider apiKey={'AIzaSyAU_XhSbMMas1jeY3kF_xuttKnIf1v7P_U'}>
                <h2>Route from Hunt Library to Engineering Building II</h2>
    
                <div style={{ flex: 1, position: 'relative' }}>
                    <Map
                        defaultZoom={18}
                        fullscreenControl={false}
                        mapId='36eeed8517e55638'
                        heading={mapHeading}
                        // tilt={47.5}
                    >
                        <Directions />
                        <UserLocationMarker />
                    </Map>
    
                    {/* Single Instruction UI */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '300px',
                            zIndex: 10,
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ⬆️ Head north on Founders Dr
                        </h3>
                        <p style={{ margin: '5px 0 0', fontSize: '0.85rem', color: '#555' }}>
                            (then turn left onto Varsity Dr)
                        </p>
                    </div>
    
                    {/* Time and ETA Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 10,
                        }}
                    >
                        <span style={{ marginRight: '8px', fontWeight: 'bold' }}>🚗 5 min</span>
                        <span>1.2 miles left</span>
                    </div>
                </div>
    
                <MapControls />
            </APIProvider>
        </div>
    );
}

// Directions component remains the same...
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
                origin: "890 Oval Dr, Raleigh, NC 27606",
                destination: "1070 Partners Way, Raleigh, NC 27606",
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            }).then((response) => {
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
    const [isInitialPosition, setIsInitialPosition] = useState(true);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const accuracyCircleRef = useRef<google.maps.Circle | null>(null);
    const animationIntervalRef = useRef<number | null>(null);

    // Function to handle smooth marker animation
    const animateMarkerTo = (startPos: google.maps.LatLng, endPos: google.maps.LatLng) => {
        if (animationIntervalRef.current) {
            window.clearInterval(animationIntervalRef.current);
        }

        const steps = 20;
        const latDiff = (endPos.lat() - startPos.lat()) / steps;
        const lngDiff = (endPos.lng() - startPos.lng()) / steps;
        let step = 0;

        animationIntervalRef.current = window.setInterval(() => {
            step++;
            const newPosition = new google.maps.LatLng(
                startPos.lat() + latDiff * step,
                startPos.lng() + lngDiff * step
            );
            markerRef.current?.setPosition(newPosition);

            if (step === steps) {
                if (animationIntervalRef.current) {
                    window.clearInterval(animationIntervalRef.current);
                    animationIntervalRef.current = null;
                }
            }
        }, 50);
    };

    useEffect(() => {
        if (!map || !window.google) return;

        // Create marker once
        markerRef.current = new google.maps.Marker({
            map,
            icon: {
                url: userImageUrl,
                scaledSize: new google.maps.Size(50, 50),
                anchor: new google.maps.Point(25, 25),
            },
            title: 'User Location Marker',
        });

        // Create accuracy circle once
        accuracyCircleRef.current = new google.maps.Circle({
            map,
            strokeColor: "#4285F4",
            strokeOpacity: 0.2,
            strokeWeight: 1,
            fillColor: "#4285F4",
            fillOpacity: 0.1,
        });

        // Watch position
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                const userPosition = new google.maps.LatLng(latitude, longitude);
                
                setPosition(userPosition);

                // Animate marker to new position
                if (markerRef.current) {
                    const currentPosition = markerRef.current.getPosition();
                    if (currentPosition) {
                        animateMarkerTo(currentPosition, userPosition);
                    } else {
                        markerRef.current.setPosition(userPosition);
                    }
                }

                // Update accuracy circle
                if (accuracyCircleRef.current) {
                    accuracyCircleRef.current.setCenter(userPosition);
                    accuracyCircleRef.current.setRadius(accuracy);
                }

                // Center map on the user's position every time
                map.setCenter(userPosition);
                map.setZoom(20);
            },
            (error) => {
                console.error('Error getting location:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        // Cleanup function
        return () => {
            if (animationIntervalRef.current) {
                window.clearInterval(animationIntervalRef.current);
            }
            if (markerRef.current) {
                markerRef.current.setMap(null);
                markerRef.current = null;
            }
            if (accuracyCircleRef.current) {
                accuracyCircleRef.current.setMap(null);
                accuracyCircleRef.current = null;
            }
            navigator.geolocation.clearWatch(watchId);
        };
    }, [map]);

    return null;
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
