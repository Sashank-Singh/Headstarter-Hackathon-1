# Fovus File Upload Service

## Overview

The Fovus File Upload Service is a web application that allows users to upload text files to an Amazon S3 bucket and save metadata in an Amazon DynamoDB table. Once the file is uploaded, a Lambda function is triggered, which launches an EC2 instance. The EC2 instance processes the file by appending the length of the input text to the file content and saves the result back to S3. The processed file's metadata is then updated in DynamoDB, and the EC2 instance is terminated automatically.

## Features

- **File Upload**: Users can upload text files via a responsive web interface.
- **AWS Integration**: Files are stored in S3, and metadata is saved in DynamoDB.
- **Automated Processing**: A Lambda function triggers an EC2 instance to process the uploaded files.
- **EC2 Instance Management**: EC2 instances are launched and terminated automatically after processing.

## Architecture

1. **Frontend**: A React application that provides the user interface for file upload.
2. **Backend**:
   - **Lambda Functions**: Lambda functions handle metadata storage and EC2 instance.
   - **S3**: Stores uploaded files and processed output files.
   - **DynamoDB**: Stores metadata about the uploaded and processed files.
   - **EC2**: Processes the uploaded files and generates the output.

## Prerequisites

- AWS Account
- Node.js and npm installed
- AWS CLI installed and configured
- AWS CDK installed

## Setup

### 1. Clone the Repository
git clone https://github.com/Sashank-Singh/fovus-coding-challenge
cd fovus-coding-challenge

2. Install Dependencies

**Frontend**

cd frontend
npm install

**Backend**

cd ../backend
npm install


3. Deploy AWS

cd ../cdk
cdk bootstrap
cdk deploy


4. Start the Frontend

cd ../frontend
npm start


Usage

Access the Web Interface: Open the web interface in your browser.
Upload a File: Enter text and choose a file to upload.
Submit: Click the submit button to upload the file to S3 and save metadata to DynamoDB.
Processing: The Lambda function triggers an EC2 instance to process the file.
Check Output: The processed file is saved back to S3 


Project Structure
frontend/: Contains the React application code.
backend/: Contains the Lambda function code and other backend logic.
cdk/: Contains the AWS CDK stack definitions for deploying the infrastructure.








