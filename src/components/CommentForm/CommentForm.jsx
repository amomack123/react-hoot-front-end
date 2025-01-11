import { useState } from 'react';
import styles from './CommentForm.module.css';
import Icon from '../Icon/Icon';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({
        text: props.initialText || '', // Use initialText for editing
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (props.onSubmit) {
            props.onSubmit(formData); // Use the provided onSubmit function
            if (props.mode === 'add') {
                setFormData({ text: '' }); // Reset the form if in "add" mode
            }
        } else {
            console.error('onSubmit is not a function');
        }
    };

    const { hootId, commentId } = props; // Destructure hootId and commentId from props
    if (hootId && commentId) {
        return (
            <main className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1>Edit Comment</h1>
                    <label htmlFor="text-input">Your comment:</label>
                    <textarea
                        required
                        type="text"
                        name="text"
                        id="text-input"
                        value={formData.text}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        <Icon category="Edit" />
                    </button>
                </form>
            </main>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">
                {props.mode === 'edit' ? 'Edit your comment:' : 'Your comment:'}
            </label>
            <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">
                <Icon category={props.mode === 'edit' ? 'Edit' : 'Create'} />
            </button>
        </form>
    );
};

export default CommentForm;