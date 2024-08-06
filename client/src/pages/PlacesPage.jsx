import {Link, useParams} from "react-router-dom";

export default function PlacesPage() {
    const {action} = useParams();
    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="text-xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your place. should be short and catchy as in advertisment</p>
                        <input type="text" placeholder="title, for example: My lovely apt"/>
                        <h2 className="text-xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Address to this place</p>
                        <input type="text" placeholder="address"/>
                        <h2 className="text-xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        <div className="flex">
                            <input type="text" placeholder={'Add using a link ....jpg'}></input>
                            <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className="text-xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Description of the place</p>
                        <textarea />
                        <h2 className="text-xl mt-4">Perks</h2>
                        <p className="text-gray-500 text-sm">select all the perks of your place</p>
                        <div>
                            <label>
                                <input type="checkbox"/>
                                <span>Wifi</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>Free parking</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>TV</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>Pets allowed</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>Private entrance</span>
                            </label>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}