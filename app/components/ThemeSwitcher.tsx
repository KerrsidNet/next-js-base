"use client"

import { Button, Tooltip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

/**
 * ThemeSwitcher component - toggles between light and dark theme.
 * Uses NextUI Button and Tooltip components. 
 * Resolves current theme with useTheme hook.
 * Toggles to opposite theme when button clicked.
 * Initial render delayed until mounted state updated.
*/
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip color="default" placement='bottom' content={resolvedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"} delay={1000}>
      <div>
        <Button
          variant="flat"
          isIconOnly
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
    </Tooltip >
  );
}