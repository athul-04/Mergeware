


import React from 'react';
import { Info } from '../imports/ui/Info';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { AppRouter } from '../imports/ui/AppRouter.js';
import { Provider } from 'react-redux'; // Corrected import
import store from '../imports/ui/store/userStore.js';
import '/imports/api/methods';
// other client-side code

Meteor.startup(() => {
  const root = createRoot(document.getElementById('app'));
  root.render(
      <Provider store={store}><AppRouter/></Provider>
  );
});
