import React, { RefObject, useCallback } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM, IChat } from '@typings/db';
import Chat from '@components/Chat';
import Scrollbars from 'react-custom-scrollbars';

interface ChatSectionsProps {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
  scrollRef: RefObject<Scrollbars>;
}

const ChatList = ({ chatSections, setSize, isReachingEnd, scrollRef }: ChatSectionsProps) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0) {
        console.log('가장 위');
        setSize((prevSize) => prevSize + 1).then(() => {
          //스크롤 위치 유지
          if (scrollRef?.current) {
            scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    [scrollRef, setSize],
  );

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
