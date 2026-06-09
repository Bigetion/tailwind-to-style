import React, { useState, useEffect } from 'react';
import { tw } from 'tailwind-to-style';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { Play, RotateCcw } from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = tw({ name: 'demo-stack', _: 'flex flex-col gap-4' });

export function ProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (progress >= 100) { setRunning(false); return; }
    const timer = setTimeout(() => setProgress(p => Math.min(p + Math.random() * 8 + 2, 100)), 120);
    return () => clearTimeout(timer);
  }, [running, progress]);

  const start = () => { setProgress(0); setRunning(true); };
  const reset = () => { setProgress(0); setRunning(false); };

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Progress — Colors</h2>
        <p className={label}>Six color variants</p>
        <div className={stack}>
          <Progress value={75} label="Blue (default)" color="blue" />
          <Progress value={60} label="Green" color="green" />
          <Progress value={45} label="Red" color="red" />
          <Progress value={80} label="Yellow" color="yellow" />
          <Progress value={55} label="Purple" color="purple" />
          <Progress value={90} label="Indigo" color="indigo" />
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Progress — Sizes</h2>
        <div className={stack}>
          <Progress value={65} size="xs" label="Extra Small" />
          <Progress value={65} size="sm" label="Small" />
          <Progress value={65} size="md" label="Medium (default)" />
          <Progress value={65} size="lg" label="Large" />
          <Progress value={65} size="xl" label="Extra Large" />
        </div>
      </div>

      {/* Striped */}
      <div className={section}>
        <h2 className={sectionTitle}>Progress — Striped</h2>
        <div className={stack}>
          <Progress value={70} label="Striped Blue" color="blue" size="lg" striped />
          <Progress value={55} label="Striped Green" color="green" size="lg" striped />
          <Progress value={85} label="Striped Purple" color="purple" size="lg" striped />
        </div>
      </div>

      {/* Animated */}
      <div className={section}>
        <h2 className={sectionTitle}>Progress — Animated</h2>
        <p className={label}>Simulates real loading progress</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Button size="sm" leftIcon={<Play size={14} />} onClick={start} disabled={running}>
            {running ? 'Running...' : 'Start'}
          </Button>
          <Button size="sm" color="ghost" leftIcon={<RotateCcw size={14} />} onClick={reset}>Reset</Button>
        </div>
        <Progress
          value={progress}
          label={progress >= 100 ? 'Complete!' : 'Uploading file...'}
          color={progress >= 100 ? 'green' : 'blue'}
          size="lg"
        />
      </div>

      {/* Real-World Patterns */}
      <div className={section}>
        <h2 className={sectionTitle}>Progress — Patterns</h2>
        <p className={label}>Common usage patterns</p>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Storage usage</p>
        <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: 500 }}>Disk Space</span>
            <span style={{ color: '#6b7280' }}>7.2 GB / 10 GB</span>
          </div>
          <Progress value={72} color="blue" size="md" showValue={false} />
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
            <span>📁 Documents: 3.1 GB</span>
            <span>🖼️ Images: 2.4 GB</span>
            <span>📦 Other: 1.7 GB</span>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Task completion</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Design', value: 100, color: 'green' },
            { label: 'Development', value: 75, color: 'blue' },
            { label: 'Testing', value: 40, color: 'yellow' },
            { label: 'Deployment', value: 10, color: 'red' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '90px', fontSize: '0.8rem', color: '#4b5563' }}>{item.label}</span>
              <div style={{ flex: 1 }}>
                <Progress value={item.value} color={item.color} size="sm" showValue={false} />
              </div>
              <span style={{ width: '36px', fontSize: '0.75rem', color: '#6b7280', textAlign: 'right' }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
