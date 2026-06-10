import React from 'react';
import { tw } from 'tailwind-to-style';
import { Check } from 'lucide-react';

/**
 * Stepper component — multi-step wizard navigation.
 * orientation: 'horizontal' | 'vertical'
 * variant: 'default' | 'simple' | 'numbered'
 */
const stepIcon = tw({
  name: 'step-icon',
  base: 'flex items-center justify-center rounded-full font-semibold text-sm shrink-0 transition-all duration-200',
  variants: {
    state: {
      completed: 'bg-blue-600 text-white',
      active: 'bg-blue-600 text-white ring-4 ring-blue-100',
      upcoming: 'bg-white text-gray-400 border-2 border-gray-300',
      error: 'bg-red-50 text-red-600 border-2 border-red-400',
    },
    size: {
      sm: 'w-7 h-7 text-xs',
      md: 'w-9 h-9 text-sm',
      lg: 'w-11 h-11 text-base',
    },
  },
  defaultVariants: { state: 'upcoming', size: 'md' },
});

const stepLabel = tw({
  name: 'step-label',
  base: 'text-sm font-medium transition-colors duration-200',
  variants: {
    state: {
      completed: 'text-blue-600',
      active: 'text-blue-700',
      upcoming: 'text-gray-500',
      error: 'text-red-600',
    },
  },
  defaultVariants: { state: 'upcoming' },
});

const stepDesc = tw({ name: 'step-desc', _: 'text-xs text-gray-400 mt-0.5' });

const connector = tw({
  name: 'step-connector',
  base: 'transition-all duration-300',
  variants: {
    completed: {
      true: 'bg-blue-600',
      false: 'bg-gray-200',
    },
    orientation: {
      horizontal: 'h-0.5 flex-1 mx-2',
      vertical: 'w-0.5 flex-1 my-1 ml-4',
    },
  },
  defaultVariants: { completed: false, orientation: 'horizontal' },
});

export function Stepper({
  steps = [],
  current = 0,
  orientation = 'horizontal',
  size = 'md',
  className,
}) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: isHorizontal ? 'flex-start' : 'stretch',
      }}
      className={className}
      role="list"
    >
      {steps.map((step, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        const isError = step.error;
        const state = isError ? 'error' : isCompleted ? 'completed' : isActive ? 'active' : 'upcoming';

        const iconProps = { size, state };
        const labelProps = { state };
        const connectorProps = {
          completed: isCompleted ? true : false,
          orientation,
        };

        return (
          <React.Fragment key={i}>
            {/* Step */}
            <div
              style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: isHorizontal ? 'center' : 'flex-start',
                gap: isHorizontal ? '6px' : '12px',
                flex: isHorizontal ? 1 : undefined,
              }}
              role="listitem"
            >
              {/* Icon + vertical connector wrapper */}
              <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', alignItems: 'center' }}>
                <div className={stepIcon(iconProps)}>
                  {isCompleted ? (
                    <Check size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} strokeWidth={2.5} />
                  ) : isError ? (
                    <span style={{ fontSize: size === 'sm' ? '10px' : '12px', fontWeight: 700 }}>!</span>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {/* Vertical connector (inside step for proper flow) */}
                {!isHorizontal && i < steps.length - 1 && (
                  <div
                    className={connector(connectorProps)}
                    style={{ minHeight: '24px' }}
                  />
                )}
              </div>

              {/* Text */}
              <div style={{ textAlign: isHorizontal ? 'center' : 'left', paddingBottom: !isHorizontal ? '16px' : 0 }}>
                <p className={stepLabel(labelProps)}>{step.label}</p>
                {step.description && <p className={stepDesc}>{step.description}</p>}
              </div>
            </div>

            {/* Horizontal connector */}
            {isHorizontal && i < steps.length - 1 && (
              <div
                className={connector(connectorProps)}
                style={{ minWidth: '24px', marginTop: size === 'sm' ? '14px' : size === 'lg' ? '22px' : '18px' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
