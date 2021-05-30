import React, { useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import useInput from '@hooks/useInput';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      setChat('');
    },
    [setChat],
  );

  return (
    <Container>
      <Header>채널</Header>
      <ChatList />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
};

export default Channel;
