# JAVASCRIPT TIMER| [LIVE LINK](https://stimer-soni.netlify.app/)

Play, pause timer with preset timing options.

## TECH STACK

Javascript, html and css



## restarting/refreshing timer

```javascript
const endTimer = function (t) {
  const tick = function () {
    const min = String(Math.trunc(timeSet / 60)).padStart(2, 0);
    const sec = String(timeSet % 60).padStart(2, 0);
    if (!isRefreshed) {
      labelTimer.textContent = `${min}:${sec}`;
      if (!isPaused) {
        if (timeSet === 0) {
          clearInterval(timer);
        } else --timeSet;
      }
    }
  };
```

## self-practice project





[soni kumari](https://www.linkedin.com/in/soni-kumari-48393a253)
