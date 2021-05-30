import React, { useCallback, useRef } from 'react';
import { ChatZone } from '@components/ChatList/styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import Scrollbars from 'react-custom-scrollbars';

interface ChatListProps {
  chatData?: IDM[];
}

const ChatList = ({ chatData }: ChatListProps) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <>
      <ChatZone>
        <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
          {chatData?.map((chat) => (
            <Chat key={chat.id} data={chat} />
          ))}
        </Scrollbars>
      </ChatZone>
    </>
  );
};

export default ChatList;
