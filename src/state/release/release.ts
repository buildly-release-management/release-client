import { createMachine, assign } from 'xstate';
import { Release } from '../../interfaces/release';

export const releaseMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCcwBswENZwHQFEA7AF2QE9cAZAe0wgEtCoBiCawsXRgN2oGtOqDNjxFSFGnUZQEPagGNMxeuwDaABgC6GzYlAAHarHrL2ekAA9EAWgDsAJgCsudQA5HATgDMtxwBoQMhsAFkd1XGD1ADYnAF9YgKEsHFgCEnIqWgYmZjBkZGpkXH00JQAzQoBbXCSRVLEMyWyZOUVTQh0dc0NjdvMrBGtg21tcD1dXe1cARicAoMHHWw9cSfUvWcd4xPRk0XSJLMhmC1hiJU5MMuI8gAow9QBKZlqUtPFMukgupBAekxUhH6NiiriiuEcXg80TmgRs9mC4Ki6kciNcvnUmMxUW2IFe+w+ADEqgARJSYZgAZQArgAjSomH4GIwAsy-AbWLzqUbjVG2LxRLxTTbzeFRYKrZZQ0IbOIJPG7OrvDLE5CVMnnKl0hnEVTTXS-f59dli5yOGL+OGDSKjLyOexuWbjSYzeLywjUCBwcz4+CGlnG0AcybTFzuby+UWDXzg1zBHxbeW+3A0+kmZRMboBwHAwYeZwO9ROQXDKLm2ELayOc1jWYxGb8l3TXHJ1M6jNQXAAYVQSmkWd6OZNCFc4VRwXG9g803U03LlsrUNG02mHlBHg8wWmkQtLcVbzb6ekuAAqvoIH3M-7B2yg4hbK4Ip51KEt7P51HOTPcFO515gsE9heE2e7CAe2pHkwuAcAA7gABGcFxwdMA6skCw5DKMhbFv+thlhan6IisW72PW0yNsKoF7PUByoYGlg2CMXhhp4CaflEUQrP+CZUUqDSHFIV7Mje6F3tGs6rD46xRNMQozBWNiODMqzxr4vFvPxnxehAdFDmJ1hRL4LhQjCC42BsobROKpnqQSjRZISmD0BgOnXmhuZDDJYzrABQFNgp1oOGMPFJvudkUKq6rkrpt4MYMoLMVM0IEVa1hzo+-6AcBwpyjsYGiPkhSQDFolxau4J4XG3hlkBqlmYMK6Pui6UOrKiZ5dRKbUvIYBwH6wnuRh9q4F4AoeBi434QFdiPgB43cusmxurEQA */
    tsTypes: {} as import('./release.typegen').Typegen0,

    schema: {
      services: {} as {
        loadReleases: { data: Release };
        submitRelease: { data: Release };
      },
    },

    context: {
      releases: [] as any,
      error: undefined as string | undefined,
    },

    id: 'releases',

    states: {
      Submitting: {
        states: {
          Creating: {
            invoke: {
                src: 'submitRelease',
                onDone: [
                    {
                        target: 'Success',
                        actions: 'updateReleaseCxt'
                    }
                ],
                onError: [
                    {
                        target: 'Errored',
                        actions: 'AddErrorToCxt'
                    }
                ]
            },
          },
          Updating: {},
          "new state 1": {}
        },

        initial: "new state 1"
      },

      Entry: {
        states: {
          Loading: {
            invoke: {
              src: 'loadReleases',
              onDone: [
                {
                    target: 'Loaded',
                    actions: 'addReleasesToContext'
                }
              ],
              onError: [
                {
                    target: 'LoadFailed',
                    actions: 'addErrorToCxt'
                }

              ]
            }
          },

          Loaded: {
            after: {
              "500": "FormData"
            }
          },
          LoadFailed: {},
          FormData: {
            on: {
              Submit: [{
                target: "#releases.Submitting.Updating",
                cond: "release_uuid"
              }, "#releases.Submitting.Creating"]
            }
          }
        },

        initial: "Loading"
      },

      Errored: {},
      Suceess: {}
    },

    initial: "Entry"
  },
  {
    actions: {
      addReleasesToContext: assign((context, event) => {
        return { releases: event.data };
      }),
      addErrorToCxt: assign((context, event) => {
        return { error: (event.data as Error).message };
      }),
    },
  }
);
