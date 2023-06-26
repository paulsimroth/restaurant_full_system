import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";

function page() {
    return (
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          DATA POLICY
        </div>
        <Footer />
      </main>
    )
  };
  
  export default page;