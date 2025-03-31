import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  isLoginModalOpen: boolean;
  isTermsModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openTermsModal: () => void;
  closeTermsModal: () => void;
};

// Create the context with default values
const ModalContext = createContext<ModalContextType>({
  isLoginModalOpen: false,
  isTermsModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  openTermsModal: () => {},
  closeTermsModal: () => {},
});

// Hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const value = {
    isLoginModalOpen,
    isTermsModalOpen,
    openLoginModal,
    closeLoginModal,
    openTermsModal,
    closeTermsModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
