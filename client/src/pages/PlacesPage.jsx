import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../Perks.jsx"
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage() {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState('');

    function inputHeader(text) { //Function for style of title of a section
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) { //Function for stle of description of a section
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

    async function addNewPlace(ev) {
        ev.preventDefault();
        const {data} = await axios.post('/places', {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests
        });
        setRedirect('/account/places');
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return(
        <div>
            {action !== 'new' && ( //If it is not new, show the new button
                <div className="text-center">
                <Link className="inline-flex gap- bg-primary text-white px-6 py-2 rounded-full" to={'/account/places/new'}> {/* style for "My accommodations page" */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places
                </Link>
            </div>
            )}
            {action === 'new' && ( //If it is new, show the form
                <div>
                    <form onSubmit={addNewPlace}>
                        {preInput('Title', 'Title for your place. should be short and catchy as in advertisment')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely apt"/> {/* title description placeholder */}
                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address"/>
                        {preInput('Photos', 'more = better')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/> {/* description description (no placeholder yet) */}
                        {preInput('Perks', 'Select all the perks of your place')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg-cols-6"> {/* style for listing of perks for md and lg screens */}
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Information', 'House rules, etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/> {/* extra info description */}
                        {preInput('Check-in & check-out times', 'Add check in and out times, remember to add time windows for cleaning the room between guests')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check-in time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="2:00pm"/> {/* check-in time description placeholder */}
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check-out time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00am"/> {/* check-out description placeholder */}
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} /> {/* max guests description(no placeholder). pick number of guests */}
                            </div>
                        </div>
                        <div>
                            <button className="primary my-4">Save</button> {/* style for save button */}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}