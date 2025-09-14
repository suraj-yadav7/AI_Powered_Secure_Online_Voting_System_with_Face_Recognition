import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Check, X, Eye, Scan, Vote, Shield } from 'lucide-react';
import CameraCapture from "../components/CameraCapture"
import { Button } from './ui/button';
import { Link, useParams } from 'react-router-dom';
const FaceRecognition = () => {
  const [file, setFile] = useState(null);
  const [encoding, setEncoding] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voteBox, setVoteBox] = useState(false)
  const [votingSuccessful, setVotingSuccessful] = useState(false)
  const {id} = useParams()
  const electionId =  id || "68b1e396f7fc4323e668e61a"
  const handleEncode = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    // Simulate encoding process
    setTimeout(() => {
      setEncoding({ id: Math.random().toString(36), timestamp: Date.now() });
      setIsProcessing(false);
    }, 1500);
  };

  const handleVerify = async () => {
    if (!file ) return;
    setIsProcessing(true);
    
    // Simulate verification process
    setTimeout(() => {
      const match = Math.random() > 0.3; // 70% chance of match for demo
      setVerifyResult({
        match,
        distance: (Math.random() * 0.5).toFixed(3),
        confidence: match ? (0.85 + Math.random() * 0.14).toFixed(3) : (0.2 + Math.random() * 0.4).toFixed(3)
      });
      setIsProcessing(false);
    }, 2000);
    setTimeout(() => {
      setVerifyResult(null)
      setVoteBox(true)
    }, 4500)
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setVerifyResult(null);
    }
  };

  const handleCameraCapture = (base64) => {

    setFile("pyton fastapi- internal server error");
    setVerifyResult(null);
  };

  const voteConfimed = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setVotingSuccessful(true)
    }, 1500)
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Face Recognition </h1>
        <p className="text-gray-600">Use your camera to test face encoding and verification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Input Methods */}
        <div className="space-y-6">
          {/* <div className="bg-gray-250 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </h3>
            
            <div className="border-2 border-dashed  bg-amber-100 border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to select an image file
                </span>
              </label>
            </div>

            {file && typeof file === 'object' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">✅ File selected: {file.name}</p>
              </div>
            )}
          </div> */}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Capture
            </h3>
            <CameraCapture onCapture={handleCameraCapture} />

            
            {file && typeof file === 'string' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">✅ Image captured from camera</p>
              </div>
            )}
          </div>
            <div className='flex justify-center items-center '>
              <Link to={`/voting/${electionId}`}>
                <Button className="px-6 bg-gray-700 cursor-pointer">Back</Button>
              </Link>
            </div>
        </div>

        {/* Right Column - Actions & Results */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={handleVerify}
                disabled={!file || isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                 <Eye className="w-4 h-4" />
                {/* <Scan className="w-4 h-4" /> */}
                {isProcessing ?  "Verifying..." : "Verify Face"}
              </button>
              
              {/* <button
                onClick={handleVerify}
                disabled={!file || !encoding || isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
                {isProcessing ? "Verifying..." : "Verify Face"}
              </button> */}
            </div>



          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {/* Encoding Status */}
            {encoding && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Encoding Complete</h4>
                </div>
                <p className="text-sm text-green-700">
                  Face encoding generated successfully
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ID: {encoding.id}
                </p>
              </div>
            )}

            {/* Verification Results */}
            {verifyResult && (
              <div className={`border rounded-xl p-6 ${
                verifyResult.match 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {verifyResult.match ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Face Match Found</h4>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-800">No Face Match</h4>
                    </>
                  )}
                </div>
                
                
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className={`font-mono ${verifyResult.match ? 'text-green-700' : 'text-red-700'}`}>
                      {verifyResult.distance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className={`font-mono ${verifyResult.match ? 'text-green-700' : 'text-red-700'}`}>
                      {verifyResult.confidence}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
                        {/* Vote Confirmation Modal */}
      {voteBox && (

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Your Vote</h3>
              <p className="text-gray-600 mb-6">
                {/* You are about to vote for <strong>{selectedNominee.full_name}</strong> from <strong>{selectedNominee.political_party}</strong>. */}
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Important:</strong> Once submitted, your vote cannot be changed. Please ensure this is your final choice.
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  // onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                onClick={voteConfimed}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Vote
                </button>
              </div>
            </div>

      )}
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}

      {votingSuccessful &&(
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center gap-3">
            <span className="text-gray-700">You Have Successfully Casted Your Vote.</span>
            <p>Thank You!</p>
          </div>
        </div>
      )}


    </div>
  );
};

export default FaceRecognition