import React, { useEffect, useState } from 'react'
import PreksLabels from './PreksLabels';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import AccountNavigation from './AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';


export default function PlacesFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setChekcIn] = useState('');
    const [checkOut, setChekcOut] = useState('');
    const [price, setPrice] = useState(100);
    const [maxGuests, setMaxGuests] = useState('1');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setChekcIn(data.checkIn);
            setChekcOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])


    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function preInput(header) {
        return (
            <>
                {inputHeader(header)}
            </>
        )
    }


    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        };
        if (id) {
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            // new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    async function deletePlace(ev) {
        ev.preventDefault()
        if (id) {
            axios.delete('/places', { data: { id }, headers: { Authorization: "token" } })
            setRedirect(true)
        }
        else {
            alert('No Place to delete');
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNavigation />
            <form >
                {preInput('Title')}
                <input type="text" placeholder="title, my home" value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                {preInput('Address')}
                <input type='text' placeholder='address' value={address}
                    onChange={ev => setAddress(ev.target.value)} />
                {preInput('Photos')}
                <PhotosUploader addedPhotos={photos} onChange={setPhotos} />
                {preInput('Description')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <PreksLabels selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info')}
                <textarea value={extraInfo}
                    onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check In&Out time, max guests')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 mb-1 '>Check in time</h3>
                        <input type="text" value={checkIn}
                            onChange={ev => setChekcIn(ev.target.value)} placeholder='15:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1 '>Check out time</h3>
                        <input type="text" value={checkOut}
                            onChange={ev => setChekcOut(ev.target.value)} placeholder='15:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1 '>Max Guests</h3>
                        <input type="number" value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1 '>Price per night</h3>
                        <input type="number" value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <button onClick={savePlace} className='bg-primary px-4 border rounded-full my-4'> Save</button>
                    <button onClick={deletePlace} className='bg-primary px-4 border rounded-full my-4'> Delete</button>
                </div>
            </form>
        </div>
    )
}
