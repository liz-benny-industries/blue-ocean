import React, { useState, useContext } from 'react';
import AWS from 'aws-sdk';
import { s3Creds } from '../../config';
import AppContext from './context';

const S3_BUCKET = 'blue-ocean-lp';
const REGION = 'us-west-1';

AWS.config.update({
  accessKeyId: s3Creds.accessKey,
  secretAccessKey: s3Creds.secret,
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
            `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`
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
