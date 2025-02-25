import React from 'react';

function Chat1({ message }) {
  return (
    <div className="flex justify-start">

    <div className="max-w-[50%] w-auto px-3 py-2 bg-yellow-400 rounded-b-2xl rounded-tr-2xl break-words whitespace-pre-wrap">
      {message}
    </div>
    </div>

  );
}

export default Chat1;