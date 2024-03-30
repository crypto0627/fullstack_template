/* eslint-disable react/function-component-definition */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import MyLocationIcon from '@mui/icons-material/MyLocation';
export function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

interface Center {
  lat: number;
  lng: number;
}
type  WalkStatus = "isWalking" | "stopWalking" | "finishWalking";
interface CustomMarkerProps {
  position: Center;
  popupText: string;
  type:
    | "store"
    | "restaurant"
    | "park"
    | "vet"
    | "groomer"
    | "trainer"
    | "other";
}
interface MyDoggy {
  user: string;
  position: [number, number];
  popupText: string;
  iconUrl: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  popupText,
  type,
}) => {
  const iconUrl =`${type}.png`;
  const customIcon = new L.Icon({
    iconUrl,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={[position.lat ,position.lng]} icon={customIcon}>
      <Popup>
        {popupText}
        <br />
        {type}
      </Popup>
    </Marker>
  );
};

const MyDoggy: React.FC<MyDoggy> = ({ user, position, popupText, iconUrl }) => {
  const customIcon = new L.Icon({
    iconUrl,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        {user}
        <br />
        {popupText}
      </Popup>
    </Marker>
  );
};

export default function MapComponent() {
  //change bool to isWalking stopWalking finishWalking
  const [isWalking, setIsWalking] = useState<WalkStatus>("stopWalking");
  const [walkData, setWalkData] = useState({
    steps: 0,
    time: 0, // Time in seconds
  });
  const [geoData, setGeoData] = useState({ lat: 23.973988, lng: 120.979817 });
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWalking === "isWalking") {
      // Start or continue recording steps and time
      interval = setInterval(() => {
        setWalkData((prevData) => {
          // Check if time exceeds 1800 seconds (30 minutes)
          if (prevData.time >= 1800) {
            clearInterval(interval); // Stop the interval
            setIsWalking("stopWalking"); // Update walking state to finished
            // Return the current data without modifying it to prevent further updates
            return prevData;
          }
  
          // If not exceeding 1800 seconds, continue updating steps and time
          return {
            steps: prevData.steps + Math.round(Math.random() * 5),
            time: prevData.time + 1,
          };
        });
      }, 1000); // Update every second
    }
    return () => {
      clearInterval(interval);
    };
  }, [isWalking]);
  const toggleWalking = () => {
    if (isWalking=="isWalking") {
      setIsWalking("stopWalking");
    } else {
      setIsWalking("isWalking");
    }
  };
  const claimReward = () => {
    alert(`Reward ${walkData.steps} claimed!`);
    setWalkData({ steps: 0, time: 0 });
    setIsWalking("stopWalking");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      setGeoData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  const findMyLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newCenter: [number, number] = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      setCurrentPosition(newCenter);
      setGeoData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const center: Center = {lat:geoData.lat,lng: geoData.lng};

  type Store = {
    name: string;
    type:
      | "store"
      | "restaurant"
      | "park"
      | "vet"
      | "groomer"
      | "trainer"
      | "other";
    positionT: Center;
  };



  const positionT: Store[] = [
    { name: "dog store", positionT: {lat:25.07823, lng:121.606286}, type: "store" },
    {
      name: "dog restaurant",
      positionT: {lat:25.060078, lng:121.615915},
      type: "restaurant",
    },
    { name: "dog park", positionT: {lat:25.0851938, lng:121.6777752}, type: "park" },
    { name: "doggy", positionT: {lat:25.0985729, lng:121.2573986}, type: "vet" },
    { name: "amidoggy", positionT: {lat:25.0543902, lng:121.300311}, type: "groomer" },
  ];

  return (
    <>
      <button
        onClick={findMyLocation}
        className="bg-white hover:bg-blue-700 text-black font-bold py-1 px-1 rounded"
        style={{ position: "absolute", zIndex: 1000, top: "220px", left: "12px" }}
      >
        <MyLocationIcon/>
      </button>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100vh", borderRadius: "10px" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positionT.map((store, idx) => (
          <CustomMarker
            key={idx}
            position={store.positionT}
            popupText={store.name}
            type={store.type}
          />
        ))}
        {currentPosition && (
          <MyDoggy
            user="Amidoggy"
            position={currentPosition}
            popupText={"I am here"}
            iconUrl="dog.png"
          />
        )}
        <ChangeView coords={[center.lat,center.lng]} />
      </MapContainer>
      <div
        style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '200px',
        }}
        className="flex flex-col items-center justify-center w-1/2  p-4 bg-white rounded-lg shadow-lg"
      >
        <button
          className="bg-light-blue text-white  font-bold py-2 px-4 rounded mb-1"
          onClick={toggleWalking} 
        >
          {isWalking!="stopWalking" ? 'Stop Walking' : (walkData.steps == 0 ?'Start Walking':'Keep Walking')}
        </button>
        {(walkData.steps != 0 && isWalking=="stopWalking") && 
            <button
              className="bg-bubble-gum text-white font-bold py-2 px-4 rounded"
              onClick={claimReward}
            >
              Claim Reward
            </button>
        }
        {
          <div className="mt-4">
            <p>Steps: {walkData.steps}</p>
            <p>Remain: {Math.floor((1800-walkData.time) / 60)}m {(1800-walkData.time) % 60}s</p>
          </div>
        }
      </div>
    </>
  );
}
