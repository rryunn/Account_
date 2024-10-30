import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Logged.css";

function Login({ onLogin }) {
  const [affairs, setAffairs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  //입력 필드에서 값이 변경될 때 호출
  const handleChange = (e) => {
    const { name, value } = e.target;
    //e.target은 이벤트가 발생한 dom요소를 가리킨다. 즉 입력필드
    // 입력필드의 이름(ex. sername)과 value(쓰고있는 값) 가져와

    setAffairs({ ...affairs, [name]: value });
    //기존 상태 객체를 복사 후, name 속성에 해당되는 란에 value값 업데이트
    //name은 대괄호 안에 사용되어 속성 이름을 지정할 수 있다.
  };

  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //폼의 기본 제출동작(페이지 리로드) 방지
    const { username, password } = affairs;
    //affairs 객체에서 username과 password를 불러온다.
    if (username === "spiders" && password === "spiders132") {
      onLogin();
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logged-container">
          <h2>로그인</h2>
          <br />
          <br />
          <input
            type="text"
            name="username"
            value={affairs.username}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
        </div>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={affairs.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
          <button type="button" onClick={PasswordVisible}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {/* 버튼은 기본적으로 submit . 폼제출을 트리거 할 수 있어서
          type = button이라고 추가해줘서 폼 제출 동작을 방지해야함. */}
        </div>
        <br />
        <br />
        <button id="loginButton" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}
export default Login;
