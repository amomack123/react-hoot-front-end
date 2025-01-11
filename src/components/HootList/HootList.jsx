import { Link } from "react-router-dom";
import styles from './HootList.module.css'; // Import styles
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const HootList = (props) => {
    console.log(props.hoots)
    return (
        <main className={styles.container}>
            {props.hoots.map((hoot) => (
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
        </main>
    );
}

export default HootList;
