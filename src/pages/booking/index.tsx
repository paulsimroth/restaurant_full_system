import Calendar from "~/components/Calendar";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";

function page() {
    return (
      <main>
        <Navbar />
        <div className="bg-[#1C2331] text-[#FFA500] mt-12 flex min-h-screen flex-col items-center justify-between p-24">
          BOOKING
          <Calendar />
        </div>
        <Footer />
      </main>
    )
  };
  
  export default page;