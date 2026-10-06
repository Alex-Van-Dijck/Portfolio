import { useEffect, useState } from "react";

interface CameraSettings {
  position: [number, number, number];
  fov: number;
  scale: number;
}

export const useResponsiveCamera = (): CameraSettings => {
  const [settings, setSettings] = useState<CameraSettings>({
    position: [0, 0, 7.5],
    fov: 42,
    scale: 1,
  });

  useEffect(() => {
    const updateCameraSettings = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSettings({
          position: [0, 0, 8],
          fov: 50,
          scale: 0.6,
        });
      } else if (width < 1024) {
        setSettings({
          position: [0, 0, 8.5],
          fov: 45,
          scale: 0.8,
        });
      } else {
        setSettings({
          position: [0, 0, 7.5],
          fov: 42,
          scale: 1,
        });
      }
    };

    updateCameraSettings();
    window.addEventListener("resize", updateCameraSettings);
    return () => window.removeEventListener("resize", updateCameraSettings);
  }, []);

  return settings;
};
