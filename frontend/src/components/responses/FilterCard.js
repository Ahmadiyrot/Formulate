import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { format } from 'date-fns';

const FilterCard = () => {
  const [filter, setFilter] = useState({
    SearchQuery: null,
    Date: null,
    Status: null,
    Pinned: false,
  });

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="card p-3 bg-white shadow-sm" style={{ width: '250px', borderRadius: '15px' }}>
      {/* Filter Icon and Title */}
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-funnel me-2"></i>
        <h5 className="m-0">Filter By</h5>
      </div>

      {/* Search Input */}
      <Form.Group controlId="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          className="bg-light"
          style={{ borderRadius: '10px' }}
          value={filter.SearchQuery || ''}
          onChange={(e) => {
            const value = e.target.value.trim() || null;
            setFilter({ ...filter, SearchQuery: value });
          }}
        />
      </Form.Group>

      {/* Date Picker */}
      <div className="mb-3">
        <DatePicker
          onChange={(date) => {
            setSelectedDate(date);
            const formattedDate = date ? format(date, 'MM/dd/yyyy') : null;
            setFilter({ ...filter, Date: formattedDate });
          }}
          value={selectedDate}
          className="w-100 mt-2"
        />
      </div>

      {/* Form Status Dropdown */}
      <Form.Group controlId="formStatus" className="mb-3">
        <Dropdown>
          <Dropdown.Toggle
            className="w-100 bg-light text-dark border-0"
            style={{ borderRadius: '10px' }}
          >
            {filter.Status || 'Form status'}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            <Dropdown.Item onClick={() => setFilter({ ...filter, Status: 'Active' })}>
              Active
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter({ ...filter, Status: 'Paused' })}>
              Paused
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      {/* Pinned Forms Button */}
      <Button
        className={`w-100 mb-3 ${filter.Pinned ? 'bg-primary text-white' : 'bg-light text-dark'}`}
        style={{ borderRadius: '10px' }}
        onClick={() => setFilter({ ...filter, Pinned: !filter.Pinned })}
      >
        Pinned Forms
      </Button>

      {/* Reset Filter Button */}
      <Button
        className="w-100 bg-danger text-white d-flex align-items-center justify-content-center"
        style={{ borderRadius: '10px' }}
        onClick={() => {
          setFilter({
            SearchQuery: null,
            Date: null,
            Status: null,
            Pinned: false,
          });
          setSelectedDate(null);
        }}
      >
        <i className="bi bi-arrow-repeat me-2"></i>
        Reset Filter
      </Button>

      {/* Apply Button */}
      <Button
        className="w-100 bg-primary text-white d-flex align-items-center justify-content-center mt-3"
        style={{ borderRadius: '10px' }}
        onClick={() => console.log(filter)}
      >
        Apply
      </Button>
    </div>
  );
};

export default FilterCard;
