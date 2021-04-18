import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { ButtonPrimary, Text, ButtonDanger } from "@primer/components";
import auth from "solid-auth-client";
import { solidProfile, SolidProfileShape, EmailShape } from "../../shapes/shex";

import { FormSection } from "./_components/FormSection";
import styles from "./Profile.module.css";

export const Profile: React.FC<{ webId: string }> = ({ webId }) => {
  const [profile, setProfile] = useState<SolidProfileShape | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    solidProfile
      .findOne({
        from: webId,
        where: { id: webId },
      })
      .then(({ data, errors }) => {
        if (errors) {
          setError(errors[0]);
        } else if (data) {
          setProfile(data);
        }
      });
  }, [webId]);

  if (error) {
    return <div>{error}</div>;
  } else if (!profile) {
    return <div>Loading...</div>;
  }

  const { name, hasEmail } = profile as SolidProfileShape;

  return (
    <>
      <Text fontSize="2em" marginBottom="16px">
        Hello {name}
      </Text>
      <Formik
        initialValues={{
          name,
          email: ((hasEmail as EmailShape)?.value as string)?.replace(
            "mailto:",
            ""
          ),
        }}
        onSubmit={async (data) => {
          console.debug(data);
          const result = await solidProfile.update({
            doc: webId,
            data: {
              id: webId,
              name: data.name,
              hasEmail: {
                value: data.email && "mailto:" + data.email,
              } as EmailShape,
            },
          });
          console.log(result);
        }}
      >
        {({ values, handleChange, dirty, touched }) => (
          <Form>
            <FormSection
              label="Name"
              name="name"
              defaultValue={values.name as string}
              onChange={handleChange}
            />
            <FormSection
              label="Email"
              name="email"
              defaultValue={values.email}
              onChange={handleChange}
            />
            <div className={styles.buttons}>
              <ButtonDanger
                css
                marginRight="8px"
                onClick={() => {
                  auth.logout().then(() => {
                    window.location.reload();
                  });
                }}
              >
                Logout
              </ButtonDanger>
              <ButtonPrimary css disabled={!(dirty || !touched)} name="submit">
                Submit
              </ButtonPrimary>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
