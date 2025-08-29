import { useMemo } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

export const useMobileDetection = () => {
  const isMobileDevice = useMemo(() => {
    return isMobile || isTablet;
  }, []);

  return {
    isMobile: isMobileDevice,
    isTablet,
    isDesktop: !isMobileDevice
  };
};
