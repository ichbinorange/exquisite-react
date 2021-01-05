import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  const [formFields, setFormField] = useState(props.field)

  // Event handlers
  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields
    }
    newFormFields[event.target.name] = event.target.value
    setFormField(newFormFields)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.submissionCallback(formFields)

    setFormField({
      adjective: '',
      noun: '',
      adverb: '',
      verb: '',
    })
  }

  const inputContent = props.fields.map( (field, i) => {
    if (field.key) {
      return <input
        key={ i }
        placeholder={ field.placeholder }
        // value={ [field.key] }
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
          <input
            placeholder="hm..."
            type="text" />

        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
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
