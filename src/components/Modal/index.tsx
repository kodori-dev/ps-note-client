import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Button from '../Button';
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clickBtnFunc: () => void;
  title: string;
  children: ReactNode;
  leftBtn: string;
  rightBtn: string;
}

function CustomModal({ isOpen, onClose, clickBtnFunc, title, children, leftBtn, rightBtn }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-3 items-center pt-9 pb-5">
            <p className="font-700 text-24">{title}</p>
            <p className="text-gray-2">{children}</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex gap-11 w-full">
            <Button theme="secondary" customStyle="w-full" heightSize="lg" onClickFunc={onClose} roundSize="sm">
              {leftBtn}
            </Button>
            <Button heightSize="lg" customStyle="w-full" onClickFunc={clickBtnFunc} roundSize="sm">
              {rightBtn}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
