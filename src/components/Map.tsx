'use client'

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

function Map() {

    const comname = process.env.NEXT_PUBLIC_COMNAME;
    const name = process.env.NEXT_PUBLIC_NAME;
    const address = process.env.NEXT_PUBLIC_ADDRESS;
    const city = process.env.NEXT_PUBLIC_CITY;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const phone = process.env.NEXT_PUBLIC_PHONE;
    const email = process.env.NEXT_PUBLIC_EMAIL;

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
                        <address className='p-1 text-[#1C2331]'>
                            <h3 className='font-bold'>{comname}</h3>
                            <p>{address}</p>
                            <p>{city}</p>
                            <p>{country}</p>
                        </address>
                    </InfoWindowF>
                </MarkerF>
            </GoogleMap>
        </div>
    )
};

export default Map;