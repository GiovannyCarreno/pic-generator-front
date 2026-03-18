import { useState } from 'react';
import { generateSingleImage, generateMultipleImages } from '../api/imageApi';
import { downloadImage, copySeed, generateRandomSeed } from '../utils/imageUtils';

export function useImageGenerator() {
  const [mode, setMode] = useState('single');
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(() => generateRandomSeed());
  const [seedInput, setSeedInput] = useState(() => generateRandomSeed().toString());
  const [truncationPsi, setTruncationPsi] = useState(0.6);
  const [noiseMode, setNoiseMode] = useState('random');
  const [numberOfImages, setNumberOfImages] = useState(4);
  const [singleResult, setSingleResult] = useState(null);
  const [multipleResults, setMultipleResults] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateSingle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSingleImage({
        seed,
        truncation_psi: truncationPsi,
        noise_mode: noiseMode,
      });
      setSingleResult(data);
      setMultipleResults(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMultiple = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateMultipleImages({
        truncation_psi: truncationPsi,
        noise_mode: noiseMode,
        number: numberOfImages,
      });
      setMultipleResults(data);
      setSingleResult(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedInputChange = (e) => {
    const value = e.target.value;
    setSeedInput(value);
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setSeed(numValue);
    }
  };

  const handleSeedBlur = (e, seed) => {
    const value = e.target.value;
    if (
      value === '' ||
      isNaN(parseInt(value, 10)) ||
      parseInt(value, 10) <= 0
    ) {
      setSeedInput(seed.toString());
    }
  };

  const handleRandomizeSeed = () => {
    const newSeed = generateRandomSeed();
    setSeed(newSeed);
    setSeedInput(newSeed.toString());
  };

  return {
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
  };
}
