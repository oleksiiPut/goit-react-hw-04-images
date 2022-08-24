import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HeaderStyled,
  FormStyled,
  ButtonStyled,
  InputStyled,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ onSubmit }) {
  const [imageQuery, setImageQuery] = useState('');

  const handleQueryChange = e => {
    setImageQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageQuery.trim() === '') {
      return toast.error('Type something');
    }

    onSubmit(imageQuery);
    setImageQuery('');
    e.target.reset();
  };

  return (
    <HeaderStyled>
      <FormStyled onSubmit={handleSubmit}>
        <ButtonStyled type="submit">
          <FiSearch />
        </ButtonStyled>

        <InputStyled
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </FormStyled>
    </HeaderStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
