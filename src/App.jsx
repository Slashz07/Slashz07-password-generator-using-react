import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "123456789"
    if (char) str += "!@#$%^&*()_`';,./[]=-+{}:<>?~"
    
    for (let i = 0; i < length; i++){
      let randIndex = Math.floor(Math.random() * str.length)
      pass+=str.charAt(randIndex)
    }
    setPassword(pass)
  },[length,number,char,setPassword])
  
  useEffect(() => {
    passwordGenerator()
  },[length,number,char,passwordGenerator])
  
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800' >
        <h1 className='text-center text-white my-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full px-3 py-1 ' placeholder='Password' ref={passwordRef} readOnly />
          <button onClick={copyToClipBoard}
            className='bg-blue-700 text-white px-3 py-0.5 outline-none shrink-0'>Copy</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex gap-x-1 items-center'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex text-center gap-x-1' >
            <input
              type="checkbox"
              id='getNum'
              defaultChecked={number}
              onChange={() => {
                setNumber((prev)=>!prev)
              }}
            />
            <label htmlFor="getNum">Number</label>
          </div>
          <div className='flex text-center gap-x-1' >
            <input
              type="checkbox"
              id='getChar'
              defaultChecked={char}
              onChange={() => {
                setChar((prev)=>!prev)
              }}
            />
            <label htmlFor="getChar">Characters</label>
          </div>
        </div>
   </div>
    </>
  )
}

export default App
