import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#F1F5F9"
      }}>
        
        <Header />

        <div style={{ padding: "20px", overflowY: "auto" }}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default MainLayout;