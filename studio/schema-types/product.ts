import { defineField, defineType } from "sanity";

export const product = defineType({
  __experimental_formPreviewTitle: false,
  name: "product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "creator",
      title: "Creator",
      type: "reference",
      options: {
        disableNew: true,
      },
      validation: (rule) => rule.required(),
      to: [{ type: "creator" }],
    }),
    defineField({
      name: "imageWithAlt",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoLink",
      title: "Video Link",
      type: "string",
      description: 'Optional field for video/performance works.',
    }),
    defineField({
      name: "content",
      type: "portableText",
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first (e.g., 1, 2, 3)',
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "sku",
      media: "imageWithAlt",
    },
  },
});
