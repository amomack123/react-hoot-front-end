// import { Link } from "react-router-dom";
// import styles from './HootList.module.css'; // Import styles
// import Icon from '../Icon/Icon';
// import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

// const HootList = (props) => {
//     console.log(props.hoots)
//     return (
//         <main className={styles.container}>
//             {props.hoots.map((hoot) => (
//                 <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
//                     <article>
//                         <header>
//                             <div>
//                                 <h2>{hoot.title}</h2>
//                                 <Icon category={hoot.category} />
//                             </div>
//                             <AuthorInfo content={hoot} />
//                         </header>
//                         <p>{hoot.text}</p>
//                     </article>
//                 </Link>
//             ))}
//         </main>
//     );
// }

// export default HootList;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as hootService from "../../services/hootService";
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import HootDetails from "../HootDetails/HootDetails"; // Assuming you import HootDetails

const HootList = () => {
    const [hoots, setHoots] = useState([]);

    useEffect(() => {
        const fetchHoots = async () => {
            const hootsData = await hootService.index(); // Assuming `index` fetches the list
            setHoots(hootsData);
        };
        fetchHoots();
    }, []);

    const handleDeleteHoot = (hootId) => {
        // Update the state to immediately reflect the deletion
        setHoots((prevHoots) => prevHoots.filter((hoot) => hoot._id !== hootId));
    };

    return (
        <main className={styles.container}>
            {hoots.map((hoot) => (
                <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{hoot.title}</h2>
                                <Icon category={hoot.category} />
                            </div>
                            <AuthorInfo content={hoot} />
                        </header>
                        <p>{hoot.text}</p>
                    </article>
                </Link>
            ))}
            {/* Pass handleDeleteHoot down to HootDetails */}
            {hoots.map((hoot) => (
                <HootDetails
                    key={hoot._id}
                    hoot={hoot}
                    hootService={hootService}
                    handleDeleteHoot={handleDeleteHoot} // Pass the delete handler here
                />
            ))}
        </main>
    );
};

export default HootList;

