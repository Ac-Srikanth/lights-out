import Light from "./Light";



export default function SignalContainer({ status }) {
  return (
    <div className="bg-black w-32 h-auto flex flex-col justify-between items-center px-1.5 py-3 rounded-xl gap-4">
      <Light color="yellow" state={status[0]} />
      <Light color="green" state={status[1]} />
      <Light color="red" state={status[2]} />
      <Light color="red" state={status[3]} />
    </div>
  )
}