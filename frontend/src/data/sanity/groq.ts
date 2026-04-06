import { defineQuery } from "groq";

const productBaseFields = /* groq */ `
  "id": slug.current,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "slug": slug.current,
  name,
  publishedAt,
  imageWithAlt {
    "ref": asset._ref,
    alt,
  },
  videoLink,
  content,
  order,
`;

const creatorBaseFields = /* groq */ `
  "id": slug.current,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "slug": slug.current,
  "name": coalesce(name, "Untitled"),
  "alias": coalesce(alias, ^.name),
  imageWithAlt {
    "ref": asset._ref,
    alt,
  },
  content,
`;

const heroBaseFields = /* groq */ `
  "id": _id,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  title,
  subtitle,
  content,
`;

const essayBaseFields = /* groq */ `
  "id": _id,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  title,
  subtitle,
  content,
`;

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(order asc) {
    ${productBaseFields}
    "creator" : creator->.slug.current,
    order
  }
`);

export const ALL_CREATORS_QUERY = defineQuery(`
  *[_type == "creator"] {
    ${creatorBaseFields}
    "products": *[_type == "product" && creator._ref == ^._id].slug.current,
  }
`);


export const ALL_HEROES_QUERY = defineQuery(`
  *[_type == "hero"] {
    ${heroBaseFields}
  }
`);

export const ALL_ESSAYS_QUERY = defineQuery(`
  *[_type == "essay"] {
    ${essayBaseFields}
  }
`);