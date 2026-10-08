'use client';

import {
  EventItem,
  Ticket,
  ResourceItem,
  BusRoute,
  FAQItem,
  LostFoundItem,
  ComplaintItem,
  INITIAL_EVENTS,
  INITIAL_TICKETS,
  INITIAL_RESOURCES,
  SHUTTLE_BUS_ROUTES,
  EXAM_FAQS,
  INITIAL_LOST_FOUND,
  INITIAL_COMPLAINTS
} from './data';

export interface StudentProfile {
  name: string;
  studentId: string;
  department: string;
  batch: string;
  email: string;
  phone: string;
  campus: string;
  avatarLetter: string;
}

export const DEFAULT_STUDENT: StudentProfile = {
  name: 'Rafiqul Islam',
  studentId: '211-15-4890',
  department: 'Computer Science & Engineering',
  batch: 'Batch 54',
  email: 'rafiqul.cse54@cityuniversity.edu.bd',
  phone: '+880 1712-345678',
  campus: 'Permanent Campus (Birulia, Savar)',
  avatarLetter: 'R'
};

// Local storage helper
export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`cu_campusos_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`cu_campusos_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

// Generate realistic crisp QR Code matrix SVG representation
export function generateQrMatrix(text: string, size: number = 180): string {
  // Hash text to generate deterministic pseudo-random QR pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const gridSize = 21; // standard QR size
  const modules: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  // Helper to draw position detection patterns (3 corners)
  const drawCorner = (rStart: number, cStart: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          modules[rStart + r][cStart + c] = true;
        }
      }
    }
  };

  drawCorner(0, 0); // Top-left
  drawCorner(0, gridSize - 7); // Top-right
  drawCorner(gridSize - 7, 0); // Bottom-left

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }

  // Fill data modules pseudo-deterministically using hash + character codes
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming) {
        const seed = Math.sin(hash * 0.13 + r * 17 + c * 31) * 10000;
        const pseudoRand = seed - Math.floor(seed);
        modules[r][c] = pseudoRand > 0.48;
      }
    }
  }

  const cellSize = size / gridSize;
  let rects = '';
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (modules[r][c]) {
        rects += `<rect x="${(c * cellSize).toFixed(1)}" y="${(r * cellSize).toFixed(1)}" width="${cellSize.toFixed(1)}" height="${cellSize.toFixed(1)}" fill="#002147"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="bg-white p-2 rounded shadow-inner">${rects}</svg>`;
}
