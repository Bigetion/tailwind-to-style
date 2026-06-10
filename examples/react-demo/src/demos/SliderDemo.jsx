import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Slider, RangeSlider } from '../components/Slider';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });
const stack = tw({ name: 'demo-stack', _: 'flex flex-col gap-6 max-w-lg' });

export function SliderDemo() {
  const [volume, setVolume] = useState(65);
  const [brightness, setBrightness] = useState(40);
  const [opacity, setOpacity] = useState(80);
  const [price, setPrice] = useState([200, 800]);
  const [temp, setTemp] = useState([18, 26]);

  return (
    <div>
      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Slider — Basic</h2>
        <p className={label}>Single value sliders with labels</p>
        <div className={stack}>
          <Slider label="Volume" value={volume} onChange={setVolume} />
          <Slider label="Brightness" value={brightness} onChange={setBrightness} color="amber" />
          <Slider label="Opacity" value={opacity} onChange={setOpacity} color="purple" formatValue={v => `${v}%`} />
        </div>
      </div>

      {/* Colors */}
      <div className={section}>
        <h2 className={sectionTitle}>Slider — Colors</h2>
        <div className={stack}>
          <Slider label="Blue (default)" value={60} onChange={() => {}} color="blue" />
          <Slider label="Green" value={75} onChange={() => {}} color="green" />
          <Slider label="Red" value={45} onChange={() => {}} color="red" />
          <Slider label="Purple" value={85} onChange={() => {}} color="purple" />
          <Slider label="Amber" value={55} onChange={() => {}} color="amber" />
        </div>
      </div>

      {/* Disabled */}
      <div className={section}>
        <h2 className={sectionTitle}>Slider — Disabled</h2>
        <div className={stack}>
          <Slider label="Disabled at 30%" value={30} onChange={() => {}} disabled />
          <Slider label="Disabled at 70%" value={70} onChange={() => {}} color="green" disabled />
        </div>
      </div>

      {/* Range Slider */}
      <div className={section}>
        <h2 className={sectionTitle}>Slider — Range (Dual Handles)</h2>
        <p className={label}>Select a min/max range</p>
        <div className={stack}>
          <RangeSlider
            label="Price Range"
            minValue={price[0]}
            maxValue={price[1]}
            min={0}
            max={1000}
            step={10}
            onChange={setPrice}
            formatValue={v => `$${v}`}
          />
          <RangeSlider
            label="Temperature (°C)"
            minValue={temp[0]}
            maxValue={temp[1]}
            min={-20}
            max={50}
            step={1}
            onChange={setTemp}
            color="red"
            formatValue={v => `${v}°`}
          />
        </div>
      </div>

      {/* Real-World Patterns */}
      <div className={section}>
        <h2 className={sectionTitle}>Slider — Patterns</h2>
        <p className={label}>Media player controls</p>
        <div style={{ padding: '20px', background: '#111827', borderRadius: '16px', maxWidth: '28rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>Now Playing</p>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Lofi Beats Vol. 3</p>
            </div>
            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>2:34 / 4:12</span>
          </div>
          <Slider value={60} onChange={() => {}} color="blue" showValue={false} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>🔈</span>
            <Slider value={volume} onChange={setVolume} color="blue" showValue={false} style={{ flex: 1, margin: '0 12px' }} />
            <span style={{ color: '#fff', fontSize: '0.75rem' }}>{volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
