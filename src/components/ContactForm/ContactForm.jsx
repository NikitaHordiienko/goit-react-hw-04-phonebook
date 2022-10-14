import { useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default function ContactForm({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChangeName = event => {
        const { value } = event.currentTarget;
        setName(value);
    }

    const handleChangeNumber = event => {
        const { value } = event.currentTarget;
        setNumber(value);
    }   

    const handleSumbit = event => {
        event.preventDefault();

        const contact = {
            id: nanoid(),
            name,
            number,
        }

        onSubmit(contact);

        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={css.form} onSubmit={handleSumbit}>
            <label className={css.formLabel} htmlFor="name">Name</label>
            <input
                className={css.formInput}
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleChangeName}
            />
            <label className={css.formLabel} htmlFor="number">Number</label>
            <input
                className={css.formInput}
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleChangeNumber}
            />
            <button className={css.formButton} type="submit">Add contact</button>
        </form>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}