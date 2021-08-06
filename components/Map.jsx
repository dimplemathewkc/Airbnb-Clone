import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
const Map = ({searchResult}) => {
    const[selectedLocation, setSelectedLocation] = useState({});
    // transform search result object to latitude and.longitude
    const coordinate = searchResult.map(result =>({
        longitude: result.long,
        latitude: result.lat
    }))
    // latitude and long of the center of the location coordinates
    const center = getCenter(coordinate)

        const [viewport, setViewport] = useState({
        width: "100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.latitude,
        zoom: 11
    });
    return <ReactMapGL
    mapStyle="mapbox://styles/dimplemathew/cks0i6wzo0tz317q62x6pn8wg"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport => setViewport(nextViewport))}>
       {searchResult.map(result =>(
        <div key={result.long} className="cursor-pointer text-2xl animate-bounce">
            <Marker 
               latitude={result.lat}
               longitude={result.long}
               offsetLeft={-20}
               offsetTop={-10}/> 
            {/* <p role="img" onClick={()=>{setSelectedLocation(result)}}>📌</p></Marker>
            {/* show a pop up on marker click */}
            {/* {selectedLocation === result.long } */}
        </div>  
       ))} 
  

    </ReactMapGL>
}
 
export default Map;