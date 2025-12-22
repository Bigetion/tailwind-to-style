import { styled, tv } from 'tailwind-to-style/react'

// Button variants dengan tv()
const buttonVariants = tv({
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    // Variant Warna
    variant: {
      primary: '',
      warning: '',
      positive: '',
      attention: '',
    },
    
    // Style Button
    style: {
      solid: 'text-white shadow-md hover:shadow-lg active:scale-95',
      smooth: 'border-0 shadow-none',
      ghost: 'bg-transparent border',
      raised: 'bg-white shadow-lg hover:shadow-xl active:scale-98',
    },
    
    // Ukuran
    size: {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-2.5',
    },
    
    // Bentuk
    shape: {
      rounded: 'rounded-lg',
      pill: 'rounded-full',
    },
    
    // Icon-only (circle button)
    iconOnly: {
      true: 'aspect-square',
      false: '',
    },
  },
  
  // Compound variants untuk kombinasi variant + style
  compoundVariants: [
    // PRIMARY SOLID
    {
      variant: 'primary',
      style: 'solid',
      class: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
    // PRIMARY SMOOTH
    {
      variant: 'primary',
      style: 'smooth',
      class: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    },
    // PRIMARY GHOST
    {
      variant: 'primary',
      style: 'ghost',
      class: 'text-blue-600 border-blue-600 hover:bg-blue-50',
    },
    // PRIMARY RAISED
    {
      variant: 'primary',
      style: 'raised',
      class: 'text-blue-600 border border-blue-200',
    },
    
    // WARNING SOLID
    {
      variant: 'warning',
      style: 'solid',
      class: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    // WARNING SMOOTH
    {
      variant: 'warning',
      style: 'smooth',
      class: 'bg-red-100 text-red-700 hover:bg-red-200',
    },
    // WARNING GHOST
    {
      variant: 'warning',
      style: 'ghost',
      class: 'text-red-600 border-red-600 hover:bg-red-50',
    },
    // WARNING RAISED
    {
      variant: 'warning',
      style: 'raised',
      class: 'text-red-600 border border-red-200',
    },
    
    // POSITIVE SOLID
    {
      variant: 'positive',
      style: 'solid',
      class: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    },
    // POSITIVE SMOOTH
    {
      variant: 'positive',
      style: 'smooth',
      class: 'bg-green-100 text-green-700 hover:bg-green-200',
    },
    // POSITIVE GHOST
    {
      variant: 'positive',
      style: 'ghost',
      class: 'text-green-600 border-green-600 hover:bg-green-50',
    },
    // POSITIVE RAISED
    {
      variant: 'positive',
      style: 'raised',
      class: 'text-green-600 border border-green-200',
    },
    
    // ATTENTION SOLID
    {
      variant: 'attention',
      style: 'solid',
      class: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400',
    },
    // ATTENTION SMOOTH
    {
      variant: 'attention',
      style: 'smooth',
      class: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    },
    // ATTENTION GHOST
    {
      variant: 'attention',
      style: 'ghost',
      class: 'text-orange-600 border-orange-600 hover:bg-orange-50',
    },
    // ATTENTION RAISED
    {
      variant: 'attention',
      style: 'raised',
      class: 'text-orange-600 border border-orange-200',
    },
    
    // Icon-only dengan size adjustment
    {
      iconOnly: true,
      size: 'sm',
      class: 'w-8 h-8 p-0',
    },
    {
      iconOnly: true,
      size: 'md',
      class: 'w-10 h-10 p-0',
    },
    {
      iconOnly: true,
      size: 'lg',
      class: 'w-12 h-12 p-0',
    },
    // Icon-only selalu rounded-full
    {
      iconOnly: true,
      class: 'rounded-full',
    },
  ],
  
  defaultVariants: {
    variant: 'primary',
    style: 'solid',
    size: 'md',
    shape: 'rounded',
    iconOnly: false,
  },
})

// Styled Button component
export const Button = styled('button', buttonVariants)

// Helper component untuk action button dengan icon "+"
export const ActionButton = ({ children, ...props }) => {
  return (
    <Button {...props}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path 
          d="M8 3V13M3 8H13" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Button>
  )
}

// Icon components untuk demo
export const PlusIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path 
      d="M8 3V13M3 8H13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const HeartIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path 
      d="M8 14L1.5 7.5C0.5 6.5 0 5 0 3.5C0 1.5 1.5 0 3.5 0C5 0 6.5 1 7 2C7.5 1 9 0 10.5 0C12.5 0 14 1.5 14 3.5C14 5 13.5 6.5 12.5 7.5L8 14Z" 
      fill="currentColor"
    />
  </svg>
)

export const TrashIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path 
      d="M2 4H14M6 4V2H10V4M3 4V14H13V4H3Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const BellIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path 
      d="M12 6C12 4.93913 11.5786 3.92172 10.8284 3.17157C10.0783 2.42143 9.06087 2 8 2C6.93913 2 5.92172 2.42143 5.17157 3.17157C4.42143 3.92172 4 4.93913 4 6C4 10 2 11 2 11H14C14 11 12 10 12 6Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9.15 14C9.03335 14.2021 8.86607 14.3698 8.66459 14.4864C8.46311 14.6029 8.23404 14.6643 8.00071 14.6643C7.76738 14.6643 7.53831 14.6029 7.33683 14.4864C7.13535 14.3698 6.96807 14.2021 6.85142 14" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)
