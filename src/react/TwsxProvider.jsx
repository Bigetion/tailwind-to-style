/**
 * React Context Provider for TWSX
 * Provides global configuration and theme management
 */

import { createContext, useContext, useEffect, useState, createElement, useMemo, useRef } from "react";
import { configure, getConfig } from "../index.js";
import { clearTwsxCache, TwsxConfigContext } from "./useTwsx.js";

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
  const [configVersion, setConfigVersion] = useState(0);
  
  // Use ref to store callback without triggering re-renders
  const onConfigChangeRef = useRef(onConfigChange);
  useEffect(() => {
    onConfigChangeRef.current = onConfigChange;
  }, [onConfigChange]);
  
  // Serialize config for stable comparison
  const configKey = useMemo(() => {
    return config ? JSON.stringify(config) : null;
  }, [config]);
  
  // Apply configuration on mount and when config changes
  useEffect(() => {
    if (!config) return;
    
    try {
      // Clear caches before applying new config
      clearTwsxCache();
      
      configure(config);
      setCurrentConfig(config);
      setIsConfigured(true);
      
      // Increment version to trigger useTwsx re-generation
      setConfigVersion(prev => prev + 1);
      
      if (onConfigChangeRef.current) {
        onConfigChangeRef.current(config);
      }
    } catch (error) {
      console.error("TWSX Configuration Error:", error);
      setIsConfigured(false);
    }
  }, [configKey]); // Only re-run when config actually changes
  
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
  
  // Provide config version for useTwsx to detect changes
  const configContextValue = {
    version: configVersion
  };
  
  return createElement(
    TwsxContext.Provider, 
    { value: contextValue },
    createElement(
      TwsxConfigContext.Provider,
      { value: configContextValue },
      children
    )
  );
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