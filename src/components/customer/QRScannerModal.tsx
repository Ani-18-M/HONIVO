import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Zap, Image, X, QrCode, Video, VideoOff, CheckCircle2, AlertCircle, UploadCloud } from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const { setCustomerTab, setSelectedBatchId, selectedBatchId, batches } = useApp();
  const [flashOn, setFlashOn] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera tracks cleanly
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Start real device camera feed via WebRTC
  const startCamera = async () => {
    setCameraError(null);
    setGalleryImage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access not supported in this browser.');
        return false;
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
        });
      } catch {
        // Fallback for desktop webcams or browsers that don't support environment facingMode
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setCameraActive(true);
      return true;
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError('Camera permission denied or camera device unavailable.');
      setCameraActive(false);
      return false;
    }
  };

  // Toggle flash torch if supported
  const toggleFlash = async () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = videoTrack.getCapabilities?.() as any;
        if (capabilities?.torch) {
          try {
            await videoTrack.applyConstraints({
              advanced: [{ torch: !flashOn } as any],
            });
            setFlashOn(!flashOn);
            return;
          } catch (e) {
            console.warn('Torch constraint failed', e);
          }
        }
      }
    }
    setFlashOn(!flashOn);
  };

  // Handle Simulate Scan button click
  const handleSimulateScan = async () => {
    setIsScanning(true);
    setScanSuccess(false);

    // Open real camera stream if not already open
    if (!cameraActive) {
      await startCamera();
    }

    // Run simulated scan countdown over live camera feed
    setTimeout(() => {
      setScanSuccess(true);
      setTimeout(() => {
        stopCamera();
        setSelectedBatchId(selectedBatchId || 'HC-2026-001');
        setCustomerTab('result');
      }, 800);
    }, 2200);
  };

  // Handle Gallery Image Upload from device
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setGalleryImage(result);
        setIsScanning(true);
        setScanSuccess(false);

        // Simulate QR code scanning on gallery image
        setTimeout(() => {
          setScanSuccess(true);
          setTimeout(() => {
            setSelectedBatchId(selectedBatchId || 'HC-2026-001');
            setCustomerTab('result');
          }, 800);
        }, 1800);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      const match = batches.find((b) => b.id.toLowerCase() === manualInput.trim().toLowerCase());
      if (match) setSelectedBatchId(match.id);
      else setSelectedBatchId('HC-2026-001');
      stopCamera();
      setCustomerTab('result');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-[85vh] bg-slate-950 text-white rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
      {/* Hidden Gallery Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleGalleryUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <button
          onClick={() => {
            stopCamera();
            setCustomerTab('home');
          }}
          className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-bold text-lg text-white">Scan QR Code</h3>
          <p className="text-xs text-amber-400 font-medium">Align the QR code within the frame</p>
        </div>
        <button
          onClick={() => (cameraActive ? stopCamera() : startCamera())}
          className={`p-2 rounded-full transition-colors ${
            cameraActive ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title={cameraActive ? 'Turn off camera' : 'Open camera'}
        >
          {cameraActive ? <Video className="w-5 h-5 text-amber-400" /> : <VideoOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Camera Viewfinder View */}
      <div className="relative my-auto w-full aspect-square max-w-[300px] mx-auto rounded-3xl border-2 border-amber-500/50 overflow-hidden flex items-center justify-center bg-slate-900 shadow-2xl">
        {/* Live Camera Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            cameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Gallery Uploaded Image */}
        {galleryImage && !cameraActive && (
          <img
            src={galleryImage}
            alt="Uploaded QR Code from Gallery"
            className="w-full h-full object-cover animate-fade-in"
          />
        )}

        {/* Fallback Mock Honey Jar Image when camera is inactive and no gallery image */}
        {!cameraActive && !galleryImage && (
          <img
            src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80"
            alt="Honey Jar QR Label"
            className="w-full h-full object-cover opacity-70"
          />
        )}

        {/* Overlay scanning viewfinder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className={`w-44 h-44 border-4 transition-colors duration-300 rounded-2xl relative flex items-center justify-center p-3 backdrop-blur-xs shadow-honey ${
            scanSuccess ? 'border-emerald-400 bg-emerald-500/10' : 'border-amber-400 bg-white/10'
          }`}>
            {/* Corner Brackets */}
            <div className={`absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 rounded-tl-lg ${scanSuccess ? 'border-emerald-400' : 'border-amber-400'}`}></div>
            <div className={`absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 rounded-tr-lg ${scanSuccess ? 'border-emerald-400' : 'border-amber-400'}`}></div>
            <div className={`absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 rounded-bl-lg ${scanSuccess ? 'border-emerald-400' : 'border-amber-400'}`}></div>
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 rounded-br-lg ${scanSuccess ? 'border-emerald-400' : 'border-amber-400'}`}></div>

            {/* Mock QR Target sticker overlay (hidden when camera is open or gallery image uploaded) */}
            {!cameraActive && !galleryImage && !scanSuccess && (
              <div className="w-32 h-32 bg-white/95 backdrop-blur-md rounded-xl p-2 flex flex-col items-center justify-center shadow-lg text-slate-900 border border-amber-300/60">
                <QrCode className="w-20 h-20 text-slate-900" />
                <span className="text-[10px] font-mono font-bold mt-1 text-amber-700">
                  {selectedBatchId || 'HC-2026-001'}
                </span>
              </div>
            )}

            {/* Success Checkmark Overlay */}
            {scanSuccess && (
              <div className="w-24 h-24 bg-emerald-950/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-lg text-emerald-400 border border-emerald-500/60 animate-scale-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <span className="text-[10px] font-mono font-bold mt-1 text-emerald-300">VERIFIED</span>
              </div>
            )}

            {/* Laser Line Scanning Effect */}
            {(isScanning || cameraActive || galleryImage) && !scanSuccess && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce"></div>
            )}
          </div>

          {/* Status Badge */}
          <div className="mt-4 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300 flex items-center gap-1.5 border border-amber-400/40">
            {scanSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">QR Verified! Opening...</span>
              </>
            ) : galleryImage ? (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Scanning Gallery QR Image...</span>
              </>
            ) : cameraActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Camera Live & Active</span>
              </>
            ) : isScanning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Scanning HONIVA Batch...</span>
              </>
            ) : (
              <span>Click "Simulate Scan" or upload from Gallery</span>
            )}
          </div>

          {cameraError && (
            <div className="mt-2 px-3 py-1 bg-red-950/80 text-red-300 text-[11px] rounded-lg border border-red-800/50 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span>{cameraError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls & Fallback */}
      <div className="space-y-4 z-10">
        <div className="flex items-center justify-center gap-6">
          {/* Flash Button */}
          <button
            onClick={toggleFlash}
            className={`p-4 rounded-full transition-all cursor-pointer ${
              flashOn ? 'bg-amber-500 text-slate-950 font-bold shadow-honey' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle Flash light"
          >
            <Zap className="w-5 h-5" />
          </button>

          {/* Simulate Scan Button */}
          <button
            onClick={handleSimulateScan}
            disabled={isScanning && scanSuccess}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-honey transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            <span>{cameraActive ? 'Scan Batch QR' : 'Simulate Scan'}</span>
          </button>

          {/* Upload from Gallery Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-full bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Upload QR image from Gallery"
          >
            <Image className="w-5 h-5" />
          </button>
        </div>

        {/* Manual Code Input Form */}
        <form onSubmit={handleManualSubmit} className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Batch ID manually (e.g. HC-2026-001)"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold text-white transition-colors flex-shrink-0 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
