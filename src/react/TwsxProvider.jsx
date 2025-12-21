/**
 * React Context Provider for TWSX
 * Provides global configuration and theme management
 */

import { createContext, useContext, useEffect, useState, createElement } from "react";
import { configure, getConfig } from "../index.js";

const TwsxContext = createContext({
  config: null,
  updateConfig: () => {},
  isConfigured: false
});

/**
 * TWSX Provider Component
 * Wraps your app to provide TWSX configuration context
 */
export function TwsxProvider({ children, config, onConfigChange }) {
  const [currentConfig, setCurrentConfig] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Apply configuration on mount and when config changes
  useEffect(() => {
    if (config) {
      try {
        configure(config);
        setCurrentConfig(config);
        setIsConfigured(true);
        
        if (onConfigChange) {
          onConfigChange(config);
        }
      } catch (error) {
        console.error("TWSX Configuration Error:", error);
        setIsConfigured(false);
      }
    }
  }, [config, onConfigChange]);
  
  // Function to update configuration dynamically
  const updateConfig = (newConfig) => {
    try {
      const mergedConfig = { ...currentConfig, ...newConfig };
      configure(mergedConfig);
      setCurrentConfig(mergedConfig);
      
      if (onConfigChange) {
        onConfigChange(mergedConfig);
      }
    } catch (error) {
      console.error("TWSX Config Update Error:", error);
    }
  };
  
  const contextValue = {
    config: currentConfig,
    updateConfig,
    isConfigured
  };
  
  return createElement(TwsxContext.Provider, { value: contextValue }, children);
}

/**
 * Hook to access TWSX context
 */
export function useTwsxContext() {
  const context = useContext(TwsxContext);
  
  if (!context) {
    throw new Error("useTwsxContext must be used within a TwsxProvider");
  }
  
  return context;
}

/**
 * Hook to get current TWSX configuration
 */
export function useTwsxConfig() {
  const { config, isConfigured } = useTwsxContext();
  return { config, isConfigured };
}

/**
 * Hook to update TWSX configuration
 */
export function useUpdateTwsxConfig() {
  const { updateConfig } = useTwsxContext();
  return updateConfig;
}