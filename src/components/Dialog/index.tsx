import Button from '../Button';
import { ReactNode } from 'react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clickBtnFunc: () => void;
  title: string;
  children: ReactNode;
  leftBtn: string;
  rightBtn: string;
}

function CustomDialog({
  isOpen,
  onClose,
  clickBtnFunc,
  title,
  children,
  leftBtn,
  rightBtn,
}: Props) {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogBody>
          <div className="flex flex-col gap-3 items-center pt-9 pb-5">
            <p className="font-700 text-24">{title}</p>
            <p className="text-gray-2">{children}</p>
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="flex gap-11 w-full">
            <Button
              theme="secondary"
              customStyle="w-full"
              heightSize="lg"
              onClickFunc={onClose}
              roundSize="sm"
            >
              {leftBtn}
            </Button>
            <Button
              heightSize="lg"
              customStyle="w-full"
              onClickFunc={clickBtnFunc}
              roundSize="sm"
            >
              {rightBtn}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default CustomDialog;
