import { LightState } from "@/components/Light";

// the 4 states represent ['yellow', 'green', 'red', 'red']
const signalStateOff: LightState[] = ["off", "off", "off", "off"];
const redOn: LightState[] = ["off", "off", "on", "on"];
const redFlashes: LightState[] = ["off", "off", "flash", "flash"];
const greenOn: LightState[] = ["off", "on", "off", "off"];

export type TData = {
  title: string;
  description: string;
  signalState: LightState[][];
  horn: boolean;
};

export const startProcedureData: Record<number, TData> = {
  [-30 * 60]: {
    title: "30 mins to the start of the formation lap",
    description:
      "No start lights are illuminated and the pit exit lights turn from red to green to indicate the pit lane is open.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: false,
  },
  [-17 * 60]: {
    title: "17 mins to the start of the formation lap",
    description:
      "The horn is activated to indicate there are two minutes until the pit lane will be closed.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: true,
  },
  [-15 * 60]: {
    title: "Fifteen minutes to the start of the formation lap",
    description:
      "All the red start lights are illuminated, the pit lane exit lights turn from green to red and the horn is activated to indicate the pit exit is closed.",
    signalState: [[...redOn], [...redOn], [...redOn], [...redOn], [...redOn]],
    horn: true,
  },
  [-10 * 60]: {
    title: "Ten minutes to the start of the formation lap",
    description:
      "The red start lights will flash on and off twice and the horn is activated.",
    signalState: [
      [...redFlashes],
      [...redFlashes],
      [...redFlashes],
      [...redFlashes],
      [...redFlashes],
    ],
    horn: true,
  },
  [-5 * 60]: {
    title: "Five minutes to the start of the formation lap",
    description:
      "One pair of the red start lights is extinguished and the horn is activated.",
    signalState: [
      [...signalStateOff],
      [...redOn],
      [...redOn],
      [...redOn],
      [...redOn],
    ],
    horn: true,
  },
  [-3 * 60]: {
    title: "Three minutes to the start of the formation lap",
    description:
      "One more pair of red start lights is extinguished and the horn is activated.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...redOn],
      [...redOn],
      [...redOn],
    ],
    horn: true,
  },
  [-60]: {
    title: "One minute to the start of the formation lap",
    description:
      "One more pair of red start lights is extinguished and the horn is activated",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...redOn],
      [...redOn],
    ],
    horn: true,
  },
  [-15]: {
    title: "Fifteen seconds to the start of the formation lap",
    description:
      "One more pair of red start lights is extinguished and the horn is activated.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...redOn],
    ],
    horn: true,
  },
  0: {
    title: "Start of the formation lap",
    description:
      "One more pair of red start lights is extinguished and the green start lights are illuminated.",
    signalState: [
      [...greenOn],
      [...greenOn],
      [...greenOn],
      [...greenOn],
      [...greenOn],
    ],
    horn: false,
  },
  30: {
    title: "Thirty seconds into the formation lap",
    description: "All the green start lights are extinguished.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: false,
  },
};

export const raceStart = {
  5: {
    title: "When all the cars are in position on the grid",
    description:
      "The five second signal will be given by illuminating one pair of red start lights.",
    signalState: [
      [...redOn],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: true,
  },
  4: {
    title: "Four Seconds",
    description: "One more pair of red start lights is illuminated.",
    signalState: [
      [...redOn],
      [...redOn],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: true,
  },
  3: {
    title: "Three Seconds",
    description: "One more pair of red start lights is illuminated.",
    signalState: [
      [...redOn],
      [...redOn],
      [...redOn],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: true,
  },
  2: {
    title: "Two Seconds",
    description: "One more pair of red start lights is illuminated.",
    signalState: [
      [...redOn],
      [...redOn],
      [...redOn],
      [...redOn],
      [...signalStateOff],
    ],
    horn: true,
  },
  1: {
    title: "Four Seconds",
    description:
      "One more pair of red start lights is illuminated and the cars are considered “under starter’s orders”.",
    signalState: [[...redOn], [...redOn], [...redOn], [...redOn], [...redOn]],
    horn: true,
  },
  0: {
    title: "The Start",
    description:
      "After a preset delay of between 0.2 and 3.0 seconds, the race is started by all the red start lights being extinguished.",
    signalState: [
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
      [...signalStateOff],
    ],
    horn: true,
  },
};

export const timeIntervalsArray = Object.keys(startProcedureData)
  .map((ele) => parseInt(ele))
  .sort((a, b) => a - b);
