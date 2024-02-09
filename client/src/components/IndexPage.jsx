import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {

    const getFilename = function (str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }

    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className='mt-8  grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id} key={place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl ">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:5000/uploads/' + getFilename(place.photos?.[0])} alt="" />
                        )}
                    </div>
                    <h2 className='font-bold '>{place.address}</h2>
                    <h3 className='text-sm text-gray-500 '>{place.title}</h3>
                    <div className='mt-1'>
                        <span className='font-bold'> ${place.price} per night</span>
                    </div>
                </Link>
            ))}
        </div >
    )
}
