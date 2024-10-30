import { useState } from "react";

import "./styles.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Login from "./Logged";

export default function App() {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    date: null,
    category: "",
    item: "",
    income: "",
    expense: "",
    notes: "",
  });

  const addRow = () => {
    /*const formattedRow = {
      ...newRow,
      date: newRow.date ? newRow.date.toISOString().split("T")[0] : "",
    }; //문자열로 변환하여 저장하기 위함.2024-07-01 꼴로*/
    setRows(
      [...rows, newRow].sort((a, b) => new Date(a.date) - new Date(b.date))
    ); // 날짜 기준으로 내림차순 정렬
    setNewRow({
      date: "",
      category: "",
      item: "",
      income: "",
      expense: "",
      notes: "",
    });
  };
  //달력에서 날짜 선택할 때
  const handleDateChange = (date) => {
    setNewRow({ ...newRow, date });
  };
  //input 값들이 실시간으로 입력하는걸 반영하기 위해
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  //category 지출/ 수입 선택할 때
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewRow({ ...newRow, category: value, income: "", expense: "" });
  };

  //지출 항목 필터링
  const expenseData = rows.filter((row) => row.category === "지출");
  // 수입 항목 필터링
  const incomeData = rows.filter((row) => row.category === "수입");

  //로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //input-form onoff
  const [inputForm, setInputForm] = useState(false);

  //로그인 버튼 클릭시 로그인 true 로그인화면도 true
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(true);
  };
  //로그아웃 버튼 누르면 로그아웃~
  const handleLogout = () => {
    setIsLoggedIn(false);
    setInputForm(false);
  };

  //로그인 화면 보이게 하기 위함
  const [showLogin, setShowLogin] = useState(false); // 로그인 페이지 표시 상태 관리

  //다시 원래화면으로 돌아가기 위해 false로 바꿔치기
  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setInputForm(true);
  };

  // 로그인 버튼 눌러서 showLogin true로 바뀌면 login 컴포넌트로 이동
  if (showLogin) {
    return <Login onLogin={handleSuccessfulLogin} />;
  }

  return (
    <div className="all">
      <header className="header">
        <h1>SPIDERS&#x1F577;</h1>
        <div className="header-right">
          <h4> 전체 회비 </h4>
          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <button onClick={handleLogin}>관리자 로그인</button>
          )}
        </div>
      </header>
      <main className="main-content">
        <Section1
          rows={rows}
          addRow={addRow}
          newRow={newRow}
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          handleDateChange={handleDateChange}
          inputForm={inputForm}
        />
        <Section2 incomeData={incomeData} expenseData={expenseData} />
      </main>
    </div>
  );
}
