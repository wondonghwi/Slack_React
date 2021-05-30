import React, { useCallback, useRef } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import Scrollbars from 'react-custom-scrollbars';

interface ChatSectionsProps {
  chatSections: { [key: string]: IDM[] };
}

const ChatList = ({ chatSections }: ChatSectionsProps) => {
  const scrollRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <>
      <ChatZone>
        <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
          {Object.entries(chatSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                <StickyHeader>
                  <button>{date}</button>
                </StickyHeader>
                {chats.map((chat) => (
                  <Chat key={chat.id} data={chat} />
                ))}
              </Section>
            );
          })}
        </Scrollbars>
      </ChatZone>
    </>
  );
};

export default ChatList;
