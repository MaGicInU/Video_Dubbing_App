import React from 'react';
import ProjectManager from './model/projectManager';

interface AppProps {
  selectedComponent: string;
}

const App: React.FC<AppProps> = ({ selectedComponent }) => {
  return (
    <ProjectManager 
    selectedComponent={selectedComponent} 
                // selectedComponent="hello"

    />
  );
}

export default App;
