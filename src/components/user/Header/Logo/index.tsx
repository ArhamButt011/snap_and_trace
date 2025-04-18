import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'lg'
  redirect?: boolean
}

const Logo: React.FC<LogoProps> = ({ size = 'sm', redirect }) => {
  const textSize = size === 'lg' ? 'text-[44.55px]' : 'text-[28px]'
  const logo = (
    <h1 className={`text-accent font-normal font-prociono ${textSize}`}>
      Snap&Trace
    </h1>
  )
  return redirect === false ? logo : <Link href="/">{logo}</Link>
}

export default Logo
