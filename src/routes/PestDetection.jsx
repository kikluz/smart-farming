import React, { useState, useRef } from "react";
import { Upload, Scan, AlertTriangle, CheckCircle, Info } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { pestDetectionApi } from "../api/pestDetectionApi";

const PestDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Reset previous result
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const data = await pestDetectionApi.detectPest(selectedFile);
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2 text-primary flex justify-center items-center gap-3">
          <Scan size={40} />
          AI Pest & Disease Detector
        </h1>
        <p className="opacity-70 max-w-2xl mx-auto">
          Upload a clear photo of your affected crop leaf or stem. Our advanced AI model will instantly identify potentials pests or diseases and provide treatment recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Upload Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Upload Photo</h2>

            {!previewUrl ? (
              <div
                className="border-2 border-dashed border-base-300 rounded-lg p-12 text-center hover:bg-base-200 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <Upload size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Drag & Drop or Click to Upload
                    </h3>
                    <p className="text-sm opacity-60 mt-1">
                      Supports JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden bg-base-200 aspect-video flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Uploaded crop"
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 bg-base-100/50 hover:bg-base-100"
                  onClick={resetUpload}
                >
                  ✕
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-primary w-full md:w-auto"
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan size={18} />
                    Analyze Photo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className="card bg-base-100 shadow-xl h-full min-h-[300px] flex items-center justify-center">
               <div className="text-center space-y-4">
                  <LoadingSpinner size="lg" />
                  <p className="font-medium animate-pulse">Scanning crop image...</p>
                  <p className="text-xs opacity-60">Identifying pathogens and pest markers</p>
               </div>
            </div>
          ) : result ? (
            <div className={`card shadow-xl border-l-8 ${result.isHealthy ? "border-success bg-success/5" : "border-error bg-error/5"}`}>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <h2 className="card-title text-2xl">{result.diseaseName}</h2>
                        {result.isHealthy ? (
                           <span className="badge badge-success gap-1"><CheckCircle size={12}/> Healthy</span>
                        ) : (
                           <span className="badge badge-error gap-1"><AlertTriangle size={12}/> {result.severity} Severity</span>
                        )}
                     </div>
                     <p className="text-sm opacity-70">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <h3 className="font-semibold flex items-center gap-2">
                   <Info size={18} className="text-info"/> 
                   Description
                </h3>
                <p className="text-sm leading-relaxed mb-4">
                   {result.description}
                </p>

                <h3 className="font-semibold mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-1 bg-base-100 p-4 rounded-lg shadow-sm">
                   {result.actions.map((action, idx) => (
                      <li key={idx} className="text-sm">{action}</li>
                   ))}
                </ul>
              </div>
            </div>
          ) : (
             <div className="card bg-base-100 shadow-xl border-2 border-dashed border-base-200 h-full flex flex-col items-center justify-center p-8 text-center text-base-content/30 select-none">
                <Scan size={48} className="mb-4 opacity-20"/>
                <p className="text-lg font-medium">No Analysis Results Yet</p>
                <p className="text-sm">Upload a photo and click analyze to see results here.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;
