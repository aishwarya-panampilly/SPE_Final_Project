import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import '../presentation/Journal.css';

function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [editing, setEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [tempText, setTempText] = useState('');

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const handleAdd = () => {
    setEditing(true);
    setTempText('');
  };

  const handleEdit = () => {
    setEditing(true);
    setTempText(entries[formattedDate] || '');
  };

  const handleDone = () => {
    setEntries({ ...entries, [formattedDate]: tempText });
    setEditing(false);
    setSelectedEntry(null);
  };

  const handleDelete = () => {
    const updated = { ...entries };
    delete updated[formattedDate];
    setEntries(updated);
    setSelectedEntry(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedEntry(null);
  };

  return (
    <div className="journal-container container mt-4">
      {/* Header with date navigation */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setSelectedDate(subDays(selectedDate, 1))}>←</button>
        <h3 className="m-0">{format(selectedDate, 'PPP')}</h3>
        <button className="btn btn-outline-secondary" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>→</button>
      </div>

      {/* Add Button */}
      {!editing && !entries[formattedDate] && (
        <button className="btn btn-primary" onClick={handleAdd}>Add Journal Entry</button>
      )}

      {/* Text Editor */}
      {editing && (
        <div className="mt-3">
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

      {/* Display Journal Entry */}
      {!editing && entries[formattedDate] && (
        <div className="entry mt-3">
          <p
            className="bg-light p-3 rounded"
            onClick={() => {
              if (selectedEntry !== formattedDate) {
                setSelectedEntry(formattedDate);
              }
            }}
          >
            {entries[formattedDate]}
          </p>

          {selectedEntry === formattedDate && (
            <div className="mt-2">
              <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
              <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Journal;
