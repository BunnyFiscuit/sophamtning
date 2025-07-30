import "./App.css";
import Footer from "./components/Footer";
import { PageContent } from "./components/PageContent";
import { PageHeader } from "./components/PageHeader";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <PageHeader />
        <PageContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
