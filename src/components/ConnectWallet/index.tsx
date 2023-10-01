import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import { ConnectionOptions } from '../ConnectionOptions/ConnectionOptions';

export const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        h={{ base: '40px', lg: '48px' }}
        p={{ lg: '0 32px' }}
        colorScheme="green"
        color="white"
        background="green.200"
        fontSize={{ lg: '18px' }}
        onClick={onOpen}
      >
        Connect wallet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="30px">
            <ConnectionOptions onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
