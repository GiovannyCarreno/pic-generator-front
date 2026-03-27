import React from 'react';
import Header from './components/Header/Header';
import ModeSelector from './components/ModeSelector/ModeSelector';
import GenerationControls from './components/GenerationControls/GenerationControls';
import SingleImageResult from './components/SingleImageResult/SingleImageResult';
import MultipleImagesResult from './components/MultipleImagesResult/MultipleImagesResult';
import RestorationEditor from './components/RestorationEditor/RestorationEditor';
import ReconstructionTab from './components/ReconstructionTab/ReconstructionTab';
import Footer from './components/Footer/Footer';
import { useImageGenerator } from './hooks/useImageGenerator';
import './App.css';

export default function App() {
  const {
    mode,
    setMode,
    loading,
    seed,
    seedInput,
    truncationPsi,
    setTruncationPsi,
    noiseMode,
    setNoiseMode,
    numberOfImages,
    setNumberOfImages,
    singleResult,
    multipleResults,
    error,
    handleGenerateSingle,
    handleGenerateMultiple,
    handleSeedInputChange,
    handleSeedBlur,
    handleRandomizeSeed,
    downloadImage,
    copySeed,
  } = useImageGenerator();

  return (
    <div className="app-container">
      <div className="main-content">
        <Header />

        <div className={`card ${mode === 'restoration' ? 'card--restoration' : ''}`}>
          <ModeSelector mode={mode} onModeChange={setMode} />

          {mode !== 'restoration' && mode !== 'reconstruction' && (
          <GenerationControls
            mode={mode}
            seedInput={seedInput}
            onSeedInputChange={handleSeedInputChange}
            onSeedBlur={(e) => handleSeedBlur(e, seed)}
            onRandomizeSeed={handleRandomizeSeed}
            numberOfImages={numberOfImages}
            onNumberOfImagesChange={setNumberOfImages}
            truncationPsi={truncationPsi}
            onTruncationPsiChange={setTruncationPsi}
            noiseMode={noiseMode}
            onNoiseModeChange={setNoiseMode}
            onGenerate={
              mode === 'single' ? handleGenerateSingle : handleGenerateMultiple
            }
            loading={loading}
            error={error}
          />
          )}

          {mode === 'restoration' && <RestorationEditor />}
          {mode === 'reconstruction' && <ReconstructionTab />}
        </div>

        {mode !== 'restoration' && mode !== 'reconstruction' && singleResult && (
          <SingleImageResult
            result={singleResult}
            truncationPsi={truncationPsi}
            noiseMode={noiseMode}
            onCopySeed={copySeed}
            onDownload={downloadImage}
          />
        )}

        {mode !== 'restoration' && mode !== 'reconstruction' && multipleResults && (
          <MultipleImagesResult
            results={multipleResults}
            truncationPsi={truncationPsi}
            noiseMode={noiseMode}
            onCopySeed={copySeed}
            onDownload={downloadImage}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
