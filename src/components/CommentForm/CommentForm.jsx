import { useState } from 'react';
import styles from './CommentForm.module.css';
import Icon from '../Icon/Icon';

const CommentForm = ({ initialText = '', onSubmit }) => {
    const [formData, setFormData] = useState({
        text: initialText, // Use initialText to populate the form
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (onSubmit) {
            onSubmit(formData); // Call the provided onSubmit function
            setFormData({ text: '' }); // Reset the form (useful for "add" mode)
        } else {
            console.error('onSubmit is not a function');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <label htmlFor="text-input">
                {initialText ? 'Edit your comment:' : 'Your comment:'}
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
                <Icon category={initialText ? 'Edit' : 'Create'} />
            </button>
        </form>
    );
};

export default CommentForm;
