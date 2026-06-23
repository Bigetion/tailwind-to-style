import React from 'react';

export function pickVariantProps(props, variantKeys = []) {
  const keySet = new Set(variantKeys);
  const variantProps = {};
  const passthroughProps = {};

  for (const [key, value] of Object.entries(props || {})) {
    if (keySet.has(key)) {
      variantProps[key] = value;
    } else {
      passthroughProps[key] = value;
    }
  }

  return { variantProps, passthroughProps };
}

export function useControllableState({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (nextValue) => {
      const valueToSet = typeof nextValue === 'function' ? nextValue(resolvedValue) : nextValue;

      if (!isControlled) {
        setInternalValue(valueToSet);
      }

      if (onChange) {
        onChange(valueToSet);
      }
    },
    [isControlled, onChange, resolvedValue]
  );

  return [resolvedValue, setValue];
}

export function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
}

export function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}
