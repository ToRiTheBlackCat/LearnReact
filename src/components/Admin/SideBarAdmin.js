const SideBarAdmin = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="logo">Minh Tri Dep Trai✨</h2>
      <ul className="menu">
        <li>Dashboard</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
