import clsx from "clsx";

export type LightState = 'on' | 'off' | 'flash'
export type LightColor = 'red' | 'green' | 'yellow' | 'blue'

type LightProps = {
  state: LightState;
  color: LightColor
}



export default function Light({ state = "off", color }: LightProps) {

  //bg-red-700 bg-radial-brown bg-custom w-24 h-24 rounded-full  border-dotted border-2 border-red-700 shadow-red-glow

  return (
    <div className={clsx(`bg-custom w-16 h-16 rounded-full border-dotted border-2`, {
      'bg-red-500 bg-radial-brown border-red-500 shadow-red-glow': color === 'red',
      'bg-green-700  bg-radial-lime border-green-700 shadow-green-glow': color === 'green',
      'bg-yellow-700 bg-radial-orange border-yellow-700 shadow-yellow-glow': color === 'yellow',
      'opacity-25': state === 'off',
      'animate-fast-pulse': state === 'flash'
    })}></div >
  )
}