'use client'

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

function Map() {

    const comname = process.env.COMNAME;
    const name = process.env.NAME;
    const address = process.env.ADDRESS;
    const city = process.env.CITY;
    const country = process.env.COUNTRY;
    const phone = process.env.PHONE;
    const email = process.env.EMAIL;

    const { isLoaded } = useLoadScript({
        //@ts-ignore
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API
    });

    const center = useMemo(() => ({ lat: 48.33, lng: 16.34 }), []);
    const location = useMemo(() => ({ lat: 48.33, lng: 16.34 }), []);

    if (!isLoaded) {
        return (
            <div>MAP LOADING....</div>
        )
    }
    
    return (
        <div>
            <GoogleMap zoom={15} center={center} mapContainerClassName="w-full h-[60vh] md:h-[50vh]">
                <MarkerF position={location} >
                    <InfoWindowF position={location} >
                        <div className='p-1'>
                            <h3 className='font-bold'>{comname}</h3>
                            <p>{address}</p>
                            <p>{city}</p>
                            <p>{country}</p>
                        </div>
                    </InfoWindowF>
                </MarkerF>
            </GoogleMap>
        </div>
    )
};

export default Map;