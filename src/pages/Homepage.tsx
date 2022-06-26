import React from 'react';
import avatarSrc from '../assets/avatar.jpeg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Modal } from '../components/Modal';

export const Homepage: React.FC = () => {
  return (
    <>
      <Header avatarSrc={avatarSrc} modalHtmlFor='my-modal-4' />
      <Hero modalHtmlFor='my-modal-4' />
      <Footer />
      <Modal />
    </>
  );
};
