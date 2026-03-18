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
