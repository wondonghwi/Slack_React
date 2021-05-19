import React, { useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Header, ProfileImg, RightMenu } from '@layouts/Workspace/styles';
import gravatar from 'gravatar';

type WorkspaceProps = {
  children: React.ReactNode;
};

const Workspace = ({ children }: WorkspaceProps) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const onLogout = useCallback(async () => {
    try {
      const result = await axios.post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      });
      console.log(result);
      mutate(false, false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
