import React, { useCallback, useState } from 'react';
import { Form, Error, Success, Label, Input, LinkContainer, Button, Header } from './styles';
import axios from 'axios';
import useInput from '@hooks/useInput';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const SignUp = () => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);

  //임시로 오류안나게 style확인을 위한 setting
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!mismatchError && nickname) {
        //비밀번호를 아에 입력을 안했을경우
        if (password === '') {
          alert('비밀번호를 입력해주세요');
          return;
        }
        console.log('서버로 회원가입 하기');
        //비동기요청 보내기전 state값 초기화 진행 -> 이전요청에 대한 결과를 남아있지않게 하기위해서
        setSignUpSuccess(false);
        setSignUpError('');
        try {
          const result = await axios.post('/api/users', {
            email,
            nickname,
            password,
          });
          setSignUpSuccess(true);
          return result;
        } catch (error) {
          console.log(error.response.data);
          setSignUpError(error.response.data);
        } finally {
        }
      }
      console.log(email, nickname, password, passwordCheck);
    },
    [email, nickname, password, passwordCheck],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/channel" />;
  }

  return (
    <div id="container">
      <Header>Slack_React</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
