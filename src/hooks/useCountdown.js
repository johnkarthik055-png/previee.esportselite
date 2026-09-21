import { useEffect, useState } from 'react'

/*
 * Countdown to launch — same target date/logic as the launch.html prototype
 * (new Date("2026-09-21T11:00:00+05:30")), ported to a real React hook so
 * the live homepage hero can share it instead of re-deriving it.
 */
const LAUNCH_TARGET = new Date('2026-09-21T11:00:00+05:30').getTime()

function computeTimeLeft(target) {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true }
  }
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    live: false,
  }
}

export default function useCountdown(target = LAUNCH_TARGET) {
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
