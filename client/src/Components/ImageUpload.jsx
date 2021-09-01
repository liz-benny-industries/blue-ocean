import React, { useState } from 'react';

export default function ImageUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile({
      file: URL.createObjectURL(event.target.files[0])
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <img alt="" src={file} />
    </div>
  );
}
