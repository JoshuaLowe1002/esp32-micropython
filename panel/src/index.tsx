import { h, app } from 'hyperapp';
import { newApiClient, newDummyApiClient } from './api-client';
import { AppState, AppActions, AppView, AppViewMode } from './common';
import { Status, statusActions } from './modes/Status';
import { Scan, scanActions } from './modes/Scan';
import { Saved, savedActions } from './modes/Saved';

const React = { createElement: h };

const init = () => {
  const apiClient = newApiClient();
  // const apiClient = newDummyApiClient();

  const initialState: AppState = {
    view: 'status',

    status: {
      status: 'loading',
    },

    scan: {
      networks: 'unloaded',
    },

    saved: {
      networks: 'unloaded',
    },
  };

  const actions: AppActions = {
    setView: (view) => () => ({ view }),

    status: statusActions(apiClient),
    scan: scanActions(apiClient),
    saved: savedActions(apiClient),
  };

  const App: AppView = ({ view }, { setView }) => (
    <div className='App'>

      <h1 className='App__heading'>ESP32 Panel</h1>

      <div className='App__tabs'>
        {
          (['status', 'scan', 'saved'] as AppViewMode[]).map((viewButton) =>
            <button
              className={'App__tab ' + (viewButton === view ? 'App__tab--highlight' : 'App__tab--unhighlight')}
              onclick={() => setView(viewButton)}>{viewButton}
            </button>,
          )
        }
      </div>

      <div className='App__view'>
        {
          view === 'status' && <Status />
        }

        {
          view === 'scan' && <Scan />
        }

        {
          view === 'saved' && <Saved />
        }
      </div>

    </div>
  );

  app(initialState, actions, App, document.body);
};

window.addEventListener('load', init);
