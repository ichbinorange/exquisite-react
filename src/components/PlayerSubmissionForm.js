import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  const [formFields, setFormField] = useState(props.fields)

  // Event handlers
  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields
    }
    newFormFields[event.target.key] = event.target.value
    setFormField(newFormFields)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.sendSubmission(formFields)
    
    const emptyForm = props.fields.map((field) => {
        if (field.key) {
          return {
            key: field.key,
            placeholder: field.placeholder,
          }
        } else {
          return field;
        }
    })
    setFormField(emptyForm)
  }

  const inputContent = props.fields.map( (field) => {
    if (field.key) {
      return <input
        key={field.key}
        placeholder={field.placeholder}
        onChange={onInputChange}
        type="text"
      />;
    } else {
      return field;
    }
  })

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index }</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onFormSubmit} >

        <div className="PlayerSubmissionForm__poem-inputs">
          {
            // Put your form inputs here... We've put in one below as an example
            inputContent
          }
        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" 
                 value="Submit Line" 
                 className="PlayerSubmissionForm__submit-btn" 
                 onClick={onFormSubmit}
          />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
