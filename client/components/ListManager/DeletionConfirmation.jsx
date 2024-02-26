import React from "react";

const DeletionConfirmation = () => {
  return (
    <div id='deletionConfirmation'>
      <h1>{`Are you sure you want to delete the list "${listName}"?`}</h1>
      <button>Cancel</button>
      <button>Delete</button>
    </div>
  )
}

export default DeletionConfirmation;