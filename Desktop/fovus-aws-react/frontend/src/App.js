
import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from 'nanoid';
import { addItemToDynamoDB } from "./dynamodbOperations";
import './App.css';

const REGION = "us-east-2";
const BUCKET_NAME = "fovus-bucket-challenge";

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

function App() {
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [s3Url, setS3Url] = useState("");
  const [fileLabel, setFileLabel] = useState("Choose file (No file chosen)");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileLabel(file ? `Choose file (${file.name})` : "Choose file (No file chosen)");
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const fileId = nanoid();
    const s3Key = `${fileId}.input`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      await s3.send(new PutObjectCommand(params));
      const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;
      setS3Url(url);

      const s3Path = `${BUCKET_NAME}/${s3Key}`;

      await addItemToDynamoDB(fileId, textInput, s3Path);
      alert("File uploaded and metadata saved successfully.");
    } catch (error) {
      console.error("Error uploading file or saving metadata:", error);
      alert("Error uploading file or saving metadata.");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Fovus File Upload</h1>
        <div className="input-group">
          <label>Text Input:</label>
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>File Input:</label>
          <div className="custom-file-input">
            <label htmlFor="file-upload">{fileLabel}</label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileInput}
              required
            />
          </div>
        </div>
        <button onClick={handleUpload}>Submit</button>
        {s3Url && (
          <p className="s3-url">
            S3 URL: <a href={s3Url} target="_blank" rel="noopener noreferrer">{s3Url}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

