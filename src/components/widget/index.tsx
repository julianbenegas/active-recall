import clsx from 'clsx'
import { useCallback, useState } from 'react'
import ScrollerBox from './scroller'

type Repetition =
  | 'in-text'
  | '5 days'
  | '2 weeks'
  | '1 month'
  | '2 months'
  | 'long-term'

const reps: { label: Repetition; icon?: React.ReactNode }[] = [
  { label: 'in-text' },
  { label: '5 days' },
  { label: '2 weeks' },
  { label: '1 month' },
  { label: '2 months' },
  { label: 'long-term' }
]

type Props = {
  question?: string
  answer?: string
  currentRepetition?: Repetition
}

const buenLorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est'

const Widget = ({
  question = buenLorem,
  answer = buenLorem,
  currentRepetition = 'in-text'
}: Props) => {
  const [show, setShow] = useState(false)

  const handleShow = useCallback(() => {
    setShow(true)
  }, [])

  return (
    <div className="max-w-sm py-12 mx-auto space-y-8">
      <div className="overflow-hidden shadow-2xl rounded-xl">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="p-1 text-gray-400 transition-colors rounded-full cursor-default hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-xs font-semibold text-gray-400">1/3</span>
          <button className="p-1 text-gray-400 transition-colors rounded-full cursor-default hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ScrollerBox className="h-64 px-4 pt-2 pb-6">
          <p className="text-lg text-gray-900">{question}</p>
        </ScrollerBox>
        <div>
          <ScrollerBox className="h-64 px-4 py-6 bg-opacity-30 bg-indigo-50">
            <span className="absolute top-0 left-0 right-0 z-10 h-px bg-indigo-100" />
            <span className="absolute bottom-0 left-0 right-0 z-10 h-px bg-indigo-100" />
            {show ? (
              <p onClick={handleShow} className="text-lg text-gray-900">
                {answer}
              </p>
            ) : (
              <button
                onClick={handleShow}
                className="absolute inset-0 w-full cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            )}
          </ScrollerBox>
          <div className="flex justify-between p-4">
            {reps.map((rep) => {
              const isCurrent = rep.label === currentRepetition
              return (
                <div
                  className={clsx('font-semibold text-gray-600 text-xs', {
                    'text-indigo-600': isCurrent
                  })}
                  key={rep.label}
                >
                  {rep.label}
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <button
            disabled={!show}
            className={clsx(
              'cursor-default inline-flex items-center justify-center px-3 py-5 text-sm font-medium leading-4 text-white bg-indigo-600 border-r border-indigo-300 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              { 'bg-opacity-60 pointer-events-none select-none': !show }
            )}
          >
            Didn't remember
          </button>

          <button
            disabled={!show}
            className={clsx(
              'cursor-default inline-flex items-center justify-center px-3 py-5 text-sm font-medium leading-4 text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              { 'bg-opacity-60 pointer-events-none select-none': !show }
            )}
          >
            Remembered
          </button>
        </div>
      </div>
    </div>
  )
}

export default Widget
