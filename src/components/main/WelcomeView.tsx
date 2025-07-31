export const WelcomeView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Välkommen till Sophämtningsschema
      </h1>
      <p className="text-xl text-center">
        Här kan du enkelt hitta information om sophämtning i ditt område.
      </p>
      <p className="text-xl text-center mt-4">
        Börja med att söka efter din adress i sökfältet ovan. När du har angett
        din adress kommer du att se nästa planerade sophämtning.
      </p>
    </div>
  );
};
