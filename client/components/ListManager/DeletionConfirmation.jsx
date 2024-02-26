import React from "react";

const DeletionConfirmation = ({ listToDelete, cancelDeletion }) => {
  return (
    <div id='deletionConfirmation'>
      <h2>{`Are you sure you want to delete the list "${listToDelete}"?`}</h2>
      <div id='buttons'>
        <button id='cancelButton' onClick={cancelDeletion}>Cancel</button>
        <button id='deleteButton'>Delete</button>
      </div>
    </div>
  )
}

export default DeletionConfirmation;