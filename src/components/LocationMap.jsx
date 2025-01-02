import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

LocationMap.propTypes = {
  title: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

function LocationMap({ title, coordinates }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !coordinates) return;

    const { latitude, longitude } = coordinates;
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3, // 지도 확대 수준
    });

    // 마커 추가
    new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(latitude, longitude),
      title,
    });
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "200px" }} />;
}

export default LocationMap;
