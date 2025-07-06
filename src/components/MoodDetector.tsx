'use client';

import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

type Props = {
  onMoodDetected: (mood: string) => void;
};

export default function MoodDetector({ onMoodDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);

  const startDetection = async () => {
    setLoading(true);

    
    const MODEL_URL = '/models';

await faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector_model`);
await faceapi.nets.faceExpressionNet.loadFromUri(`${MODEL_URL}/face_expression_model`);


    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setCameraStarted(true);
    setLoading(false);

    const interval = setInterval(async () => {
      if (videoRef.current && !videoRef.current.paused) {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detection && detection.expressions) {
          const mood = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1])[0][0];
          onMoodDetected(mood);
        }
      }
    }, 3000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  };

  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold text-white mb-2">🎭 Mood Detector</h2>

      {!cameraStarted && (
        <button
          onClick={startDetection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          {loading ? 'Starting...' : 'Detect Mood'}
        </button>
      )}

      {cameraStarted && (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="mt-4 mx-auto rounded-lg border border-white w-64 h-44 object-cover"
        />
      )}
    </div>
  );
}
