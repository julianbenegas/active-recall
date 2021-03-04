import clsx from 'clsx'
import { useCallback, useState } from 'react'

type Props = JSX.IntrinsicElements['div']

const ScrollerBox = ({ children, style, className, ...props }: Props) => {
  const [showTopScroller, setShowTopScroller] = useState(false)
  const [showBottomScroller, setShowBottomScroller] = useState(false)

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const { clientHeight, scrollHeight, scrollTop } = e.currentTarget
      if (scrollHeight === clientHeight) return

      if (scrollTop >= scrollHeight - clientHeight) {
        setShowBottomScroller(false)
      } else {
        setShowBottomScroller(true)
      }

      if (scrollTop <= 0) {
        setShowTopScroller(false)
      } else {
        setShowTopScroller(true)
      }
    },
    []
  )

  return (
    <div {...props} style={{ ...style, position: 'relative' }}>
      <div className={clsx('overflow-auto', className)} onScroll={handleScroll}>
        <span
          className="absolute top-0 left-0 right-0 h-16 transition-opacity duration-200 pointer-events-none select-none bg-gradient-to-b from-white to-transparent"
          style={{ opacity: showTopScroller ? 1 : 0 }}
        />
        {children}
        <span
          className="absolute bottom-0 left-0 right-0 h-16 transition-opacity duration-200 pointer-events-none select-none bg-gradient-to-t from-white to-transparent"
          style={{ opacity: showBottomScroller ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

export default ScrollerBox
