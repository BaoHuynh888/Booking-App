// PlacesFormPage.jsx
import {useState, useEffect} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import PhotoUploader from "../PhotoUploader.jsx";
import Perks from "../Perks.jsx";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
    const {id} = useParams();
    //console.log('ID from useParams:', id);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            });
    }, [id]);

    function inputHeader(text) { //Function for style of title of a section
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) { //Function for style of description of a section
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) { //Layout function for title of section and text box for description of the section
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {
            // Update existing place
            await axios.put('/places/', {
                id, ...placeData
            });
            setRedirect(true);
        } 
        else {
            // Create new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/account/places" />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
                <input 
                    type="text" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                    placeholder="Title, for example: My lovely apt" 
                />
                
                {preInput('Address', 'Address for this place')}
                <input 
                    type="text" 
                    value={address} 
                    onChange={ev => setAddress(ev.target.value)} 
                    placeholder="Address" 
                />
                
                {preInput('Photos', 'More = better')}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
                {preInput('Description', 'Description of the place')}
                <textarea 
                    value={description} 
                    onChange={ev => setDescription(ev.target.value)} 
                />
                
                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"> {/* Fixed className */}
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                
                {preInput('Extra Information', 'House rules, etc')}
                <textarea 
                    value={extraInfo} 
                    onChange={ev => setExtraInfo(ev.target.value)} 
                />
                
                {preInput('Check-in & Check-out times', 'Add check-in and check-out times, remember to add time windows for cleaning the room between guests')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4"> {/* Fixed className */}
                    <div>
                        <h3 className="mt-2 -mb-1">Check-in time</h3>
                        <input 
                            type="text" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} 
                            placeholder="2" 
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-out time</h3>
                        <input 
                            type="text" 
                            value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)} 
                            placeholder="11" 
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                        <input 
                            type="number" 
                            value={maxGuests} 
                            onChange={ev => setMaxGuests(ev.target.value)} 
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input 
                            type="number" 
                            value={price} 
                            onChange={ev => setPrice(ev.target.value)} 
                        />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}