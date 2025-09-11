// app/components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside
      style={{
        width: '240px',
        background: '#111827',
        color: 'white',
        padding: '20px',
        height: '100vh',
        position:'fixed'        
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Menu</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {/* <li><Link href="/"><span style={{ color: 'white' }}>Home</span></Link></li> */}
          <li><Link href="/Section_1"><span style={{ color: 'white' }}>Section_1</span></Link></li>
          {/* <li><Link href="/Section_2"><span style={{ color: 'white' }}>Section_2</span></Link></li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
