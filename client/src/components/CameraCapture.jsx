import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Check, X, Eye, Scan } from 'lucide-react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setError("");
    } catch (err) {
      setError("Failed to access camera: " + err.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL('image/jpeg');
    onCapture(base64);
    setTimeout(()=> {
      stopCamera()
    }, 4000)
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative bg-gray-900 rounded-lg overflow-hidden border">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-64 object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <p>Camera preview will appear here</p>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-3">
        {!stream ? (
          <button
            onClick={startCamera}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Camera className="w-4 h-4" />
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Stop Camera
          </button>
        )}
        <button
          onClick={captureImage}
          disabled={!stream}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Scan className="w-4 h-4" />
          Capture Image
        </button>
      </div>
    </div>
  );
};

export default CameraCapture