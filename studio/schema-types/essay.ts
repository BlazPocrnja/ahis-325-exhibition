import { defineField, defineType } from "sanity";

export const essay = defineType({
  __experimental_formPreviewTitle: false,
  name: "essay",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      type: 'array',
      name: 'content',
      of: [
        { type: 'block' }, // Standard text
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
