// app/layout.js
import './globals.css';
import Sidebar from './Sidebar';
 
export const metadata = {
  title: 'My App',
  description: 'A Next.js app with a sidebar layout',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className='overflow-y-auto' style={{overflowX:'hidden'}}>
        <div  className='sticky top-0'>
          <div className='sticky top-0 z-999'>
          <Sidebar />
          </div>
          <main >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}