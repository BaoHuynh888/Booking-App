

export default BookingWidget({place}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center"> {/* style for price text */}
                Price: {place.price} / per night 
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="px-4 py-3"> {/* style for check in date element; calendar format */}
                        <label>Check-in:</label>
                        <input type="date" />
                    </div>
                    <div className="px-4 py-3 border-l"> {/* style for check out element */}
                        <label>Check-out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div>
                <div className="px-4 py-3 border-t"> {/* style for check out element */}
                        <label>Number of guests:</label>
                        <input type="number" value={1}/>
                    </div>
                </div>
            </div>
            <button className="primary mt-4">Book this place</button> {/* style for button to book place */}
        </div>
    );
}