import React from 'react'
import Typewriter from "typewriter-effect";

export default function Terminal_Home() {
  return (
    <>
      <p className='my-0'>
        <code className='text-info text-large'>
          <Typewriter
            options={{ delay: 1, cursor: '' }}
            onInit={(typewriter) => {
              typewriter.typeString('-Hector@term:~$ The_Terminal is coming soon')
              typewriter.start()
            }}
          />
        </code>
      </p>
      <p>
        <code className='text-success'>
          <pre>
            <Typewriter
              options={{ delay: 1, cursor: '' }}
              onInit={(typewriter) => {
                typewriter.pauseFor(500)
                typewriter.typeString('-> 10/23/22')
                typewriter.start()
              }}
            />
          </pre>
        </code>
      </p>

      <p className='my-0'>
        <code className='text-light'>
          <pre>
            <Typewriter
              options={{ delay: 1, cursor: '|' }}
              onInit={(typewriter) => {
                typewriter.pauseFor(1000)
                typewriter.typeString('->\nThe terminal is a work in progress.\nIt will soon be filled with tutorials and analysis on things I like and know of.\nPlease wait for it! It will not disappoint!')
                typewriter.start()
              }}
            />
          </pre>
        </code>
      </p>
    </>
  )
}
