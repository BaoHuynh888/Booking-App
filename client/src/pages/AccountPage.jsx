import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";

export default function AccountPage() {
    const {ready, user} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout'); //Function to logout account
    }

    if(!ready) {
        return 'Loading...';
    }
    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type=null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8"> {/* style for profile buttons */}
                <Link className={linkClasses('profile')} to={'/account'}> My profile </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}> My bookings </Link>
                <Link className={linkClasses('places')} to={'/account/places'}> My accommodations </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button> {/* style for logout button */}
                </div>
            )}
        </div>
    );
}