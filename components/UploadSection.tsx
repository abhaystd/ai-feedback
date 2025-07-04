'use client';
import { useState, ChangeEvent } from 'react';
import styles from './UploadSection.module.css';

interface EvaluationResult {
  scores: Record<string, number>;
  overallFeedback: string;
  observation: string;
}

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit. Please upload a smaller file.');
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/analyze-call', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      const data: EvaluationResult = await res.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response received.');
      }
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred.');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept=".mp3,.wav"
        className={styles.fileInput}
        onChange={handleUpload}
      />
      {file && <audio controls src={URL.createObjectURL(file)} className={styles.audio} />}
      <button
        onClick={handleProcess}
        disabled={processing}
        className={`${styles.button} ${processing ? styles.disabled : ''}`}
      >
        {processing ? 'Processing...' : 'Process'}
      </button>

      {error && <p className={styles.error}>Error: {error}</p>}

      {result && (
        <div className={styles.resultBox}>
          <h3 className={styles.resultTitle}>Scores</h3>
          <ul className={styles.scoreList}>
            {Object.entries(result.scores || {}).map(([key, value]) => (
              <li key={key} className={styles.scoreItem}>
                {key}: {value}
              </li>
            ))}
          </ul>
          <p><strong>Overall Feedback:</strong> {result.overallFeedback || 'N/A'}</p>
          <p><strong>Observation:</strong> {result.observation || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
