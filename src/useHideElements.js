import { useState } from 'react';

export default function useHideElements() {
  const [trigger, setTrigger] = useState(0);

  const [isSizeSmall, setIsSizeSmall] = useState(false);

  window.addEventListener('resize', () => {
    setTrigger(window.innerWidth);
  });

  if (trigger < 700) {
    setIsSizeSmall(true);
  } else {
    setIsSizeSmall(false);
  }

  return [isSizeSmall];
}
