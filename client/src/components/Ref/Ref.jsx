import React, { useRef } from "react";

function Ref() {
  const secondWayForm = useRef(null);

  const firstWay = () => {
    document.querySelector("#first-way").reset();
  };

  const secondWay = () => {
    secondWayForm.current.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} id="first-way">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button onClick={firstWay}>Submit</button>
      </form>
      <form
        onSubmit={(e) => e.preventDefault()}
        id="second-way"
        ref={secondWayForm}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button onClick={secondWay}>Submit</button>
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Ref;