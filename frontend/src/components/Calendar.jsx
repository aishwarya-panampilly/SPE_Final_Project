import React, { useEffect, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  parseISO
} from 'date-fns';
import '../presentation/Calendar.css';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch tasks with dueDate && not completed from backend
  useEffect(() => {
    fetch('http://localhost:8083/api/tasks/calendar')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Failed to load tasks:', err));
  }, []);

  // 🔹 Render header with month navigation
  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center mb-3 calendar-header">
      <button className="btn btn-outline-secondary" onClick={prevMonth}>←</button>
      <h4 className="mb-0">{format(currentMonth, 'MMMM yyyy')}</h4>
      <button className="btn btn-outline-secondary" onClick={nextMonth}>→</button>
    </div>
  );

  // 🔹 Render weekdays (Sun to Sat)
  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col text-center fw-bold" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="row border-bottom pb-2">{days}</div>;
  };

  // 🔹 Render calendar cells with task badges
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayFormatted = format(day, "d");

        const dayTasks = tasks.filter(task =>
          isSameDay(parseISO(task.dueDate), day)
        );

        days.push(
          <div
            className={`col cell p-2 ${
              !isSameMonth(day, monthStart) ? 'text-muted' : ''
            }`}
            key={day.toString()}
          >
            <div className="small fw-bold">{dayFormatted}</div>
            {dayTasks.map((task, idx) => (
              <div key={idx} className="badge bg-info text-dark mt-1 w-100 text-wrap">
                {task.text}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row g-2 mb-2" key={day.toString()}>{days}</div>);
      days = [];
    }

    return <div>{rows}</div>;
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="container calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default Calendar;
