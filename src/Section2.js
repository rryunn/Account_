import React from "react";
import "./section2.css";

function Section2({ incomeData = [], expenseData = [] }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //item 항목 같은걸로 그룹화 _ 수입.ver
  const groupItemIncome = (data) => {
    return data.reduce((acc, row) => {
      //acc 누적값
      if (acc[row.item]) {
        acc[row.item].income += parseFloat(row.income) || 0;
      } else {
        acc[row.item] = { ...row }; //현재 항목을 acc에 복사
        acc[row.item].income = parseFloat(row.income) || 0;
      }
      return acc;
    }, {}); // 누적값 acc를 빈 객체로 초기화
  };

  //item 항목 같은걸로 그룹화 _ 지출.ver
  const groupItemExpense = (data) => {
    return data.reduce((acc, row) => {
      if (acc[row.item]) {
        acc[row.item].expense += parseFloat(row.expense) || 0;
      } else {
        acc[row.item] = { ...row };
        acc[row.item].expense = parseFloat(row.expense) || 0;
      }
      return acc;
    }, {});
  };
  //객체의 값들을 배열로 반환한다.
  const groupedIncomeData = Object.values(groupItemIncome(incomeData));

  const groupedExpenseData = Object.values(groupItemExpense(expenseData));

  // 수입 항목의 합계 계산
  const totalIncome = incomeData.reduce(
    (total, item) => total + (parseFloat(item.income) || 0),
    0
  );
  const totalExpense = expenseData.reduce(
    (total, item) => total + (parseFloat(item.expense) || 0),
    0
  ); //item은 현재 배열 요소들을 의미

  return (
    <div className="section2-content">
      <h2>Summary</h2>

      <table id="income_list">
        <thead>
          <tr>
            <th>구분</th>
            <th>항목</th>
            <th>수입금액</th>
            <th>지출금액</th>
          </tr>
        </thead>
        <tbody>
          {groupedIncomeData.map((item, index) => (
            <tr key={index}>
              <td>수입</td>
              <td>{item.item}</td>
              <td>{item.income ? formatNumber(item.income) : ""}</td>
              <td>0</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#c8c8c8" }}>
            <td>
              <strong>수입총계</strong>
            </td>
            <td></td>
            <td>
              <strong>{totalIncome ? formatNumber(totalIncome) : ""}</strong>
            </td>
            <td></td>
          </tr>
          {groupedExpenseData.map((item, index) => (
            <tr key={index}>
              <td>지출</td>
              <td>{item.item}</td>
              <td>0</td>
              <td>{item.expense ? formatNumber(item.expense) : ""}</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#c8c8c8" }}>
            <td>
              <strong>지출총계</strong>
            </td>
            <td></td>
            <td></td>
            <td>
              <strong>{totalExpense ? formatNumber(totalExpense) : ""}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>총계</strong>
            </td>
            <td></td>
            <td></td>
            <td id="left-money">
              <strong>{formatNumber(totalIncome - totalExpense)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Section2;
