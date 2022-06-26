import React from 'react';
import avatarSrc from '../assets/avatar.jpeg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Terminal } from '../components/terminal/Terminal';

const MODAL_ID = 'terminal-modal';

export const Homepage: React.FC = () => {
  return (
    <>
      <Header avatarSrc={avatarSrc} modalId={MODAL_ID} />
      <Hero modalId={MODAL_ID} />
      <Footer />
      <Terminal modalId={MODAL_ID} />
    </>
  );
};
