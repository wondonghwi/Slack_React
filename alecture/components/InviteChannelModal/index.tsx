import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';

interface InviteChannelModalProps {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}
const InviteChannelModal = ({ show, onCloseModal, setShowInviteChannelModal }: InviteChannelModalProps) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  //TODO 해당 channel 부르는 부분 undefined 수정필요
  useEffect(() => {
    console.log(channel);
  }, [channel]);

  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { data: userData } = useSWR<IUser>('http://localhost:3095/api/users', fetcher);
  const { revalidate: revalidateMembers } = useSWR<IUser[]>(
    userData && channel ? `http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members`, {
          email: newMember,
        })
        .then(() => {
          revalidateMembers();
          setShowInviteChannelModal(false);
          setNewMember('');
          toast.success('초대에 성공했습니다.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.dir(error);
          toast.error('초대에 실패했습니다.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
    [newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
      <ToastContainer />
    </Modal>
  );
};

export default InviteChannelModal;
