import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from '../LoginForm/LoginForm';
import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/modal/Modal';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, onClose } = props;

  return (
    <div className={classNames(cls.LoginModal, {}, [className])}>
      <Modal isOpen={isOpen} onClose={onClose} lazy>
        <LoginForm />
      </Modal>
    </div>
  );
};
