import "./App.css";
import Footer from "./components/Footer";
import { PageContent } from "./components/main/PageContent";
import { PageHeader } from "./components/header/PageHeader";

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
