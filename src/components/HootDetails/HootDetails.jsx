import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";
import styles from './HootDetails.module.css';
import Loading from '../Loading/Loading';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const HootDetails = (props) => {
    const { hootId } = useParams();
    const [hoot, setHoot] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setHoot(hootData);
        };
        fetchHoot();
    }, [hootId]);

    if (!hoot) return <Loading />

    const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [newComment, ...hoot.comments] });
    };

    const handleUpdateComment = async (commentId, updatedCommentData) => {
        const updatedComment = await hootService.updateComment(
            hootId,
            commentId,
            updatedCommentData
        );
        setHoot({
            ...hoot,
            comments: hoot.comments.map((comment) =>
                comment._id === commentId ? updatedComment : comment
            ),
        });
        setEditingCommentId(null);
    };

    const handleDeleteComment = async (commentId) => {
        await hootService.deleteComment(hootId, commentId);
        setHoot({
            ...hoot,
            comments: hoot.comments.filter((comment) => comment._id !== commentId),
        });
    };

    return (
        <main className={styles.container}>
            <section>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <AuthorInfo content={hoot} />
        {hoot.author._id === user._id && (
          <div className="actions">
            <Link to={`/hoots/${hootId}/edit`} className="action-button">
              <Icon category="Edit" />
            </Link>
            <button onClick={() => props.handleDeleteHoot(hootId)} className="action-button">
              <Icon category="Trash" />
            </button>
          </div>
        )}
      </header>
      <p>{hoot.text}</p>
    </section>
            <section>
                <h2>Comments</h2>
                <CommentForm mode="add" onSubmit={handleAddComment} />
                {!hoot.comments.length && <p>There are no comments.</p>}

                {hoot.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <AuthorInfo content={comment} />
                            {comment.author._id === user._id && (
                                <>
                                    {/* <Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
                                        <Icon category="Edit" />
                                    </Link> */}
                                    <button onClick={() => handleDeleteComment(comment._id)}>
                                        <Icon category="Trash" />
                                    </button>
                                </>
                            )}
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default HootDetails;