import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import '../presentation/Journal.css';

function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entry, setEntry] = useState(null); // holds backend entry
  const [editing, setEditing] = useState(false);
  const [tempText, setTempText] = useState('');
  const [tempMood, setTempMood] = useState('Happy');

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  useEffect(() => {
    fetchEntry();
  }, [formattedDate]);

  const fetchEntry = async () => {
    try {
      const res = await fetch(`http://localhost:8084/api/journal/${formattedDate}`);
      if (res.ok) {
        const data = await res.json();
        setEntry(data);
      } else {
        setEntry(null); // no entry found
      }
    } catch (err) {
      console.error("Error fetching journal entry", err);
      setEntry(null);
    }
  };

  const handleAdd = () => {
    setEditing(true);
    setTempText('');
    setTempMood('Happy');
  };

  const handleEdit = () => {
    setEditing(true);
    setTempText(entry?.text || '');
    setTempMood(entry?.mood || 'Happy');
  };

  const handleDone = async () => {
    try {
      await fetch(`http://localhost:8084/api/journal/${formattedDate}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formattedDate,
          text: tempText,
          mood: tempMood
        }),
      });
      setEditing(false);
      fetchEntry();
    } catch (err) {
      console.error("Error saving entry", err);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8084/api/journal/${formattedDate}`, {
        method: 'DELETE',
      });
      setEntry(null);
      setEditing(false);
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="journal-container container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setSelectedDate(subDays(selectedDate, 1))}>←</button>
        <h3 className="m-0">{format(selectedDate, 'PPP')}</h3>
        <button className="btn btn-outline-secondary" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>→</button>
      </div>

      {!editing && !entry && (
        <button className="btn btn-primary" onClick={handleAdd}>Add Journal Entry</button>
      )}

      {editing && (
        <div className="mt-3">
          <h5>Mood Tracker</h5>
          <select
            className="form-select mb-3"
            value={tempMood}
            onChange={(e) => setTempMood(e.target.value)}
          >
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😢 Sad</option>
            <option value="Anxious">😰 Anxious</option>
            <option value="Relaxed">😌 Relaxed</option>
            <option value="Angry">😠 Angry</option>
          </select>

          <textarea
            className="form-control mb-2"
            rows="5"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
          />
          <button className="btn btn-success me-2" onClick={handleDone}>Done</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {!editing && entry && (
        <div className="entry mt-3">
          <p className="fw-bold">Mood: {entry.mood}</p>
          <p
            className="bg-light p-3 rounded"
            onClick={() => handleEdit()}
          >
            {entry.text}
          </p>

          <div className="mt-2">
            <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
            <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;
