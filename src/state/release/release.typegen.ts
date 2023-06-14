
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.releases.Entry.Loading:invocation[0]": { type: "done.invoke.releases.Entry.Loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.releases.Entry.Loading:invocation[0]": { type: "error.platform.releases.Entry.Loading:invocation[0]"; data: unknown };
"xstate.after(500)#releases.Entry.Loaded": { type: "xstate.after(500)#releases.Entry.Loaded" };
"xstate.after(500)#releases.Suceess": { type: "xstate.after(500)#releases.Suceess" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteRelease": "done.invoke.releases.Deleting:invocation[0]";
"loadReleases": "done.invoke.releases.Entry.Loading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: "release_uuid";
          services: "deleteRelease" | "loadReleases";
        };
        eventsCausingActions: {
          "addErrorToCxt": "error.platform.releases.Entry.Loading:invocation[0]";
"addReleasesToContext": "done.invoke.releases.Entry.Loading:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "release_uuid": "Retry" | "Submit";
        };
        eventsCausingServices: {
          "deleteRelease": "Delete";
"loadReleases": "xstate.after(500)#releases.Suceess" | "xstate.init";
        };
        matchesStates: "DeleteError" | "Deleted" | "Deleting" | "Entry" | "Entry.FormData" | "Entry.LoadFailed" | "Entry.Loaded" | "Entry.Loading" | "Error" | "Submitting" | "Submitting.Creating" | "Submitting.Updating" | "Suceess" | { "Entry"?: "FormData" | "LoadFailed" | "Loaded" | "Loading";
"Submitting"?: "Creating" | "Updating"; };
        tags: never;
      }
  