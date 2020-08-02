import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { RouterView } from '@editor/router';
import { EditorNavigation } from '@editor/components/EditorNavigation';
import { theme } from '@editor/theme';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <EditorNavigation>
          <RouterView />
        </EditorNavigation>
      </Router>
    </ThemeProvider>
  );
};
