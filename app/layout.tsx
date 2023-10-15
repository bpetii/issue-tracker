import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import { Container, Theme } from '@radix-ui/themes';
import AuthProvider from './auth/provider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.variable}>
          <QueryClientProvider>
            <AuthProvider>
              <Theme accentColor="violet">
                <NavBar />
                <main className='p-5'>
                  <Container>
                    {children}
                  </Container>
                </main>
              </Theme>
            </AuthProvider>
          </QueryClientProvider>
        </body>
    </html>
  )
}
