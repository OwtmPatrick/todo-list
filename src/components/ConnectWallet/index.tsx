import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack
} from '@chakra-ui/react';
import { useConnect } from 'wagmi';
import { WalletOption } from './WalletOption';

export const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectors, connect } = useConnect();

  return (
    <>
      <Button
        h={{ base: '40px', lg: '48px' }}
        p={{ lg: '0 32px' }}
        colorScheme="green"
        color="white"
        background="green.200"
        fontSize={{ lg: '18px' }}
        boxShadow="0px 8px 16px 0px rgba(8, 216, 153, 0.20)"
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
            <VStack>
              {connectors.map((connector) => (
                <WalletOption
                  key={connector.uid}
                  connector={connector}
                  onClick={() => {
                    connect({ connector });
                    onClose();
                  }}
                />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
