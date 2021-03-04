import clsx from 'clsx'
import { useCallback, useState } from 'react'

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
        <p className="h-48 px-4 py-6 overflow-auto text-lg text-gray-900">
          {question}
        </p>
        <div>
          <div className="relative h-48 px-4 py-6 overflow-auto border-t border-b border-indigo-100 bg-opacity-30 bg-indigo-50 ">
            {show ? (
              <p onClick={handleShow} className="text-lg text-gray-900">
                {answer}
              </p>
            ) : (
              <button
                onClick={handleShow}
                className="absolute inset-0 w-full"
              />
            )}
          </div>
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
              'inline-flex items-center justify-center px-3 py-5 text-sm font-medium leading-4 text-white bg-indigo-600 border-r border-indigo-300 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              { 'bg-opacity-60 pointer-events-none select-none': !show }
            )}
          >
            Didn't remember
          </button>

          <button
            disabled={!show}
            className={clsx(
              'inline-flex items-center justify-center px-3 py-5 text-sm font-medium leading-4 text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
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
