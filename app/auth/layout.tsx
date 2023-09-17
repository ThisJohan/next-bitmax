import Providers from './providers';

export default function Auth({children}: {children: React.ReactNode}) {
  return (
    <Providers>
        {children}
    </Providers>
  )
}