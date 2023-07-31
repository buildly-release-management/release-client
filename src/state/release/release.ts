import { createMachine, assign } from 'xstate';
import { Release } from '../../interfaces/release';

export const releaseMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCcwBswENZwHQFEA7AF2QE9cAZAe0wgEtCoBiCawsXRgN2oGtOqDNjxFSFGnUZQEPagGNMxeuwDaABgC6GzYlAAHarHrL2ekAA9EAWgDsAJgCsudQA5HATgDMtxwBoQMhsAFkd1XGD1ADYnAF9YgKEsHFgCEnIqWgYmZjBkZGpkXH00JQAzQoBbXCSRVLEMyWyZOUVTQh0dc0NjdvMrBGtg21tcD1dXe1cARicAoMHHWw9cSfUvWcd4xPRk0XSJLMhmC1hiJU5MMuI8gAow9QBKZlqUtPFMukgupBAekxUhH6NiiriiuEcXg80TmgRs9mC4Ki6kciNcvnUmMxUW2IFe+w+ADEqgARJSYZgAZQArgAjSomH4GIwAsy-AbWKajDz2KIeWw+exeKLLabzGxhXBedTTaZLOX2FEI4K4-H1A64YnISpk85UukM4iqaa6X7-Prs+FTVYTWzTFFhXm2aLiwbTUEuKKOGZykYeDyg1W7Oq4Gn0kzKHKwanyeRwWBMv4si2gAa85xhL3BIX2WXRAOuzn+3BRe1hRze4JeLy8oPCN5hw2Rlh5Ar5b5abrJwHAhD21y4BG2KLBOX+mZuKKF6Y1qXBbOKjzTVxQis43GEagQODmNVd3o9y2DSbTFzuby+Qu+cGuKu+abjdT2AVeOt7dXifesoFHuwCs+eD4-hwoMUR8nOQHqP6MrCuuOz1gSjRZNIX4ppYNjOqeK7OsKM5TJshbelhd5bAkeLBm8DSHF8ECoYeqYgr4LhQjCwELNYGyntEI6sW+IZUZ8ECEpg9AYLRZrdmyDGDIi4Rge6NZeI4TgeEsbEhMKg63sEAZET6Xp8ZRGpajq5J0VJ6GgSuWnQjE6lut6c7Zl4kwzHEZFqqGBomMJomQOZP7ST4cmjuWkQeME6LDtOTgRDyLHKuMwyuIZeCNhG-kSQeFkDKOoxTBFXg6aWz62Cuhb2MWpbqJFmKQnyEypak6XEM2AW9isRFFY4yKTNKsxeIWyLBBErg1a4S5REpNbTE1Xnhq10i4AAwqgSgoVl369p4JYitKKJyhNymuIR7pjGNkUzC+qmkfB77zU2S0AKr6BA61MO1R5LBCMzdb1QoyvYhajiskS2Nm9q8pV2nxPEQA */
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

      SubmitFailed: {},
      Submitted: {},

      Submitting: {
        states: {
          Creating: {
            invoke: {
              src: 'submitRelease'
            },
          },
          Updating: {
            invoke: {
              src: 'submitRelease',
              onDone: {actions: 'addSingleReleaseToCxt', target: '#releases.Submitted'},
              onError: {actions:'addErrorToCxt', target: '#releases.SubmitFailed'}
            },
          }
        },

        on: {
          success: "Submitted",
          errorred: "SubmitFailed"
        }
      }
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
      addSingleReleaseToCxt: assign((context, event) => {
        return {...context.releases, ...event.data}
      })
    },
  }
);
