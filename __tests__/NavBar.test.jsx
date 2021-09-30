import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import NavBar from '../client/src/Components/NavBar';
import AppContext from '../client/src/Components/context';
import { getContext } from './utils';

xtest('has a company title', async () => {
  let component;

  await act(async () => {
    component = render(<NavBar />);
    expect(component.getByTitle('company-title').textContent).toBe(
      'Lendl Global'
    );
  });
});

describe('<MyComponent />', () => {
  it.only('Nav bar', () => {
    const contextVal = getContext();
    const cmpt = render(
      <AppContext.Provider value={contextVal}>
        <NavBar />
      </AppContext.Provider>
    );

    const result = cmpt.getByTitle('company-title').textContent;
    const expected = 'Lendl Global';

    expect(result).toEqual(expected);
  });
});
