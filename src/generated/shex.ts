import { NamedNode, Literal } from "rdflib";

import { Shape } from "shex-methods";

export type SolidProfileShape = {
  id: string; // the url of a node of this shape
  hasEmail?: EmailShape | EmailShape[]; // The person's email.
  name?: string; // An alternate way to define a person's name
} & {
  type: (
    | SolidProfileShapeType.SchemPerson
    | SolidProfileShapeType.FoafPerson
  )[]; // Defines the node as a Person
};

export type SolidProfileShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  hasEmail?:
    | URL
    | NamedNode
    | EmailShapeCreateArgs
    | (URL | NamedNode | EmailShapeCreateArgs)[]; // The person's email.
  name?: string | Literal; // An alternate way to define a person's name
} & {
  type: (
    | SolidProfileShapeType.SchemPerson
    | SolidProfileShapeType.FoafPerson
  )[]; // Defines the node as a Person
};

export type SolidProfileShapeUpdateArgs = Partial<SolidProfileShapeCreateArgs>;

export type EmailShape = {
  id: string; // the url of a node of this shape
  value: string; // The value of an email as a mailto link (Example <mailto:jane@example.com>)
} & {
  type?: (
    | EmailShapeType.Dom
    | EmailShapeType.Home
    | EmailShapeType.Isdn
    | EmailShapeType.Internet
    | EmailShapeType.Intl
    | EmailShapeType.Label
    | EmailShapeType.Parcel
    | EmailShapeType.Postal
    | EmailShapeType.Pref
    | EmailShapeType.Work
    | EmailShapeType.X400
  )[]; // The type of email.
};

export type EmailShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  value: URL | NamedNode; // The value of an email as a mailto link (Example <mailto:jane@example.com>)
} & {
  type?: (
    | EmailShapeType.Dom
    | EmailShapeType.Home
    | EmailShapeType.Isdn
    | EmailShapeType.Internet
    | EmailShapeType.Intl
    | EmailShapeType.Label
    | EmailShapeType.Parcel
    | EmailShapeType.Postal
    | EmailShapeType.Pref
    | EmailShapeType.Work
    | EmailShapeType.X400
  )[]; // The type of email.
};

export type EmailShapeUpdateArgs = Partial<EmailShapeCreateArgs>;

export enum SolidProfileShapeType {
  SchemPerson = "http://schema.org/Person",
  FoafPerson = "http://xmlns.com/foaf/0.1/Person",
}

export enum EmailShapeType {
  Dom = "http://www.w3.org/2006/vcard/ns#Dom",
  Home = "http://www.w3.org/2006/vcard/ns#Home",
  Isdn = "http://www.w3.org/2006/vcard/ns#ISDN",
  Internet = "http://www.w3.org/2006/vcard/ns#Internet",
  Intl = "http://www.w3.org/2006/vcard/ns#Intl",
  Label = "http://www.w3.org/2006/vcard/ns#Label",
  Parcel = "http://www.w3.org/2006/vcard/ns#Parcel",
  Postal = "http://www.w3.org/2006/vcard/ns#Postal",
  Pref = "http://www.w3.org/2006/vcard/ns#Pref",
  Work = "http://www.w3.org/2006/vcard/ns#Work",
  X400 = "http://www.w3.org/2006/vcard/ns#X400",
}

export enum SolidProfileShapeContext {
  type = "rdf:type",
  hasEmail = "vcard:hasEmail",
  name = "foaf:name",
}

export enum EmailShapeContext {
  type = "rdf:type",
  value = "vcard:value",
}

export const solidProfileShex = `
PREFIX srs: <https://shaperepo.com/schemas/solidProfile#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX schem: <http://schema.org/>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

srs:SolidProfileShape EXTRA a {
  a [ schem:Person ]
    // rdfs:comment  "Defines the node as a Person" ;
  a [ foaf:Person ]
    // rdfs:comment  "Defines the node as a Person" ;
  vcard:hasEmail @srs:EmailShape *
    // rdfs:comment  "The person's email." ;
  foaf:name xsd:string ?
    // rdfs:comment  "An alternate way to define a person's name" ;
}

srs:EmailShape EXTRA a {
  a [
    vcard:Dom
    vcard:Home
    vcard:ISDN
    vcard:Internet
    vcard:Intl
    vcard:Label
    vcard:Parcel
    vcard:Postal
    vcard:Pref
    vcard:Work
    vcard:X400
  ] ?
    // rdfs:comment  "The type of email." ;
  vcard:value IRI
    // rdfs:comment  "The value of an email as a mailto link (Example <mailto:jane@example.com>)" ;
}
`;

export const solidProfile = new Shape<
  SolidProfileShape,
  SolidProfileShapeCreateArgs
>({
  id: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
  shape: solidProfileShex,
  context: SolidProfileShapeContext,
  type: SolidProfileShapeType,
  childContexts: [EmailShapeContext],
});

export const email = new Shape<EmailShape, EmailShapeCreateArgs>({
  id: "https://shaperepo.com/schemas/solidProfile#EmailShape",
  shape: solidProfileShex,
  context: EmailShapeContext,
  type: EmailShapeType,
});
