import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { ThemeProvider, BaseStyles, Button } from "@primer/components";
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  Session,
} from "@inrupt/solid-client-authn-browser";

import styles from "./App.module.css";
import Profile from "./components/Profile";
import { FormSection } from "./components/Profile/_components/FormSection";
import { SessionContext } from "./SessionContext";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    handleIncomingRedirect({ restorePreviousSession: true }).then(() => {
      const session = getDefaultSession();
      if (session.info.isLoggedIn) {
        setSession(session);
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className={styles.main}>Loading...</div>;

  return (
    <ThemeProvider>
      <div className={styles.main}>
        <BaseStyles>
          {!!session && session.info.webId ? (
            <SessionContext.Provider value={session}>
              <Profile />
            </SessionContext.Provider>
          ) : (
            <>
              <Formik
                initialValues={{ webId: "" }}
                onSubmit={(values) => {
                  const { webId } = values;
                  if (webId) {
                    const webIdObject = new URL(webId);
                    login({
                      oidcIssuer: webIdObject.protocol + webIdObject.host,
                    });
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
