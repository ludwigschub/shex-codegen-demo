import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { ThemeProvider, BaseStyles, Button } from "@primer/components";
import auth from "solid-auth-client";

import styles from "./App.module.css";
import Profile from "./components/Profile";
import { FormSection } from "./components/Profile/_components/FormSection";

function App() {
  const [loggedInWebId, setLoggedInWebId] = useState("");
  useEffect(() => {
    auth.currentSession().then((session) => {
      console.debug(session);
      if (session && session.webId) {
        setLoggedInWebId(session.webId);
      } else {
        setLoggedInWebId("");
      }
    });
  }, []);
  return (
    <ThemeProvider>
      <div className={styles.main}>
        <BaseStyles>
          {!!loggedInWebId ? (
            <Profile webId={loggedInWebId} />
          ) : (
            <>
              <Formik
                initialValues={{ webId: "" }}
                onSubmit={(values) => {
                  const { webId } = values;
                  if (webId) {
                    const webIdObject = new URL(webId);
                    auth.login(webIdObject.protocol + webIdObject.host);
                  }
                }}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <FormSection
                      label="Enter your WebId or Identity Provider url to login"
                      placeholder="WebId or Identity Provider url"
                      name="webId"
                      defaultValue={values.webId}
                      onChange={handleChange}
                    />
                    <Button css name="submit" className={styles.login}>
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </BaseStyles>
      </div>
    </ThemeProvider>
  );
}

export default App;
