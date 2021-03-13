import clsx from 'clsx'
import { Spinner } from 'components/spinner'
import { useUser } from 'context/user'
import { useCallback, useState } from 'react'
import ScrollerBox from './scroller'
import UserMenu from './user-menu'

import s from './widget.module.css'

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
  const { user, isLoading, onLogin } = useUser()

  const handleShow = useCallback(() => {
    setShow(true)
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      onLogin(email)
    },
    [onLogin]
  )

  return (
    <div className="max-w-sm py-12 mx-auto space-y-8">
      <div className="relative overflow-hidden shadow-2xl rounded-xl">
        <div className="flex items-center justify-between px-4 py-4 h-14">
          <span className="text-xs font-semibold text-gray-400">1/3</span>
          {isLoading ? (
            <div className="text-gray-400">
              <Spinner />
            </div>
          ) : user ? (
            <UserMenu />
          ) : (
            <form
              className="relative flex items-center w-3/5 space-x-2 transition-opacity"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                autoComplete="email"
                name="email"
                id="email"
                maxLength={64}
                placeholder="you@example.com"
                className="w-full h-8 px-3 text-xs text-gray-900 transition-colors border border-gray-300 rounded-full pr-7 hover:border-gray-400 focus:border-gray-600 focus:outline-none"
                required
              />
              <button
                type="submit"
                aria-label="submit email"
                className="absolute p-1 text-gray-400 transition-colors rounded-full cursor-default right-px hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
        <ScrollerBox className={clsx('h-64 px-4 pt-2 pb-6', s.container)}>
          <p className={clsx('text-lg text-gray-900 leading-normal', s.text)}>
            {question}
          </p>
        </ScrollerBox>
        <div>
          <ScrollerBox
            className={clsx(
              'h-64 px-4 py-6 bg-opacity-30 bg-indigo-50',
              s.container
            )}
          >
            <span className="absolute top-0 left-0 right-0 z-10 h-px bg-indigo-100" />
            <span className="absolute bottom-0 left-0 right-0 z-10 h-px bg-indigo-100" />
            {show ? (
              <p
                className={clsx('text-lg text-gray-900 leading-normal', s.text)}
              >
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
