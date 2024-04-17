"use client"
import { useEffect, useState } from "react";
import SignalContainer from "./SignalContainer";
import { raceStart, startProcedureData, timeIntervalsArray } from "../lib/signalData";
import useSound from 'use-sound'
import horn from '../../public/horn.mp3'
import race from '../../public/race.mp3'
import go from '../../public/go.mp3'
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch"


function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}



export default function SignalModule() {
  const [mode, setMode] = useState<'start' | 'race'>('start')
  const [time, setTime] = useState(-1800);
  const [lights, setLights] = useState(startProcedureData[-1800]);
  const [presentTimeInterval, setTimeInterval] = useState(-1800);
  const [play] = useSound(mode === 'race' ? race : horn, { volume: 1 });
  const [lightsOut] = useSound(go, { volume: 1 });


  const handleNext = () => {
    const index = timeIntervalsArray.findIndex((element) => parseInt(element) === presentTimeInterval)
    if (index !== -1) {
      if (!(index + 1 === timeIntervalsArray.length)) {
        setTime(timeIntervalsArray[index + 1])
      }
    }
  }

  const handlePrevious = () => {
    const index = timeIntervalsArray.findIndex((element) => parseInt(element) === presentTimeInterval)
    if (index !== -1) {
      if (index - 1 !== -1) {
        setTime(timeIntervalsArray[index - 1])
      }
    }


  }

  const goToRaceProcedure = () => {
    if (mode === 'start') {
      setMode('race');
      setLights(startProcedureData[30]);
      setTime(10);
    }
    else {
      setMode('start');
      setTime(-1800);
      setLights(startProcedureData[-1800])
    }
  }

  useEffect(() => {
    let timer;
    if (mode === 'start') {
      timer = setInterval(() => {
        setTime(prevSeconds => {
          if (prevSeconds < 0) {
            return prevSeconds + 1;
          } else if (prevSeconds >= 0) {
            return prevSeconds + 1
          } else if (prevSeconds > 180) {
            clearInterval(timer);
            return 0;
          } else {
            return 0
          }
        });
      }, 1000)
    } else {
      timer = setInterval(() => {
        setTime(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1
          } else {
            // clearInterval(timer);
            return 0;
          }
        })
      }, 1000)
    }



    return () => clearInterval(timer)
  }, [mode])

  const handlePlay = () => {
    play();
  }

  useEffect(() => {
    if (mode === 'start') {
      switch (time) {
        case -1020: {
          startProcedureData[-1020].horn && handlePlay();
          handlePlay();
          setLights(startProcedureData[-1020]);
          setTimeInterval(-1020);
          break;
        }
        case -900: {
          startProcedureData[-900].horn && handlePlay();
          setLights(startProcedureData[-900]);
          setTimeInterval(-900);
          break;
        }
        case -600: {
          startProcedureData[-600].horn && handlePlay();
          setLights(startProcedureData[-600]);
          setTimeInterval(-600);
          setTimeout(() => setLights(startProcedureData[-900]), 1000)
          break;
        }
        case -300: {
          startProcedureData[-300].horn && handlePlay();
          setLights(startProcedureData[-300]);
          setTimeInterval(-300);
          break;
        }
        case -180: {
          startProcedureData[-180].horn && handlePlay();
          setLights(startProcedureData[-180]);
          setTimeInterval(-180);
          break;
        }
        case -60: {
          startProcedureData[-60].horn && handlePlay();
          setLights(startProcedureData[-60]);
          setTimeInterval(-60);
          break;
        }
        case -15: {
          startProcedureData[-15].horn && handlePlay();
          setLights(startProcedureData[-15]);
          setTimeInterval(-15);
          break;
        }
        case 0: {
          startProcedureData[0].horn && handlePlay();
          setLights(startProcedureData[0]);
          setTimeInterval(0);
          break;
        }
        case 30: {
          startProcedureData[30].horn && handlePlay();
          setLights(startProcedureData[30]);
          setTimeInterval(30);
          break;

        }
        default: {
          break;
        }
      }
    } else {
      switch (time) {
        case 5: {
          setLights(raceStart[5]);
          handlePlay();

          break;
        }
        case 4: {
          setLights(raceStart[4]);
          handlePlay();

          break;

        }
        case 3: {
          setLights(raceStart[3]);
          handlePlay();

          break;

        }
        case 2: {
          setLights(raceStart[2]);
          handlePlay();

          break;

        }
        case 1: {
          setLights(raceStart[1]);
          handlePlay();
          break;
        }
        case 0: {
          const presetDelay = getRandomNumber(4, 7);
          setTimeout(() => {
            setLights(raceStart[0]);
            lightsOut();
          }, presetDelay * 1000)

        }
      }
    }

  }, [time])


  return (
    // <>
    <div className="flex flex-col gap-20 font-serif">
      <div className="flex gap-2 justify-center">
        {lights.signalState.map((state, index) => {
          return (
            <SignalContainer key={index} status={state} />
          )
        })}
      </div>
      <Card className="flex flex-col justify-center h-80 bg-white rounded-lg shadow-black-bottom r items-center pb-4 pt-4 w-2/3 ml-auto mr-auto">
        <p className="mb-10  leading-5">T {(time > 0 && mode === 'start') ? '+' : mode === 'race' ? '-' : null} {time}</p>
        <Label className="w-9/12 h-8  text-center  leading-5">Status - {lights.description}</Label>
        <div className="flex justify-center mt-10 mb-5 gap-4">
          <Button disabled={mode === 'race'} className="shadow-black-bottom" onClick={() => handleNext()}>Go to Next Procedure</Button>
          <Button disabled={mode === 'race'} className="shadow-black-bottom" onClick={() => handlePrevious()}>Go to Previous Procedure</Button>

        </div>
        <div className="flex  items-center space-x-2">
          <Label className="w-15 min-w-60" htmlFor="race-mode">{mode === 'race' ? 'Race Mode' : '30 Mins to Formation Lap'}</Label>
          <Switch id="race-mode" checked={mode === 'race' ? true : false} onCheckedChange={() => goToRaceProcedure()} />
        </div>
      </Card>
    </div>
    // </>
  )
}