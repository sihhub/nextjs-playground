"use client";

import { useEffect, useState } from "react";

const CLIENT_ID = "";
const API_KEY = "";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export default function GoogleDrivePicker() {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        window.gapi.load("client:auth2", initGapiClient);
      };
      document.body.appendChild(script);
    };

    const initGapiClient = () => {
      console.log("initGapiClient", window.gapi);
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setGapiLoaded(true);
        });
    };

    loadGapi();
  }, []);

  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const openPicker = () => {
    const pickerScript = document.createElement("script");
    pickerScript.src = "https://apis.google.com/js/api.js";
    pickerScript.onload = () => {
      window.gapi.load("picker", () => {
        const view = new window.google.picker.View(
          window.google.picker.ViewId.DOCS
        );
        const picker = new window.google.picker.PickerBuilder()
          .setDeveloperKey(API_KEY)
          .setAppId(CLIENT_ID)
          .setOAuthToken(
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getAuthResponse().access_token
          )
          .addView(view)
          .setCallback((data: any) => {
            if (data.action === window.google.picker.Action.PICKED) {
              setSelectedFiles(data.docs);
            }
          })
          .build();
        picker.setVisible(true);
      });
    };
    document.body.appendChild(pickerScript);
  };

  return (
    <div>
      <h1>Google Drive Picker</h1>
      {!gapiLoaded ? (
        <p>Loading Google API...</p>
      ) : (
        <>
          <button onClick={handleAuthClick}>Sign in with Google</button>
          <button onClick={handleSignOutClick}>Sign out</button>
          <button onClick={openPicker}>Open Google Drive Picker</button>
        </>
      )}
      <h2>Selected Files</h2>
      <ul>
        {selectedFiles.map((file) => (
          <li key={file.id}>
            {file.name} ({file.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
