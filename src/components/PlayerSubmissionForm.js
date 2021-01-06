import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  // props.fields is an array
  const [formFields, setFormField] = useState(props.fields) 

  // Event handlers
  const onInputChange = (event) => {
    const newFormFields = [...formFields]
    for (const field of newFormFields) {
      if (typeof field === 'object' && event.target.name === field.key ) {
        field[field.key] = event.target.value
      } 
      setFormField(newFormFields)
    } 
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.sendSubmission(formFields)
    
    let emptyForm = []
    for (const field of props.fields) {
        if (typeof field === 'object') {
          field[field.key] = '';
          emptyForm.push({
            ...field, 
          })
        } else {
          emptyForm.push(field);
        }
    }
   
    setFormField(emptyForm)
  }

  const inputContent = props.fields.map( (field, i) => {
    if (field.key) {
      return (
        <input
          key={field.key}
          name={field.key}
          placeholder={field.placeholder}
          value={formFields[i][field.key]}
          onChange={onInputChange}
          type="text"
        />
      );
    } else {
      return field
    }
  })
  
  if (props.isSubmitted) {
    return (
      <>
      </>
    );
  } else {
    return (
      <div className="PlayerSubmissionForm">
        <h3>Player Submission Form for Player #{ props.index }</h3>
  
        <form className="PlayerSubmissionForm__form" onSubmit={onFormSubmit} >
  
          <div className="PlayerSubmissionForm__poem-inputs">
            {
              inputContent
            }
          </div>
  
          <div className="PlayerSubmissionForm__submit">
            <input type="submit" 
                   value="Submit Line" 
                   className="PlayerSubmissionForm__submit-btn" 
            />
          </div>
        </form>
      </div>
    );
  }
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
