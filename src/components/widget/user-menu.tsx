import { Transition } from '@headlessui/react'
import { useUser } from 'context/user'
import { useCallback, useEffect, useState } from 'react'

const UserMenu = () => {
  const [show, setShow] = useState(false)
  const { onLogout } = useUser()

  const handleShow = useCallback(() => setShow(true), [])
  const handleHide = useCallback(() => setShow(false), [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const { target } = e
      if (target instanceof HTMLElement) {
        const closest = target.closest('[data-mobile-menu="true"]')
        if (closest) return
        handleHide()
      }
    }
    if (show) {
      document.addEventListener('click', handleClick)
      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [handleHide, show])

  return (
    <div>
      <button
        onClick={handleShow}
        className="p-1 text-gray-400 transition-colors rounded-full cursor-default hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
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
      <Transition
        show={show}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform"
        data-mobile-menu
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-between px-5 pt-4">
            <div>
              <img
                className="w-auto h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md cursor-default hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={handleHide}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3">
            <button
              onClick={onLogout}
              className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 rounded-md cursor-default hover:text-gray-900 hover:bg-gray-50"
            >
              Log Out
            </button>
          </div>
          <a
            href="#"
            className="block w-full px-5 py-3 font-medium text-center text-indigo-600 bg-gray-50 hover:bg-gray-100"
          >
            Dashboard
          </a>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu
