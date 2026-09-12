// src/components/Layout.jsx
import Sidebar from './sidebar.js';

function Layout({ children }) {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
