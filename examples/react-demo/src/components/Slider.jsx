import React, { useId, forwardRef } from 'react';
import { tw, cx } from 'tailwind-to-style';
import { useControllableState } from './_core/componentUtils';

/**
 * Slider component — range input with track, fill, and thumb.
 * Fully custom styled over native range input.
 */
const trackWrapper = tw('slider-track', 'relative w-full h-2 bg-gray-200 rounded-full cursor-pointer');
const labelStyle = tw('slider-label', 'text-sm font-medium text-gray-700');
const valueStyle = tw('slider-value', 'text-sm font-semibold text-blue-600');

const colorMap = {
  blue:   '#2563eb',
  green:  '#059669',
  red:    '#dc2626',
  purple: '#7c3aed',
  amber:  '#d97706',
};

export const Slider = forwardRef(function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = true,
  color = 'blue',
  disabled,
  formatValue,
  id,
  className,
  ...props
}, ref) {
  const [sliderValue, setSliderValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const autoId = useId();
  const inputId = id || autoId;
  const pct = ((sliderValue - min) / (max - min)) * 100;
  const trackColor = colorMap[color] || colorMap.blue;
  const displayValue = formatValue ? formatValue(sliderValue) : sliderValue;

  const handleChange = (newVal) => {
    setSliderValue(newVal);
    onChange?.(newVal);
  };

  return (
    <div {...props} ref={ref} className={cx(tw('flex flex-col gap-2'), className)}>
      {/* Header row */}
      {(label || showValue) && (
        <div className={tw('flex justify-between items-center')}>
          {label && <label htmlFor={inputId} className={labelStyle}>{label}</label>}
          {showValue && <span className={valueStyle}>{displayValue}</span>}
        </div>
      )}

      {/* Track */}
      <div className={trackWrapper} style={{ opacity: disabled ? 0.5 : 1 }} role="presentation">
        {/* Filled portion */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            backgroundColor: trackColor,
            borderRadius: '9999px',
            pointerEvents: 'none',
            transition: 'width 50ms',
          }}
        />
        {/* Native range input (invisible, sits on top) */}
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          disabled={disabled}
          onChange={e => handleChange(Number(e.target.value))}
          aria-label={label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            margin: 0,
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: `2px solid ${trackColor}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            transition: 'left 50ms',
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className={tw('flex justify-between')}>
        <span className={tw('text-xs text-gray-400')}>{min}</span>
        <span className={tw('text-xs text-gray-400')}>{max}</span>
      </div>
    </div>
  );
});

/**
 * RangeSlider — dual handle slider (min/max range)
 */
export const RangeSlider = forwardRef(function RangeSlider({
  minValue,
  maxValue,
  defaultMinValue,
  defaultMaxValue,
  onMinValueChange,
  onMaxValueChange,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  color = 'blue',
  disabled,
  formatValue,
  className,
  ...props
}, ref) {
  const [minVal, setMinVal] = useControllableState({
    value: minValue,
    defaultValue: defaultMinValue,
    onChange: onMinValueChange,
  });
  const [maxVal, setMaxVal] = useControllableState({
    value: maxValue,
    defaultValue: defaultMaxValue,
    onChange: onMaxValueChange,
  });

  const pctMin = ((minVal - min) / (max - min)) * 100;
  const pctMax = ((maxVal - min) / (max - min)) * 100;
  const trackColor = colorMap[color] || colorMap.blue;

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(val);
    onChange?.([val, maxVal]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(val);
    onChange?.([minVal, val]);
  };

  const displayMin = formatValue ? formatValue(minVal) : minVal;
  const displayMax = formatValue ? formatValue(maxVal) : maxVal;

  // z-index trick: if min thumb is near max end, put it on top so it's draggable
  const minZIndex = pctMin > 90 ? 5 : 4;
  const maxZIndex = pctMin > 90 ? 4 : 5;

  return (
    <div {...props} ref={ref} className={cx(tw('flex flex-col gap-2'), className)}>
      {label && (
        <div className={tw('flex justify-between')}>
          <span className={labelStyle}>{label}</span>
          <span className={valueStyle}>{displayMin} – {displayMax}</span>
        </div>
      )}
      <div className={trackWrapper} style={{ opacity: disabled ? 0.5 : 1 }} role="presentation">
        {/* Background fill between thumbs */}
        <div
          style={{
            position: 'absolute',
            left: `${pctMin}%`,
            width: `${pctMax - pctMin}%`,
            height: '100%',
            backgroundColor: trackColor,
            borderRadius: '9999px',
            pointerEvents: 'none',
          }}
        />
        {/* Min input — sits above max when min is near the high end */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          disabled={disabled}
          onChange={handleMinChange}
          aria-label={label ? `${label} minimum` : 'Minimum value'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
            zIndex: minZIndex,
          }}
        />
        {/* Max input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          disabled={disabled}
          onChange={handleMaxChange}
          aria-label={label ? `${label} maximum` : 'Maximum value'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
            zIndex: maxZIndex,
          }}
        />
        {/* Min thumb (visual only) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pctMin}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: `2px solid ${trackColor}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
          }}
        />
        {/* Max thumb (visual only) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pctMax}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: `2px solid ${trackColor}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div className={tw('flex justify-between')}>
        <span className={tw('text-xs text-gray-400')}>{min}</span>
        <span className={tw('text-xs text-gray-400')}>{max}</span>
      </div>
    </div>
  );
});
