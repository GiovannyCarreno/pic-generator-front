export function downloadImage(base64Data, seedValue, truncationPsiValue, noiseModeValue) {
  const psiFormatted = truncationPsiValue.toFixed(2).replace('.', '_');
  const filename = `rock-art_seed${seedValue}_psi${psiFormatted}_${noiseModeValue}.png`;

  const link = document.createElement('a');
  link.href = `data:image/png;base64,${base64Data}`;
  link.download = filename;
  link.click();
}

export function copySeed(seedValue) {
  navigator.clipboard.writeText(seedValue.toString());
}

export function generateRandomSeed() {
  return Math.floor(Math.random() * 2147483647) + 1;
}
