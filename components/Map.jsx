import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import Image from "next/image"
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
    console.log(center)
    const [viewport, setViewport] = useState({
    width: "100%",
    height:"100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    });
    console.log(viewport)
    return <ReactMapGL
    mapStyle="mapbox://styles/dimplemathew/cks0i6wzo0tz317q62x6pn8wg"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport => setViewport(nextViewport))}
    className="rounded-md"
    >
      
    {searchResult.map((result) => (
        <div key={result.long} className="h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
            <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
            >
              <span aria-label="push-pin" role="img"  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-30"></span>
                  <p onClick={()=> setSelectedLocation(result)} className="relative cursor-pointer text-2xl">📌</p>

            </Marker>
            {/* this is a pop up that should show a popup */}
            {selectedLocation.long === result.long ? (
                <Popup
                onClose={()=>setSelectedLocation({})}
                // closeOnClick={true}
                closeButton={false}
                latitude={result.lat}
                longitude={result.long}
    
                className="p-2 items-center z-50 hover:scale-95 transition duration-150 ease-out relative"
               >
                  <div className="relative">
                      <div className="relative flex flex-wrap justify-center">
                          <div class="w-6/12 sm:w-4/12 px-4 h-28">
                             <Image src={result.img} 
                        layout="fill" 
                        objectFit="cover"
                        objectPosition="left"
                        className="shadow rounded max-w-full h-auto align-middle bg-gradient-to-b"/>
                          </div>
                       <p className="text-justify text-gray-900 bg-white opacity-80 text-sm top-1 p-2 z-50 mb-1">{result.title}</p>
                      </div>
                 
               </div> 
                
                   
                </Popup>
            ):(false)}
        </div>
    ))}  
       
        

    </ReactMapGL>
}
 
export default Map;