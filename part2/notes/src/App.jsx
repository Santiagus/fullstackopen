import { useState } from "react";

function App({ notes }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  );
}

export default App;
