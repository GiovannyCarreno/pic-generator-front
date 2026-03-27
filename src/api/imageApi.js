import { API_URL } from '../constants/config';

export async function generateSingleImage({ seed, truncation_psi, noise_mode }) {
  const response = await fetch(`${API_URL}/generateSingle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seed, truncation_psi, noise_mode }),
  });

  if (!response.ok) {
    throw new Error('Error al generar la imagen');
  }

  return response.json();
}

export async function generateMultipleImages({ truncation_psi, noise_mode, number }) {
  const response = await fetch(`${API_URL}/generateSeveral`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ truncation_psi, noise_mode, number }),
  });

  if (!response.ok) {
    throw new Error('Error al generar las imágenes');
  }

  return response.json();
}

export async function compareModels(imageFile) {
  const formData = new FormData();
  formData.append('imagen', imageFile);

  const response = await fetch(`${API_URL}/comparar`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Error al comparar modelos';
    try {
      const errorData = await response.json();
      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }
    } catch {
      // Si el backend no retorna JSON, se conserva mensaje genérico.
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
