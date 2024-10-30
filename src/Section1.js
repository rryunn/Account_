import React, { useState, useEffect } from "react";
import "./section1.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Section1({
  rows,
  addRow,
  newRow,
  handleChange,
  handleCategoryChange,
  handleDateChange,
  inputForm,
}) {
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      addRow();
    }
  };
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [semester, setSemester] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentSemester =
      currentMonth >= 3 && currentMonth <= 8 ? "1학기" : "2학기";

    setSemester(`${currentYear}년 ${currentSemester}`);
  }, []);

  const ChangeSemester = (direction) => {
    let [year, term] = semester.split(" ");
    year = parseInt(year, 10);
    let [semesterNumber, suffix] = term.split("학기");

    if (direction === "prev") {
      if (semesterNumber === "2") {
        semesterNumber = "1";
      } else {
        year -= 1;
        semesterNumber = "2";
      }
    } else if (direction === "next") {
      if (semesterNumber === "1") {
        semesterNumber = "2";
      } else {
        year += 1;
        semesterNumber = "1";
      }
    }
    setSemester(`${year}년 ${semesterNumber}학기`);
  };
  return (
    <div className="section1-content">
      <label>
        <button onClick={() => ChangeSemester("prev")}>{"<"}</button>
        {semester}
        <button onClick={() => ChangeSemester("next")}>{">"}</button>
        <br />
        {inputForm ? (
          <span className="semester-info">
            * 1학기 기준 : 3월 ~ 8월, 2학기 기준 : 9월 ~ 2월
          </span>
        ) : (
          ""
        )}
      </label>
      <table id="money_list">
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>항목</th>
            <th>수입</th>
            <th>지출</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.date ? new Date(row.date).toLocaleDateString() : ""}</td>
              <td>{row.category}</td>
              <td>{row.item}</td>
              <td>{row.income ? formatNumber(row.income) : ""}</td>
              <td>{row.expense ? formatNumber(row.expense) : ""}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {inputForm ? (
        <div className="input-form">
          <DatePicker
            selected={newRow.date}
            onChange={(date) => handleDateChange(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜"
          />
          <p>
            <select
              name="category"
              value={newRow.category}
              onChange={handleCategoryChange}
            >
              <option value="">구분</option>
              <option value="수입">수입</option>
              <option value="지출">지출</option>
            </select>

            <input
              type="number"
              name="income"
              placeholder="수입"
              value={newRow.income}
              onChange={handleChange}
              disabled={newRow.category === "지출"}
            />
            <input
              type="number"
              name="expense"
              placeholder="지출"
              value={newRow.expense}
              onChange={handleChange}
              disabled={newRow.category === "수입"}
            />
          </p>
          <input
            type="text"
            name="item"
            placeholder="항목"
            value={newRow.item}
            onChange={handleChange}
          />
          <input
            type="text"
            name="notes"
            placeholder="비고"
            value={newRow.notes}
            onChange={handleChange}
            onKeyDown={onCheckEnter}
          />
          <button onClick={addRow}>확인</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Section1;
