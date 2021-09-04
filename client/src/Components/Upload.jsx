import React, { useState, useContext } from 'react';
import AWS from 'aws-sdk';
import AppContext from './context';
import config from '../../../config/config';

const S3_BUCKET = 'blue-ocean-images';
const REGION = 'us-east-2';

AWS.config.update({
  accessKeyId: config.S3_ACCESS_KEY,
  // accessKeyId: '',
  secretAccessKey: config.S3_SECRET,
  // secretAccessKey: '',
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = ({ setImageURL }) => {
  const { user } = useContext(AppContext);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const fileName = Math.floor(Math.random() * 1000000000) + user.uid;
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) {
          console.log(err);
        } else {
          setImageURL(
            `https://blue-ocean-images.s3.us-east-2.amazonaws.com/${fileName}`
          );
        }
      });
  };
  return (
    <div>
      <div>
        Native SDK File Upload Progress is
        {progress}
        %
      </div>
      <input type="file" onChange={handleFileInput} />
      <button type="button" onClick={() => uploadFile(selectedFile)}>
        Upload to S3
      </button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
