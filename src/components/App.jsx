import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { getImages } from '../services/api';
import { mapperImages } from '../helpers/mapper';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [imageQuery, setImageQuery] = useState('');
  const [bigImage, setBigImage] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageQuery) {
      return;
    }

    setIsLoading(true);

    getImages(imageQuery, page)
      .then(res => {
        setImages(prevState => [...prevState, ...mapperImages(res.data.hits)]);
        if (res.data.hits.length === 0) {
          return toast.error('Type something carefully');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, imageQuery]);

  const handleFormSubmit = imageQuery => {
    setImageQuery(imageQuery);
    setImages([]);
    setPage(1);
  };

  const showMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setBigImage('');
  };

  const setCurrentImage = url => {
    setBigImage(url);
  };

  return (
    <DivStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />
      {images.length > 0 && (
        <ImageGallery images={images} setCurrentImage={setCurrentImage} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && <Button handleClick={showMoreImages} />}
      {bigImage && <Modal image={bigImage} closeModal={closeModal} />}
    </DivStyled>
  );
};

const DivStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
